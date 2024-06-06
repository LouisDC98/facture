import React, { useEffect, useState, useRef } from 'react'
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
import essential from "../../essential.json"
import randomArticles from "../../randomArticles.json"
import BarCodeModal from '../../component/Modals/BarCodeModal/BarCodeModal';

import { randomFactureNbr, randomCommandNbr, autoDate, formatDate } from "../../callBack.js"

function HomePage() {
    const fileInputRef = useRef(null);
    let [openForm, setOpenForm] = useState(true)
    let [mainInfos, setMainInfos] = useState({})
    let [articles, setArticles] = useState([])
    let [tvaArray, setTvaArray] = useState([])
    let [heure, setHeure] = useState(undefined)
    let [format, setFormat] = useState(true)
    let [totaux, setTotaux] = useState({ totalRemises: 0, totalPanier: 0, totalNbrArticle: 0 })
    let [openBarCode, setOpenBarCode] = useState(false)
    let [nbrRandomArticles, setNbrRandomArticles] = useState(0)

    const handleToogleForm = (e) => {
        setOpenForm(!openForm)
        if (e) {
            setMainInfos({ ...e, currentProfile: e.profile[0] })
        }
    }

    const handleExportPNG = async () => {
        const element = document.getElementById('a4Page');
        const scale = 2;
        const options = {
            scale: scale,
            useCORS: true
        };

        for (let i = 0; i < mainInfos.profile.length; i++) {
            if (i > 0) {
                let filteredArticles = articles.filter(article => !article.random)
                setArticles(filteredArticles);
                let nbrRandomArticles2 = articles.filter(article => article.random).length;

                let newArticles = handleAddRandomArticles(nbrRandomArticles2, filteredArticles)
                handleShuffleArticle(newArticles)
            }

            setMainInfos(prevState => ({
                ...prevState,
                currentProfile: mainInfos.profile[i],
                data: {
                    ...prevState.data,
                    factureNumber: randomFactureNbr(),
                    commandNumber: randomCommandNbr()
                }
            }));
            await new Promise(resolve => setTimeout(resolve, 100));

            html2canvas(element, options)
                .then((canvas) => {
                    canvas.toBlob((blob) => {
                        saveAs(blob, `facture_${mainInfos?.data.factureNumber}.png`);
                    }, 'image/png', 1);
                })
                .catch((error) => {
                    console.error('Erreur lors de la conversion en image :', error);
                });
        }
    };

    const consecutiveDates = (dateDebut) => {
        const dates = [];
        const [day, month, year] = dateDebut.split('/');
        let jour = new Date(`${month}/${day}/${year}`);

        while (dates.length < 5) {
            jour.setDate(jour.getDate() + 1);
            const formattedDate = `${jour.getFullYear()}-${((jour.getMonth() + 1) < 10 ? '0' : '') + (jour.getMonth() + 1)}-${(jour.getDate() < 10 ? '0' : '') + jour.getDate()}`;
            dates.push(formattedDate);
        }
        return dates;
    }

    const facturationDateSetting = (e) => {
        if (!e) return
        let { day, month, year } = autoDate(e)
        return day + '/' + month + '/' + year
    }

    const handleExportPNGx4 = async () => {
        const dates = consecutiveDates(mainInfos.date);
        for (let i = 0; i < dates.length; i++) {
            setMainInfos(prevArticles => ({
                ...prevArticles,
                date: formatDate(dates[i]),
                dateFacturation: facturationDateSetting(dates[i]),
                factureNumber: randomFactureNbr(),
                commandNumber: randomCommandNbr()
            }));
            handleShuffleArticle(articles)
            await new Promise(resolve => setTimeout(resolve, 100));
            handleExportPNG();
        }
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

    const handleShuffleArticle = (customArticle) => {
        const updatedArticles = [...customArticle];
        for (let i = updatedArticles.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [updatedArticles[i], updatedArticles[j]] = [updatedArticles[j], updatedArticles[i]];
        }
        setArticles(updatedArticles)
    }

    const handleAddEssentials = () => {
        const updatedArticles = [...articles, ...essential];
        setArticles(updatedArticles)
    }

    const handleAddRandomArticles = (nbrToAdd, listArticle) => {
        const shuffledRandomArticles = [...randomArticles].sort(() => 0.5 - Math.random());
        const selectedArticles = shuffledRandomArticles.slice(0, nbrToAdd);
        const updatedArticles = [...listArticle, ...selectedArticles];

        setArticles(updatedArticles);
        return updatedArticles
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
        fileInputRef.current.value = ''
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
            montantsParTVA[key] = parseFloat(montantsParTVA[key].toFixed(2));
        }
        setTvaArray(montantsParTVA);
    }

    return (
        <div>
            <div className="uploadButton">
                <label htmlFor="fileInput" className="btn">Importer une liste</label>
                <input style={{ visibility: "hidden" }} type="file" id="fileInput" ref={fileInputRef} accept=".txt" onChange={(e) => { handleFileUpload(e) }} />
            </div>
            <button className="downloadButton button-82-pushable elementToHide" onClick={() => handleSaveArticles()}>
                <span className="button-82-shadow"></span>
                <span className="button-82-edge"></span>
                <span className="button-82-front text">
                    Exporter la liste
                </span>
            </button>
            <button className="essentialList button-82-pushable elementToHide" onClick={() => handleAddEssentials()}>
                <span className="button-82-shadow"></span>
                <span className="button-82-edge"></span>
                <span className="button-82-front text">
                    Importer les essentiels
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
            {/* <button className="PNGButtonx4 button-82-pushable elementToHide" onClick={() => handleExportPNGx4()}>
                <span className="button-82-shadow"></span>
                <span className="button-82-edge"></span>
                <span className="button-82-front text">
                    Exporter en PNGx4
                </span>
            </button> */}
            <button className="floatingButton button-82-pushable elementToHide" onClick={() => handleToogleForm()}>
                <span className="button-82-shadow"></span>
                <span className="button-82-edge"></span>
                <span className="button-82-front text">
                    Informations générales
                </span>
            </button>
            <button className="barCodesButton button-82-pushable elementToHide" onClick={() => setOpenBarCode(!openBarCode)}>
                <span className="button-82-shadow"></span>
                <span className="button-82-edge"></span>
                <span className="button-82-front text">
                    Montrer les codes barres
                </span>
            </button>
            <button className="shuffleArticles button-82-pushable elementToHide" onClick={() => handleShuffleArticle(articles)}>
                <span className="button-82-shadow"></span>
                <span className="button-82-edge"></span>
                <span className="button-82-front text displayflex">
                    Mélanger la liste
                    <img src={shuffle} alt="shuffle" />
                </span>
            </button>
            <div className="addRandomArticle">
                <input type='number' onChange={(e) => setNbrRandomArticles(e.target.value)}></input>
                <button className="button-82-pushable elementToHide" onClick={() => handleAddRandomArticles(nbrRandomArticles, articles)}>
                    <span className="button-82-shadow"></span>
                    <span className="button-82-edge"></span>
                    <span className="button-82-front text displayflex">
                        + articles random
                    </span>
                </button>
            </div>
            <div className={`a4Format ${!format ? 'ticketFormat' : ''}`} id="a4Page">
                {openBarCode && <BarCodeModal closeModal={() => setOpenBarCode(!openBarCode)} articles={articles} />}
                {openForm && <FormFacture closeModal={(e) => handleToogleForm(e)} setMainInfos={(e) => setMainInfos(e)} mainInfos={mainInfos} />}
                {format ? <HeaderFacture mainInfos={mainInfos} /> : <HeaderTicket mainInfos={mainInfos} setHeure={(heure) => setHeure(heure)} />}
                {format ? <Bill articles={articles} setArticles={(e) => { setArticles(e) }} /> : <BillTicket articles={articles} setArticles={(e) => { setArticles(e) }} />}
                {format ? <BilanFacture totaux={totaux} tvaArray={tvaArray} /> : <BilanTicket cardNumber={mainInfos.cardNumber} totaux={totaux} tvaArray={tvaArray} />}
                {format ? <FooterFacture /> : <FooterTicket mainInfos={mainInfos} heure={heure} />}
            </div>
        </div>
    )
}

export default HomePage