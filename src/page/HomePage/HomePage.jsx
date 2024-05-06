import React, { useEffect, useState } from 'react'
import './HomePage.css'
import html2canvas from 'html2canvas';
import { saveAs } from 'file-saver';

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

    const handleExportPNG = () => {
        const element = document.getElementById('a4Page');
        const scale = 2;
        const options = {
            scale: scale,
            useCORS: true
        };

        html2canvas(element, options)
            .then((canvas) => {
                canvas.toBlob((blob) => {
                    saveAs(blob, 'page.png');
                }, 'image/png', 1);
            })
            .catch((error) => {
                console.error('Erreur lors de la conversion en image :', error);
            });
    };

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

    const handleSaveArticles = () => {
        const json = JSON.stringify(articles)

        let element = document.createElement('a');
        element.setAttribute('href', 'data:text/plain;charset=utf-8,' + encodeURIComponent(json));
        element.setAttribute('download', "Articles_liste");

        element.style.display = 'none';
        document.body.appendChild(element);

        element.click();
        document.body.removeChild(element);
    }

    const handleCopyJSON = () => {
        const json = JSON.stringify(articles);

        const tempInput = document.createElement("textarea");
        tempInput.value = json;
        document.body.appendChild(tempInput);

        tempInput.select();
        document.execCommand("copy");
        document.body.removeChild(tempInput);
    }

    const handleFileUpload = async (event) => {
        const file = event.target.files[0];
        if (!file) return
        const reader = new FileReader();

        reader.onload = async (event) => {
            const content = event.target.result;

            const obj = JSON.parse(content);
            setArticles(prevArticles => prevArticles.concat(obj));
        };

        reader.readAsText(file);
    };

    return (
        <div>
            <div className="uploadButton">
                <label htmlFor="fileInput" className="btn">Choisir un fichier</label>
                <input style={{ visibility: "hidden" }} type="file" id="fileInput" accept=".txt" onChange={(e) => { handleFileUpload(e) }} />
            </div>
            <button className="downloadButton button-82-pushable elementToHide" onClick={() => handleSaveArticles()}>
                <span className="button-82-shadow"></span>
                <span className="button-82-edge"></span>
                <span className="button-82-front text">
                    Télécharger la liste
                </span>
            </button>
            <button className="downloadButton button-82-pushable elementToHide" onClick={() => handleSaveArticles()}>
                <span className="button-82-shadow"></span>
                <span className="button-82-edge"></span>
                <span className="button-82-front text">
                    Télécharger la liste
                </span>
            </button>

            <button className="copyButton button-82-pushable elementToHide" onClick={() => handleCopyJSON()}>
                <span className="button-82-shadow"></span>
                <span className="button-82-edge"></span>
                <span className="button-82-front text">
                    Copier la liste
                </span>
            </button>
            <button className="PNGButton button-82-pushable elementToHide" onClick={() => handleExportPNG()}>
                <span className="button-82-shadow"></span>
                <span className="button-82-edge"></span>
                <span className="button-82-front text">
                    Importer en PNG
                </span>
            </button>
            <button className="floatingButton button-82-pushable elementToHide" onClick={() => handleToogleForm()}>
                <span className="button-82-shadow"></span>
                <span className="button-82-edge"></span>
                <span className="button-82-front text">
                    Informations générales
                </span>
            </button>
            <button className="shuffleArticles button-82-pushable elementToHide" onClick={() => handleShuffleArticle()}>
                <span className="button-82-shadow"></span>
                <span className="button-82-edge"></span>
                <span className="button-82-front text displayflex">
                    Mélanger la liste
                    <img src={shuffle} alt="shuffle" />
                </span>
            </button>
            <div className='a4Format' id="a4Page">
                {openForm && <FormFacture closeModal={(e) => handleToogleForm(e)} setMainInfos={(e) => setMainInfos(e)} />}
                <section className='headerFacture'>
                    <img src={logo} alt="logoCarrefour" />
                    <p>1/1</p>
                </section>
                <section className='displayMainInfoFacture'>
                    <div>
                        <p className='wrapperP'>{mainInfos?.magasin?.primary || <span>CARREFOUR TOULOUSE PURPAN 36 RTE DE BAYONNE</span>}</p>
                        <p className='wrapperP'>{mainInfos?.magasin?.secondary || <span>PURPAN 31000 TOULOUSE</span>}</p><br />

                        <p className='size11'>Une question sur votre facture ?</p>
                        <p>www.carrefour.fr/nous-contacter</p>
                        <p>Horaires : lun. au sam. de 8h - 22h</p> <br />

                        <p className='wrapperP'>N° de commande {mainInfos?.commandNumber || <span>9999999999999</span>}</p>
                        <p className='wrapperP'>Identifiant client {mainInfos?.clientID || <span>9999999</span>}</p>
                        <p className='wrapperP'>N° de facture {mainInfos?.factureNumber || <span>WEB-999999-99999999</span>}</p><br />

                        <p className='wrapperP'>Merci pour votre commande Carrefour Drive du {mainInfos?.date || <span>01/01/2000</span>}</p><br /><br /><br /><br />
                    </div>
                    <div className='adressInfo'>
                        <p >Adresse de facturation</p>
                        <p className='marginLeft wrapperP'>{mainInfos?.lastName && mainInfos?.firstName ? `${mainInfos.lastName} ${mainInfos.firstName}` : <span>Maxime DUPONT</span>}</p>
                        <p className='marginLeft wrapperP'>{mainInfos?.adresse ? mainInfos.adresse : <span>11 avenue des Champs Elysées</span>}</p>
                        <p className='marginLeft wrapperP'>{mainInfos?.codePostal && mainInfos?.city ? `${mainInfos.codePostal} ${mainInfos.city}` : <span>99 999 Paris</span>}</p>
                        <p className='marginLeft wrapperP'>{mainInfos?.country ? mainInfos.country : <span>France</span>}</p><br />
                    </div>
                </section>
                <section className='dateRow'>
                    <div>
                        <p className='italic'>Date de commande</p>
                        <p className='wrapperP marginLeft'>{mainInfos?.date || <span>01/01/2000</span>}</p>
                    </div>
                    <div>
                        <p className='italic'>Date de Facturation</p>
                        <p className='wrapperP marginLeft'>{mainInfos?.dateFacturation || <span>01/01/2000</span>}</p>
                    </div>
                    <div className='marginEnd'>
                        <p className='italic'>Date de livraison</p>
                        <p className='wrapperP marginLeft'>{mainInfos?.dateFacturation || <span>01/01/2000</span>}</p>
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