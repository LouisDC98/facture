import React from 'react'
import "./BillTicket.css"

function BillTicket(props) {
    let { articles } = props

    return (
        <section className='relativeTicket'>
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
                            <td valign='top'>{article.tva + "%"}</td>
                            <td valign='top'>{article.libelle} </td>
                            <td valign='top' className='alignEnd'>{article.qtyCmd + " x " + article.prixUnit.toFixed(2)}</td>
                            {/* <td valign='top' className='alignEnd'>{article.prixRemise !== 0 ? -article.prixRemise : ""}</td> */}
                            <td valign='top' className='alignEnd'>{article.total}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </section>
    )
}

export default BillTicket