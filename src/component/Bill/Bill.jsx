import React, { useState } from 'react'
import "./Bill.css"

import FormArticle from '../Modals/FormArticle/FormArticle';

function Bill(props) {
    let { articles, setArticles } = props
    let [openForm, setOpenForm] = useState(false)

    const handleToogleForm = (e) => {
        setOpenForm(!openForm)
        if (e) {
            setArticles([...articles, e]);
        }
    }

    const handleDeleteRow = (index) => {
        const updatedArticles = articles.filter((_, i) => i !== index);
        setArticles(updatedArticles);
    }

    return (
        <div>
            {openForm && <FormArticle closeModal={(e) => { handleToogleForm(e) }} />}
            <table>
                <thead className='headerTable'>
                    <tr>
                        <th style={{ width: "100px" }}>Code EAN 13</th>
                        <th>Libellé</th>
                        <th>Qté Cdée</th>
                        <th>Qté livrée</th>
                        <th>TVA %</th>
                        <th>Prix Unit. TTC</th>
                        <th>Montant remise TTC</th>
                        <th>Montant TTC</th>
                    </tr>
                </thead>
                <tbody>
                    {articles.length > 0 && articles.map((article, index) => (
                        <tr key={index}>
                            <td>{article.code}</td>
                            <td>{article.libelle}</td>
                            <td className='alignEnd'>{article.qtyCmd}</td>
                            <td className='alignEnd'>{article.qtyCmd}</td>
                            <td className='alignEnd'>{article.tva}</td>
                            <td className='alignEnd'>{article.prixUnit}</td>
                            <td className='alignEnd'>{article.prixRemise !== 0 ? -article.prixRemise : ""}</td>
                            <td className='alignEnd'>{article.total}</td>
                            <button className='deleteRow elementToHide' onClick={() => { handleDeleteRow(index) }}></button>
                        </tr>
                    ))}
                    <button className='addElement elementToHide' type="button" onClick={() => handleToogleForm()}></button>
                </tbody>
            </table>
        </div>
    )
}

export default Bill