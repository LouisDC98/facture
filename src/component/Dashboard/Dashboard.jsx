import React, { useEffect, useState } from 'react'
import './Dashboard.css'

import toast, { Toaster } from 'react-hot-toast';
import { getAllRandoms, removeRandom } from '../../services/randomsServices.js';

import ConfirmModal from '../../component/Modals/ConfirmModal/ConfirmModal.jsx';

function Dashboard() {
    const [loading, setLoading] = useState(false)
    const [randomArticles, setRandomArticles] = useState(undefined)
    const [selectedArticle, setSelectedArticle] = useState(undefined)
    const [openConfirm, setOpenConfirm] = useState(false)

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
    const deleteRandom = async () => {
        setLoading(true)
        try {
            await removeRandom(selectedArticle.code)
            getRandomList()
            toast.success('Suppression effectuée')
        } catch {
            toast.error('Une erreur est survenue')
        }
        setOpenConfirm(false)
        setLoading(false)
    }

    const handleDelete = (article) => {
        setOpenConfirm(!openConfirm)
        setSelectedArticle(article)
    }
    return (
        <div className="tableDisplay">
                  <div><Toaster /></div>
            {openConfirm && <ConfirmModal confirmAction={() => deleteRandom()} closeModal={() => { setOpenConfirm(false) }} />}
            <h3>Liste des article randoms</h3>

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
                                    <button className="editRow"></button>
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