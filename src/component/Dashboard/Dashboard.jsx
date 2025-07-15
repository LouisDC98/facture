import React, { useEffect, useState } from 'react'
import './Dashboard.css'

import toast, { Toaster } from 'react-hot-toast';
import { getAllRandoms, removeRandom, updateRandom, insertRandom } from '../../services/randomsServices.js';

import ConfirmModal from '../../component/Modals/ConfirmModal/ConfirmModal.jsx';
import EditArticle from '../Modals/ManageArticle/ManageArticle.jsx';

function Dashboard() {
    const [loading, setLoading] = useState(false)
    const [randomArticles, setRandomArticles] = useState(undefined)
    const [selectedArticle, setSelectedArticle] = useState(undefined)
    const [openConfirm, setOpenConfirm] = useState(false)
    const [openEdit, setOpenEdit] = useState(false)
    const [openNew, setOpenNew] = useState(false)
    const [confirmAction, setConfirmAction] = useState(null)

    useEffect(() => {
        setLoading(true)
        // getMagasinList()
        // getUserList()
        getRandomList()
        // getEssentialList()
        setLoading(false)
    }, [setLoading]);

    const getRandomList = async () => {
        const response = await getAllRandoms()
        setRandomArticles(response)
    }

    const deleteRandom = async (article) => {
        setLoading(true)
        try {
            await removeRandom(article.code)
            getRandomList()
            toast.success('Suppression réussie')
        } catch {
            toast.error('Une erreur est survenue')
        }
        setOpenConfirm(false)
        setLoading(false)
    }

    const editRandom = async (newArticle) => {
        setLoading(true)
        try {
            await updateRandom(newArticle)
            getRandomList()
            setOpenEdit(!openEdit)
            setSelectedArticle(undefined)
            toast.success('Modification réussie')
        } catch {
            toast.error('Une erreur est survenue')
        }
        setLoading(false)
    }

    const createRandom = async (newArticle) => {
        setLoading(true)
        try {
            await insertRandom(newArticle)
            getRandomList()
            setOpenNew(!openNew)
            toast.success('Création réussie')
        } catch {
            toast.error('Une erreur est survenue')
        }
        setLoading(false)
    }

    const handleDelete = (article) => {
        setOpenConfirm(!openConfirm)
        setConfirmAction(() => () => deleteRandom(article))
    }

    const handleEdit = (article) => {
        setSelectedArticle(article)
        setOpenEdit(!openEdit)
    }

    const handleNew = () => {
        setOpenNew(!openNew)
    }

    return (
        <div className="tableDisplay">
            <div><Toaster /></div>
            {openEdit && <EditArticle closeModal={() => { setOpenEdit(false) }} selectedArticle={selectedArticle} action={(newArticle) => { editRandom(newArticle) }} />}
            {openNew && <EditArticle closeModal={() => { setOpenNew(false) }} selectedArticle={undefined} action={(newArticle) => { createRandom(newArticle) }} />}
            {openConfirm && <ConfirmModal confirmAction={confirmAction} closeModal={() => { setOpenConfirm(false) }} />}
            <div className='titleDisplay'>
                <h3>Liste des article randoms</h3>
                <button onClick={() => handleNew()} className='newArticleBtn'>Ajouter un article</button>
            </div>
            <div className="tableContainer">
                <table className='tableDashboard'>
                    <thead>
                        <tr className='headerRow'>
                            <th>Code EAN</th>
                            <th>Libelé</th>
                            <th>Qte</th>
                            <th>TVA</th>
                            <th>Prix Unit</th>
                            <th>Remise</th>
                            <th></th>
                        </tr>
                    </thead>
                    <tbody>
                        {randomArticles?.map((article) => (
                            <tr key={article.code} className='divField'>
                                <td className="largeCol">{article.code}</td>
                                <td className="largeCol">{article.libelle}</td>
                                <td className="smallCol">{article.qtyCmd}</td>
                                <td className="smallCol">{article.tva}%</td>
                                <td className="smallCol">{article.prixUnit} €</td>
                                <td className="smallCol">{article.prixRemise} €</td>
                                <td>
                                    <button onClick={() => handleDelete(article)} className="deleteRow"></button>
                                    <button onClick={() => handleEdit(article)} className="editRow"></button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    )
}

export default Dashboard