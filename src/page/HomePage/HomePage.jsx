import React, { useState } from 'react'
import './HomePage.css'

import logo from '../../assets/logoCarrefour.png'
import Bill from '../../component/Bill/Bill'
import FormFacture from '../../component/FormFacture/FormFacture'

function HomePage() {
    let [openForm, setOpenForm] = useState(true)
    let [mainInfos, setMainInfos] = useState({})
    let [articles, setArticles] = useState([])

    const handleToogleForm = (e) => {
        setOpenForm(!openForm)
        if (e) {
            setMainInfos(e)
        }
    }

    return (
        <div>
            <button className='floatingButton' onClick={() => handleToogleForm()}>+ infos générales</button>
            <div className='a4Format'>
                {openForm && <FormFacture closeModal={(e) => { handleToogleForm(e) }} setMainInfos={(e) => { setMainInfos(e) }} />}
                <div className='toto'> {/* to be removed */}
                    <div className='headerFacture'>
                        <img src={logo} alt="logoCarrefour" />
                        <p>1/1</p>
                    </div>
                    <div className='displayMainInfoFacture'>
                        <div>
                            <p>CARREFOUR TOULOUSE PURPAN 36 RTE DE BAYONNE</p> <br />
                            <p>PURPAN 31000 TOULOUSE</p> <br /><br />
                            <p className='size11'>Une question sur votre facture ?</p> <br />
                            <p>www.carrefour.fr/nous-contacter</p> <br />
                            <p>Horaires : lun. au sam. de 8h - 22h</p> <br /><br />
                            <p>N° de commande {mainInfos?.commandNumber}</p> <br />
                            <p>Identifiant client {mainInfos?.clientID}</p> <br />
                            <p>N° de facture {mainInfos?.factureNumber}</p> <br /><br />
                            <p>Merci pour votre commande Carrefour Drive du {mainInfos?.date}</p><br /><br /><br /><br /><br />
                        </div>
                        <div className='adressInfo'>
                            <p >Adresse de facturation</p> <br />
                            <p className='marginLeft'>{mainInfos?.lastName} {mainInfos?.firstName}</p> <br />
                            <p className='marginLeft'>{mainInfos?.adresse}</p> <br />

                            <p className='marginLeft'>{mainInfos?.codePostal} {mainInfos?.city}</p> <br />
                            <p className='marginLeft'>{mainInfos?.country}</p> <br /><br />
                        </div>
                    </div>
                    <div className='dateRow'>
                        <div>
                            <p className='italic'>Date de commande</p>
                            <p className='marginLeft'>{mainInfos?.date}</p>
                        </div>
                        <div>
                            <p className='italic'>Date de Facturation</p>
                            <p className='marginLeft'>{mainInfos?.dateFacturation}</p>
                        </div>
                        <div className='marginEnd'>
                            <p className='italic'>Date de livraison</p>
                            <p className='marginLeft'>{mainInfos?.dateLivraison}</p>
                        </div>
                    </div>
                    <Bill articles={articles} setArticles={(e)=> {setArticles(e)}}/>
                    <div className='bilanFacture'>
                        <div className='nbrArticle'><p>Nombres d'articles remis :</p><p>17</p><br /><br /></div>
                        <div style={{ width: "40%" }}>
                            <div className='totalBill'>
                                <div>
                                    <p>Total de vos remises</p>
                                    <p>-10.77</p>
                                </div>
                                <div>
                                    <p>Total panier YYC (après remises)</p>
                                    <p>59.68</p>
                                </div>
                                <br />
                                <div>
                                    <p>Remise panier TTC</p>
                                    <p>-6.00</p>
                                </div>
                                <br />
                                <br />
                                <div>
                                    <p>Frais de préparation TTC</p>
                                    <p>Offerts</p>
                                </div>
                                <br />
                                <div>
                                    <p>Total TTC en Euros</p>
                                    <p>53.68</p>
                                </div>
                            </div>
                            <div className='totalBill'>
                                <p>Modes de règlement</p>
                                <div>
                                    <p>Compte fidélité</p>
                                    <p>52.61</p>
                                </div>
                                <br />
                                <div>
                                    <p>Carte Bancaire</p>
                                    <p>1.07</p>
                                </div>
                                <br />
                                <br />
                                <div>
                                    <p>Total TTC en Euros</p>
                                    <p>53.68</p>
                                </div>
                                <br />
                            </div>
                        </div>
                    </div>
                    <div className='footer'>
                        <p>SARL RMS 31 , au capital de: 8000€, DOMAINE DE BONNE SOURCE NARBONNE 11100, RCS</p>
                        <p>NARBONNE 91070684500013 TVA CEE FR20910706845</p>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default HomePage