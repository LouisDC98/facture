import React, { useEffect, useState } from 'react'
import './HomePage.css'
import html2canvas from 'html2canvas';
import { saveAs } from 'file-saver';


import Bill from '../../component/BillFacture/BillFacture'
import FormFacture from '../../component/Modals/FormFacture/FormFacture'
import shuffle from "../../assets/shuffle.svg"
import HeaderFacture from '../../component/HeaderFacture/HeaderFacture';
import HeaderTicket from '../../component/HeaderTicket/HeaderTicket';
import BillTicket from '../../component/BillTicket/BillTicket';
import BilanFacture from '../../component/BilanFacture/BilanFacture';
import BilanTicket from '../../component/BilanTicket/BilanTicket';
import FooterFacture from '../../component/FooterFacture/FooterFacture';
import FooterTicket from '../../component/FooterTicket/FooterTicket';

function HomePage() {
    let [openForm, setOpenForm] = useState(true)
    let [mainInfos, setMainInfos] = useState({})
    let [articles, setArticles] = useState([])
    let [tvaArray, setTvaArray] = useState([])
    let [heure, setHeure] = useState(undefined)
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
                    saveAs(blob, `facture_${mainInfos?.factureNumber}.png`);
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
        calcTVA()
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

    function calcTVA() {
        let montantsParTVA = {
            prix0: 0,
            tva0: 0,
            prix5: 0,
            tva5: 0,
            prix10: 0,
            tva10: 0,
            prix20: 0,
            tva20: 0,
            totalPrix: 0,
            totalTVA: 0
        };

        let tempArticles = [...articles, { total: "0.70", tva: "0" }]

        tempArticles.forEach(objet => {
            const total = parseFloat(objet.total);
            const tva = parseFloat(objet.tva);

            const montantHT = total - (total * tva / (100 + tva));
            const montantTVA = total * tva / (100 + tva);

            switch (tva) {
                case 0:
                    montantsParTVA.prix0 += montantHT;
                    montantsParTVA.tva0 += montantTVA;
                    break;
                case 5.5:
                    montantsParTVA.prix5 += montantHT;
                    montantsParTVA.tva5 += montantTVA;
                    break;
                case 10:
                    montantsParTVA.prix10 += montantHT;
                    montantsParTVA.tva10 += montantTVA;
                    break;
                case 20:
                    montantsParTVA.prix20 += montantHT;
                    montantsParTVA.tva20 += montantTVA;
                    break;
                default:
                    break;
            }
        });
        montantsParTVA.totalPrix = (montantsParTVA.prix0 + montantsParTVA.prix5 + montantsParTVA.prix10 + montantsParTVA.prix20);
        montantsParTVA.totalTVA = (montantsParTVA.tva0 + montantsParTVA.tva5 + montantsParTVA.tva10 + montantsParTVA.tva20);

        for (let key in montantsParTVA) {
            montantsParTVA[key] = montantsParTVA[key].toFixed(2);
        }
        setTvaArray(montantsParTVA);
    }

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
                    <label htmlFor="switch">Toggle</label>
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
                {format ? <HeaderFacture mainInfos={mainInfos} /> : <HeaderTicket mainInfos={mainInfos} setHeure={(heure) => setHeure(heure)} />}
                {format ? <Bill articles={articles} setArticles={(e) => { setArticles(e) }} /> : <BillTicket articles={articles} setArticles={(e) => { setArticles(e) }} />}
                {format ? <BilanFacture totaux={totaux} tvaArray={tvaArray} /> : <BilanTicket articles={articles} totaux={totaux} tvaArray={tvaArray} />}
                {format ? <FooterFacture /> : <FooterTicket mainInfos={mainInfos} heure={heure} />}
            </div>
        </div>
    )
}

export default HomePage