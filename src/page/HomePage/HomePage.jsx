import React, { useEffect, useState } from 'react'
import './HomePage.css'
import html2canvas from 'html2canvas';
import { saveAs } from 'file-saver';


import Bill from '../../component/Bill/Bill'
import FormFacture from '../../component/Modals/FormFacture/FormFacture'
import shuffle from "../../assets/shuffle.svg"
import HeaderFacture from '../../component/HeaderFacture/HeaderFacture';
import HeaderTicket from '../../component/HeaderTicket/HeaderTicket';
import BillTicket from '../../component/BillTicket/BillTicket';

function HomePage() {
    let [openForm, setOpenForm] = useState(true)
    let [mainInfos, setMainInfos] = useState({})
    let [articles, setArticles] = useState([])
    let [tvaArray, setTvaArray] = useState([])
    let [format, setFormat] = useState(true)
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
                    saveAs(blob, 'facture.png');
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
        // calcTVA()
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

    // const handleCopyJSON = () => {
    //     const json = JSON.stringify(articles);

    //     const tempInput = document.createElement("textarea");
    //     tempInput.value = json;
    //     document.body.appendChild(tempInput);

    //     tempInput.select();
    //     document.execCommand("copy");
    //     document.body.removeChild(tempInput);
    // }

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

    const calcTVA = () => {
        let toto = {
            prix0: "0.00",
            tva0: "0.00",
            prix5: "0.00",
            tva5: "0.00",
            prix10: "0.00",
            tva10: "0.00",
            prix20: "0.00",
            tva20: "0.00",
        };

        for (const e of articles) {
            if (e.tva === "0") {
                toto.prix0 = ((Number(e.prixUnit) - Number(e.prixRemise)) * (1 - 0)).toFixed(2);
                toto.tva0 = ((Number(e.prixUnit) - Number(e.prixRemise)) * 0).toFixed(2);
            } else if (e.tva === "5.5") {
                toto.prix5 = ((Number(e.prixUnit) - Number(e.prixRemise)) * (1 - 0.055)).toFixed(2);
                toto.tva5 = ((Number(e.prixUnit) - Number(e.prixRemise)) * 0.055).toFixed(2);
            } else if (e.tva === "10") {
                toto.prix10 = ((Number(e.prixUnit) - Number(e.prixRemise)) * (1 - 0.1)).toFixed(2);
                toto.tva10 = ((Number(e.prixUnit) - Number(e.prixRemise)) * 0.1).toFixed(2);
            } else if (e.tva === "20") {
                toto.prix20 = ((Number(e.prixUnit) - Number(e.prixRemise)) * 1 - Number(e.tva) / 100).toFixed(2);
                toto.tva20 = ((Number(e.prixUnit) - Number(e.prixRemise)) * Number(e.tva) / 100).toFixed(2);
            }
            toto.prixTotal = ((Number(e.prixUnit) - Number(e.prixRemise)) * 1 - Number(e.tva) / 100).toFixed(2);
            // toto.tvaTotal = ((Number(e.prixUnit) - Number(e.prixRemise)) * (Number(e.tva) / 100)).toFixed(2);
            toto.tvaTotal = (20 * 0.2).toFixed(2);
        }
        setTvaArray(toto);
    };

    return (
        <div>
            <div className="uploadButton">
                <label htmlFor="fileInput" className="btn">Importer la liste</label>
                <input style={{ visibility: "hidden" }} type="file" id="fileInput" accept=".txt" onChange={(e) => { handleFileUpload(e) }} />
            </div>
            <button className="downloadButton button-82-pushable elementToHide" onClick={() => handleSaveArticles()}>
                <span className="button-82-shadow"></span>
                <span className="button-82-edge"></span>
                <span className="button-82-front text">
                    Exporter la liste
                </span>
            </button>

            {/* <button className="copyButton button-82-pushable elementToHide" onClick={() => handleCopyJSON()}>
                <span className="button-82-shadow"></span>
                <span className="button-82-edge"></span>
                <span className="button-82-front text">
                    Copier la liste
                </span>
            </button> */}
            <div className='switchFormat'>
                <p>facture</p>
                <div className='formatInput'>
                    <input type="checkbox" id="switch" onClick={() => setFormat(!format)} />
                    <label for="switch">Toggle</label>
                </div>
                <p>ticket</p>
            </div>
            <button className="PNGButton button-82-pushable elementToHide" onClick={() => handleExportPNG()}>
                <span className="button-82-shadow"></span>
                <span className="button-82-edge"></span>
                <span className="button-82-front text">
                    Exporter en PNG
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
            <div className={`a4Format ${!format ? 'ticketFormat' : ''}`} id="a4Page">
                {openForm && <FormFacture closeModal={(e) => handleToogleForm(e)} setMainInfos={(e) => setMainInfos(e)} />}
                {format ? <HeaderFacture mainInfos={mainInfos} /> : <HeaderTicket />}
                {format ? <Bill articles={articles} setArticles={(e) => { setArticles(e) }} /> : <BillTicket articles={articles} setArticles={(e) => { setArticles(e) }} />}
                {/* <Bill articles={articles} setArticles={(e) => { setArticles(e) }} /> */}
                <section className='bilanFacture'>
                    <div className='recapFacture'>
                        {/* 
                        <table className='tvaTable'>
                            <thead>
                                <tr>
                                    <th></th>
                                    <th>Total</th>
                                    {tvaArray.prix0 !== "0.00" && <th>TVA 0</th>}
                                    {tvaArray.prix5 !== "0.00" && <th>TVA 5.5</th>}
                                    {tvaArray.prix10 !== "0.00" && <th>TVA 10</th>}
                                    {tvaArray.prix20 !== "0.00" && <th>TVA 20</th>}
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td>HT</td>
                                    <td className='alignEnd'>{tvaArray?.prixTotal}</td>
                                    {tvaArray.prix0 !== "0.00" && <td className='alignEnd'>{tvaArray?.prix0}</td>}
                                    {tvaArray.prix5 !== "0.00" && <td className='alignEnd'>{tvaArray?.prix5}</td>}
                                    {tvaArray.prix10 !== "0.00" && <td className='alignEnd'>{tvaArray?.prix10}</td>}
                                    {tvaArray.prix20 !== "0.00" && <td className='alignEnd'>{tvaArray?.prix20}</td>}
                                </tr>
                                <tr>
                                    <td>TVA</td>
                                    <td className='alignEnd'>{tvaArray?.tvaTotal}</td>
                                    {tvaArray.prix0 !== "0.00" && <td className='alignEnd'>{tvaArray?.tva0}</td>}
                                    {tvaArray.prix5 !== "0.00" && <td className='alignEnd'>{tvaArray?.tva5}</td>}
                                    {tvaArray.prix10 !== "0.00" && <td className='alignEnd'>{tvaArray?.tva10}</td>}
                                    {tvaArray.prix20 !== "0.00" && <td className='alignEnd'>{tvaArray?.tva20}</td>}
                                </tr>
                            </tbody>
                        </table>
                        <br /><br />
                        <br /><br />
                        <br /><br /><br /> */}

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
                <section className='footer'>
                    <p>SARL RMS 31 , au capital de: 8000€, DOMAINE DE BONNE SOURCE NARBONNE 11100, RCS</p>
                    <p>NARBONNE 91070684500013 TVA CEE FR20910706845</p>
                </section>
            </div>
        </div>
    )
}

export default HomePage