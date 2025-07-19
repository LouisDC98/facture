import React, { useEffect, useState } from 'react'
import './DashboardProfil.css'

import toast, { Toaster } from 'react-hot-toast';
import { getAllProfiles, removeProfile, updateProfile, insertProfile } from '../../services/profileServices.js';

import ConfirmModal from '../../component/Modals/ConfirmModal/ConfirmModal.jsx';
import ManageProfile from '../Modals/ManageProfile/ManageProfile.jsx';

function DashboardProfil() {
    const [loading, setLoading] = useState(false)
    const [profileList, setProfileList] = useState(undefined)
    const [openConfirm, setOpenConfirm] = useState(false)
    const [openNew, setOpenNew] = useState(false)
    const [openEdit, setOpenEdit] = useState(false)
    const [selectedItem, setSelectedItem] = useState(undefined)

    useEffect(() => {
        setLoading(true)
        getProfileList()
        setLoading(false)
    }, []);

    const getProfileList = async () => {
        const response = await getAllProfiles()
        setProfileList(response)
        console.log('response', response)
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
            {openNew && <ManageProfile closeModal={() => { setOpenNew(false) }} selectedItem={undefined} action={(newItem) => createProfile(newItem)} profiles={profileList} />}
            {openEdit && <ManageProfile closeModal={() => { setOpenEdit(false) }} selectedItem={selectedItem} action={(newArticle) => editProfile(newArticle)} profiles={profileList} />}



            <div className='titleDisplay'>
                <h3>Liste des articles</h3>
                <button onClick={() => handleNew()} className='newArticleBtn'>Ajouter un profil</button>
            </div>
            <div className="tableContainer">
                <table className='tableDashboard'>
                    <thead>
                        <tr className='headerRow'>
                            <th>Prénom</th>
                            <th>Nom</th>
                            <th>Ville</th>
                            <th>Adresse</th>
                            <th>ID client</th>
                            <th></th>
                        </tr>
                    </thead>
                    <tbody>
                        {profileList?.map((item) => (
                            <tr key={item.code} className='divField'>
                                <td className="largeCol">{item.firstName}</td>
                                <td className="largeCol">{item.lastName}</td>
                                <td className="smallCol">{item.adresse}</td>
                                <td className="smallCol">{item.city + " " + item.codePostal}</td>
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