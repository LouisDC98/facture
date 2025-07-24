import { useEffect, useState } from 'react'
import './DashboardStore.css'

import toast, { Toaster } from 'react-hot-toast';
import { getAllStores, insertStore, updateStore, removeStore } from '../../services/storeServices.js';

import ConfirmModal from '../../component/Modals/ConfirmModal/ConfirmModal.jsx';
import ManageStore from '../Modals/ManageStore/ManageStore.jsx';
import Loader from '../Loader/Loader.jsx'

function DashboardStore() {
    const [loading, setLoading] = useState(false)
    const [storeList, setStoreList] = useState(undefined)
    const [openConfirm, setOpenConfirm] = useState(false)
    const [openNew, setOpenNew] = useState(false)
    const [openEdit, setOpenEdit] = useState(false)
    const [selectedItem, setSelectedItem] = useState(undefined)

    useEffect(() => {
        setLoading(true)
        getStoreList()
        setLoading(false)
    }, []);

    const deleteProfile = async () => {
        setLoading(true)
        try {
            await removeStore(selectedItem.profileID)
            getStoreList()
            toast.success('Suppression réussie')
        } catch {
            toast.error('Une erreur est survenue')
        }
        setOpenConfirm(false)
        setLoading(false)
    }

    const createStore = async (newItem) => {
        setLoading(true)
        try {
            await insertStore(newItem)
            getStoreList()
            setOpenNew(!openNew)
            toast.success('Création réussie')
        } catch {
            toast.error('Une erreur est survenue')
        }
        setLoading(false)
    }

    const editStore = async (updatedItem) => {
        setLoading(true)
        try {
            await updateStore(updatedItem)
            getStoreList()
            setOpenEdit(false)
            setSelectedItem(undefined)
            toast.success('Modification réussie')
        } catch {
            toast.error('Une erreur est survenue')
        }
        setLoading(false)
    }

    const getStoreList = async () => {
        const response = await getAllStores()
        setStoreList(response)
    }

    const handleDelete = (item) => {
        setOpenConfirm(!openConfirm)
        setSelectedItem(item)
    }

    const handleEdit = (item) => {
        setSelectedItem(item)
        setOpenEdit(!openEdit)
    }

    const handleNew = () => {
        setOpenNew(!openNew)
    }

    return (
        <div className="tableDisplay">
            <Toaster />
            {loading && <Loader />}
            {openConfirm && <ConfirmModal confirmAction={(selectedItem) => deleteProfile(selectedItem)} closeModal={() => { setOpenConfirm(false) }} />}
            {openNew && <ManageStore closeModal={() => { setOpenNew(false) }} selectedItem={undefined} action={(newItem) => createStore(newItem)} />}
            {openEdit && <ManageStore closeModal={() => { setOpenEdit(false) }} selectedItem={selectedItem} action={(newItem) => editStore(newItem)} storeList={storeList} />}

            <div className='titleDisplay'>
                <button onClick={() => handleNew()} className='newArticleBtn'>Ajouter un magasin</button>
            </div>
            <div className="tableContainer">
                <table className='tableDashboard'>
                    <thead>
                        <tr className='headerRow'>
                            <th>Ville</th>
                            <th>Adresse</th>
                            <th>Téléphone</th>
                            <th></th>
                        </tr>
                    </thead>
                    <tbody>
                        {storeList?.map((item) => (
                            <tr key={item.code} className='divField'>
                                <td className="largeCol">{item.name}</td>
                                <td className="smallCol">{item.primary_address}</td>
                                <td className="largeCol">{item.tel}</td>
                                <td>
                                    <button onClick={() => handleDelete(item)} className="deleteRow"></button>
                                    <button onClick={() => handleEdit(item)} className="editRow"></button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    )
}

export default DashboardStore