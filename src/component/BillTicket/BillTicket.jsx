import React, { useState } from 'react'
import "./BillTicket.css"

import FormArticle from '../Modals/FormArticle/FormArticle'

function BillTicket(props) {
    let { articles, setArticles } = props
    let [openForm, setOpenForm] = useState(false)
    let [currentArticle, setCurrentArticle] = useState(undefined)
    let [currentIndex, setCurrentIndex] = useState(undefined)

    const handleToogleForm = (e) => {
        setOpenForm(!openForm)
        if (e) {

            if (currentIndex !== undefined) {
                //edit row
                const updatedArticles = [...articles];
                updatedArticles[currentIndex] = e;

                setArticles(updatedArticles);
                setCurrentArticle(undefined)
                setCurrentIndex(undefined)
            }
            else {
                //insert new row
                setArticles([...articles, e]);
            }
        }
    }

    const handleEditRow = (index) => {
        setCurrentArticle(articles[index]);
        setCurrentIndex(index);

        setOpenForm(!openForm)
    }

    const handleDeleteRow = (index) => {
        const updatedArticles = articles.filter((_, i) => i !== index);
        setArticles(updatedArticles);
    }
    return (
        <section className='relativeTicket'>
            <button className='addElement elementToHide' type="button" onClick={() => handleToogleForm()}></button>
            {openForm && <FormArticle closeModal={(e) => { handleToogleForm(e) }} currentArticle={currentArticle} />}
            <table className='billTicket'>
                <thead>
                    <tr>
                        <th>TVA</th>
                        <th>Produit</th>
                        <th>QTE x P.U.</th>
                        <th>Montant €</th>
                    </tr>
                </thead>
                <tbody>
                    {articles.length > 0 && articles.map((article, index) => (
                        <tr key={index}>
                            <td valign='top'>{article.tva.toFixed(1) + "%"}</td>
                            <td valign='top'>{article.libelle} </td>
                            <td valign='top' className='alignEnd'>{article.qtyCmd + " x " + article.prixUnit.toFixed(2)}</td>
                            {/* <td valign='top' className='alignEnd'>{article.prixRemise !== 0 ? -article.prixRemise : ""}</td> */}
                            <td valign='top' className='alignEnd'>{article.total}</td>
                            <button className='deleteRow elementToHide' onClick={() => { handleDeleteRow(index) }}></button>
                            <button className='editRow elementToHide' onClick={() => { handleEditRow(index) }}></button>
                        </tr>
                    ))}
                </tbody>
            </table>
        </section>
    )
}

export default BillTicket