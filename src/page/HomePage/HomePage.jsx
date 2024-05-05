import React, { useEffect, useState } from 'react'
import './HomePage.css'

import logo from '../../assets/logoCarrefour.png'
import Bill from '../../component/Bill/Bill'
import FormFacture from '../../component/Modals/FormFacture/FormFacture'
import shuffle from "../../assets/shuffle.svg"

function HomePage() {
    let [openForm, setOpenForm] = useState(true)
    let [mainInfos, setMainInfos] = useState({})
    let [articles, setArticles] = useState([])
    let [totaux, setTotaux] = useState({ totalRemises: 0, totalPanier: 0, totalNbrArticle: 0 })

    const handleToogleForm = (e) => {
        setOpenForm(!openForm)
        if (e) {
            setMainInfos(e)
        }
    }

    useEffect(() => {
        if (articles.length > 0) {
            let calcs = {
                totalRemises: parseFloat(articles.filter(element => element.prixRemise !== "").reduce((total, element) => total + parseFloat(element.prixRemise), 0)).toFixed(2),
                totalPanier: parseFloat(articles.reduce((total, element) => total + parseFloat(element.total), 0) + 0.70),
                totalNbrArticle: parseFloat(articles.reduce((total, element) => total + parseFloat(element.qtyCmd), 0) + 2)
            }
            setTotaux(calcs)
        }
    }, [articles]);

    const handleShuffleArticle = () => {
        const updatedArticles = [...articles];
        for (let i = updatedArticles.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [updatedArticles[i], updatedArticles[j]] = [updatedArticles[j], updatedArticles[i]];
        }
        setArticles(updatedArticles)
    }

    return (
        <div>
            <button class="floatingButton button-82-pushable elementToHide" onClick={() => handleToogleForm()}>
                <span class="button-82-shadow"></span>
                <span class="button-82-edge"></span>
                <span class="button-82-front text">
                    Informations générales
                </span>
            </button>
            <button class="shuffleArticles button-82-pushable elementToHide" onClick={() => handleShuffleArticle()}>
                <span class="button-82-shadow"></span>
                <span class="button-82-edge"></span>
                <span class="button-82-front text displayflex">
                    Mélanger la liste
                    <img src={shuffle} alt="shuffle" />
                </span>
            </button>
            <div className='a4Format'>
                {openForm && <FormFacture closeModal={(e) => handleToogleForm(e)} setMainInfos={(e) => setMainInfos(e)} />}
                <section className='headerFacture'>
                    <img src={logo} alt="logoCarrefour" />
                    <p>1/1</p>
                </section>
                <section className='displayMainInfoFacture'>
                    <div>
                        <p className='wrapperP'>{mainInfos?.magasin?.primary || <p>CARREFOUR TOULOUSE PURPAN 36 RTE DE BAYONNE</p>}</p>
                        <p className='wrapperP'>{mainInfos?.magasin?.secondary || <p>PURPAN 31000 TOULOUSE</p>}</p><br />

                        <p className='size11'>Une question sur votre facture ?</p>
                        <p>www.carrefour.fr/nous-contacter</p>
                        <p>Horaires : lun. au sam. de 8h - 22h</p> <br />

                        <p className='wrapperP'>N° de commande {mainInfos?.commandNumber || <p>9999999999999</p>}</p>
                        <p className='wrapperP'>Identifiant client {mainInfos?.clientID || <p>9999999</p>}</p>
                        <p className='wrapperP'>N° de facture {mainInfos?.factureNumber || <p>WEB-999999-99999999</p>}</p><br />

                        <p className='wrapperP'>Merci pour votre commande Carrefour Drive du {mainInfos?.date || <p>01/01/2000</p>}</p><br /><br /><br /><br />
                    </div>
                    <div className='adressInfo'>
                        <p >Adresse de facturation</p>
                        {mainInfos.lastName ? <p className='marginLeft'>{mainInfos?.lastName} {mainInfos?.firstName}</p> : <p>Maxime DUPONT</p>}
                        {mainInfos.adresse ? <p className='marginLeft'>{mainInfos?.adresse}</p> : <p>11 avenue des Champs Elysées</p>}
                        {mainInfos.codePostal ? <p className='marginLeft'>{mainInfos?.codePostal} {mainInfos?.city}</p> : <p>99 999 Paris</p>}
                        {mainInfos.country ? <p className='marginLeft'>{mainInfos?.country}</p> : <p>France</p>}<br />
                    </div>
                </section>
                <section className='dateRow'>
                    <div>
                        <p className='italic'>Date de commande</p>
                        <p className='wrapperP marginLeft'>{mainInfos?.date || <p>01/01/2000</p>}</p>
                    </div>
                    <div>
                        <p className='italic'>Date de Facturation</p>
                        <p className='wrapperP marginLeft'>{mainInfos?.dateFacturation || <p>01/01/2000</p>}</p>
                    </div>
                    <div className='marginEnd'>
                        <p className='italic'>Date de livraison</p>
                        <p className='wrapperP marginLeft'>{mainInfos?.dateFacturation || <p>01/01/2000</p>}</p>
                    </div>
                </section>
                <Bill articles={articles} setArticles={(e) => { setArticles(e) }} />
                <section className='bilanFacture'>
                    <div className='nbrArticle'><p>Nombres d'articles remis :</p><p>{totaux.totalNbrArticle}</p><br /><br /></div>
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
                <section className='footer'>
                    <p>SARL RMS 31 , au capital de: 8000€, DOMAINE DE BONNE SOURCE NARBONNE 11100, RCS</p>
                    <p>NARBONNE 91070684500013 TVA CEE FR20910706845</p>
                </section>
            </div>
        </div>
    )
}

export default HomePage