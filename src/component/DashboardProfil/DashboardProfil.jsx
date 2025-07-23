import React, { useEffect, useState } from 'react'
import './DashboardProfil.css'

import toast, { Toaster } from 'react-hot-toast';
import { getAllProfiles, removeProfile, updateProfile, insertProfile } from '../../services/profileServices.js';
import { getAllStores } from '../../services/storeServices.js';

import ConfirmModal from '../../component/Modals/ConfirmModal/ConfirmModal.jsx';
import ManageProfile from '../Modals/ManageProfile/ManageProfile.jsx';

function DashboardProfil() {
    const [loading, setLoading] = useState(false)
    const [profileList, setProfileList] = useState(undefined)
    const [storeList, setStoreList] = useState(undefined)
    const [openConfirm, setOpenConfirm] = useState(false)
    const [openNew, setOpenNew] = useState(false)
    const [openEdit, setOpenEdit] = useState(false)
    const [selectedItem, setSelectedItem] = useState(undefined)

    useEffect(() => {
        setLoading(true)
        getProfileList()
        getStoreList()
        setLoading(false)
    }, []);

    const getProfileList = async () => {
        const response = await getAllProfiles()
        setProfileList(response)
    }

    const deleteProfile = async () => {
        setLoading(true)
        try {
            await removeProfile(selectedItem.profileID)
            getProfileList()
            toast.success('Suppression réussie')
        } catch {
            toast.error('Une erreur est survenue')
        }
        setOpenConfirm(false)
        setLoading(false)
    }

    const createProfile = async (newArticle) => {
        setLoading(true)
        try {
            await insertProfile(newArticle)
            getProfileList()
            setOpenNew(!openNew)
            toast.success('Création réussie')
        } catch {
            toast.error('Une erreur est survenue')
        }
        setLoading(false)
    }

    const editProfile = async (updatedItem) => {
        setLoading(true)
        try {
            await updateProfile(updatedItem)
            getProfileList()
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
            <div><Toaster /></div>
            {/* {openEdit && <EditArticle closeModal={() => { setOpenEdit(false) }} selectedArticle={selectedArticle} action={(newArticle) => type === 'random' ? editRandom(newArticle) : editEssential(newArticle)} isRandom={type === "random"} essentials={essentialsArticles} />}
            {openNew && <EditArticle closeModal={() => { setOpenNew(false) }} selectedArticle={undefined} action={(newArticle) => type === 'random' ? createRandom(newArticle) : createEssential(newArticle)} isRandom={type === "random"} essentials={essentialsArticles} />}
            {openConfirm && <ConfirmModal confirmAction={confirmAction} closeModal={() => { setOpenConfirm(false) }} />} */}
            {openConfirm && <ConfirmModal confirmAction={(selectedItem) => deleteProfile(selectedItem)} closeModal={() => { setOpenConfirm(false) }} />}
            {openNew && <ManageProfile closeModal={() => { setOpenNew(false) }} selectedItem={undefined} action={(newItem) => createProfile(newItem)} storeList={storeList} />}
            {openEdit && <ManageProfile closeModal={() => { setOpenEdit(false) }} selectedItem={selectedItem} action={(newArticle) => editProfile(newArticle)} storeList={storeList} />}



            <div className='titleDisplay'>
                <h3>Liste des profils</h3>
                <button onClick={() => handleNew()} className='newArticleBtn'>Ajouter un profil</button>
            </div>
            <div className="tableContainer">
                <table className='tableDashboard'>
                    <thead>
                        <tr className='headerRow'>
                            <th>Prénom</th>
                            <th>Nom</th>
                            <th>Adresse</th>
                            <th>Magasin</th>
                            <th>ID client</th>
                            <th></th>
                        </tr>
                    </thead>
                    <tbody>
                        {profileList?.map((item) => (
                            <tr key={item.code} className='divField'>
                                <td className="largeCol">{item.firstName}</td>
                                <td className="largeCol">{item.lastName}</td>
                                <td className="smallCol">{item.adresse + " " + item.city}</td>
                                <td className="smallCol">{storeList?.find(e => e.id === item.magasinID).name}</td>
                                <td className="smallCol">{item.clientID}</td>
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

export default DashboardProfil