import React from 'react'
import "./BilanFacture.css"

function BilanFacture(props) {
    let { totaux, tvaArray } = props

    return (
        <section className='bilanFacture'>
            <div className='recapFacture'>

                <table className='tvaTable'>
                    <thead>
                        <tr>
                            <th></th>
                            <th>Total</th>
                            {tvaArray.prix0 !== 0 && <th>TVA 0</th>}
                            {tvaArray.prix5 !== 0 && <th>TVA 5.5</th>}
                            {tvaArray.prix10 !== 0 && <th>TVA 10</th>}
                            {tvaArray.prix20 !== 0 && <th>TVA 20</th>}
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td>HT</td>
                            <td className='alignEnd'>{tvaArray?.totalPrix}</td>
                            {tvaArray.prix0 !== 0 && <td className='alignEnd'>{tvaArray?.prix0}</td>}
                            {tvaArray.prix5 !== 0 && <td className='alignEnd'>{tvaArray?.prix5}</td>}
                            {tvaArray.prix10 !== 0 && <td className='alignEnd'>{tvaArray?.prix10}</td>}
                            {tvaArray.prix20 !== 0 && <td className='alignEnd'>{tvaArray?.prix20}</td>}
                        </tr>
                        <tr>
                            <td>TVA</td>
                            <td className='alignEnd'>{tvaArray?.totalTVA}</td>
                            {tvaArray.prix0 !== 0 && <td className='alignEnd'>{tvaArray?.tva0}</td>}
                            {tvaArray.prix5 !== 0 && <td className='alignEnd'>{tvaArray?.tva5}</td>}
                            {tvaArray.prix10 !== 0 && <td className='alignEnd'>{tvaArray?.tva10}</td>}
                            {tvaArray.prix20 !== 0 && <td className='alignEnd'>{tvaArray?.tva20}</td>}
                        </tr>
                    </tbody>
                </table>
                <br /><br />
                <br /><br />
                <br /><br /><br />

                <div className='nbrArticle'>
                    <p>Nombres d'articles remis :</p><p>{totaux.totalNbrArticle}</p><br /><br />
                </div>
            </div>
            <div style={{ width: "40%" }}>
                <div className='totalBill'>
                    <div>
                        <p>Total de vos remises</p>
                        <p>{totaux.totalRemises}</p>
                    </div>
                    <div>
                        <p>Total panier TTC (après remises)</p>
                        <p>{totaux.totalPanier.toFixed(2)}</p>
                    </div>
                    <br />
                    {/* <div>
                <p>Remise panier TTC</p>
                <p>-6.00</p>
            </div> */}
                    <br />
                    <br />
                    <div>
                        <p>Frais de préparation TTC</p>
                        <p>Offerts</p>
                    </div>
                    <br />
                    <div>
                        <p>Total TTC en Euros</p>
                        <p>{totaux.totalPanier.toFixed(2)}</p>
                    </div>
                </div>
                <div className='totalBill'>
                    <p>Modes de règlement</p>
                    <div>
                        <p>Compte fidélité</p>
                        <p>{(totaux.totalPanier * 0.23).toFixed(2)}</p>
                    </div>
                    <div>
                        <p>Carte Bancaire</p>
                        <p>{(totaux.totalPanier * 0.77).toFixed(2)}</p>
                    </div>
                    <br />
                    <br />
                    <div>
                        <p>Total TTC en Euros</p>
                        <p>{totaux.totalPanier.toFixed(2)}</p>
                    </div>
                    <br />
                </div>
            </div>
        </section>
    )
}

export default BilanFacture