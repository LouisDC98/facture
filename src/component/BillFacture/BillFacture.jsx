import React, { useState, useEffect } from 'react'
import "./BillFacture.css"

function Bill(props) {
    let { articles } = props
    let [nbrBags, setNbrBags] = useState(0)

    const nbrArticles = 0;
    const sumWithInitial = articles.reduce(
        (accumulator, currentValue) => accumulator + currentValue.qtyCmd,
        nbrArticles,
    );

    useEffect(() => {
        setNbrBags(calcNbrBags(sumWithInitial))
    }, [sumWithInitial]);

    const calcNbrBags = (nbrArticles) => {
        if (nbrArticles >= 0 && nbrArticles <= 5) {
            return 2;
        } else if (nbrArticles > 5 && nbrArticles <= 10) {
            return 3;
        } else if (nbrArticles > 10) {
            return 4;
        }
    };

    return (
        <div className='relativeFacture'>
            <table className='bill'>
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
                        </tr>
                    ))}
                    <tr>
                        <td valign='top'>9713236189234</td>
                        <td valign='top'>
                            Sacs réutilisables consignés Drive<br />
                            <p className='subArticle'>Nb sac(s) livré(s) : {nbrBags} / Nb sac(s) rendu(s) : {nbrBags-2}</p>
                        </td>
                        <td valign='top' className='alignEnd'>{nbrBags}</td>
                        <td valign='top' className='alignEnd'>{nbrBags-2}</td>
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