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
                            <td valign='top'>{article.code}</td>
                            <td valign='top'>
                                {article.libelle}
                                {article.prixRemise !== 0 && <p className='subArticle'>Remise sur le lot de produits</p>}
                            </td>
                            <td valign='top' className='alignEnd'>{article.qtyCmd}</td>
                            <td valign='top' className='alignEnd'>{article.qtyCmd}</td>
                            <td valign='top' className='alignEnd'>{article.tva}</td>
                            <td valign='top' className='alignEnd'>{article.prixUnit}</td>
                            <td valign='top' className='alignEnd'>{article.prixRemise !== 0 ? -article.prixRemise : ""}</td>
                            <td valign='top' className='alignEnd'>{article.total}</td>
                            <button className='deleteRow elementToHide' onClick={() => { handleDeleteRow(index) }}></button>
                        </tr>
                    ))}
                    <button className='addElement elementToHide' type="button" onClick={() => handleToogleForm()}></button>
                    <tr>
                        <td valign='top'>9713236189234</td>
                        <td valign='top'>
                            Sacs réutilisables consignés Drive<br />
                            <p className='subArticle'>Nb sac(s) livré(s) : 2 / Nb sac(s) rendu(s) : 0</p>
                        </td>
                        <td valign='top' className='alignEnd'>1</td>
                        <td valign='top' className='alignEnd'>2</td>
                        <td valign='top' className='alignEnd'>0</td>
                        <td valign='top' className='alignEnd'>0.35</td>
                        <td valign='top' className='alignEnd'></td>
                        <td valign='top' className='alignEnd'>0.70</td>
                    </tr>
                </tbody>
            </table>
        </div>
    )
}

export default Bill