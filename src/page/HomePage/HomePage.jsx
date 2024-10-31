import React, { useEffect, useState, useRef } from 'react'
import './HomePage.css'
import html2canvas from 'html2canvas';
import { saveAs } from 'file-saver';
import { CSSTransition } from 'react-transition-group';


import Bill from '../../component/BillFacture/BillFacture'
import FormFacture from '../../component/Modals/FormFacture/FormFacture'
import HeaderFacture from '../../component/HeaderFacture/HeaderFacture';
import HeaderTicket from '../../component/HeaderTicket/HeaderTicket';
import BillTicket from '../../component/BillTicket/BillTicket';
import BilanFacture from '../../component/BilanFacture/BilanFacture';
import BilanTicket from '../../component/BilanTicket/BilanTicket';
import FooterFacture from '../../component/FooterFacture/FooterFacture';
import FooterTicket from '../../component/FooterTicket/FooterTicket';
import randomArticles from "../../data/randomArticles.json"
import BarCodeModal from '../../component/Modals/BarCodeModal/BarCodeModal';

import { randomFactureNbr, randomCommandNbr } from "../../callBack.js"
import BtnCustom from '../../component/BtnCustom/BtnCustom.jsx';
import TrollModal from '../../component/Modals/TrollModal/TrollModal.jsx';
import ArticleModal from '../../component/Modals/ArticlesModal/Articlesmodal.jsx';

import duneSilence from "../../assets/duneSlience.gif"
import duneMore from "../../assets/duneMore.gif"
// import MovingImage from '../../component/MovingImage/MovingImage.jsx';

function HomePage() {
    const fileInputRef = useRef(null);
    let [openForm, setOpenForm] = useState(!(window.innerWidth < 1000))
    let [mainInfos, setMainInfos] = useState({})
    let [articles, setArticles] = useState([])
    let [tvaArray, setTvaArray] = useState([])
    let [heure, setHeure] = useState(undefined)
    let [format, setFormat] = useState(true)
    let [totaux, setTotaux] = useState({ totalRemises: 0, totalPanier: 0, totalNbrArticle: 0 })
    let [openBarCode, setOpenBarCode] = useState(false)
    let [openTroll, setOpenTroll] = useState(false)
    let [openArticles, setOpenArticles] = useState(window.innerWidth < 1000)
    let [gif, setGif] = useState(undefined)

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
                        saveAs(blob, `facture_${mainInfos.profile[i].factureNumber}.png`);
                    }, 'image/png', 1);
                })
                .catch((error) => {
                    console.error('Erreur lors de la conversion en image :', error);
                });
        }
    };

    let isMobile = window.innerWidth < 1000

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
        if (customArticle?.length > 0) {
            const updatedArticles = [...customArticle];
            for (let i = updatedArticles.length - 1; i > 0; i--) {
                const j = Math.floor(Math.random() * (i + 1));
                [updatedArticles[i], updatedArticles[j]] = [updatedArticles[j], updatedArticles[i]];
            }
            setArticles(updatedArticles)
        }
    }

    const handleAddRandomArticles = (nbrToAdd, listArticle, initial) => {
        if (nbrToAdd < 0) {
            setGif(duneSilence)
            setOpenTroll(true)
            return
        }
        if (Number(nbrToAdd) === 0) {
            setGif(duneMore)
            setOpenTroll(true)
            return
        }
        const shuffledRandomArticles = [...randomArticles].sort(() => 0.5 - Math.random());
        if (!initial) {
            if (nbrToAdd > 2 && nbrToAdd <= 6) {
                nbrToAdd += Math.floor(Math.random() * nbrToAdd - 1)
            } else if (nbrToAdd > 6) {
                nbrToAdd -= Math.floor(Math.random() * nbrToAdd - 1)
            }
        }
        const selectedArticles = shuffledRandomArticles.slice(0, nbrToAdd);

        const updatedArticles = selectedArticles.map(article => {
            const adjustment = (Math.random() - 0.5) * 0.5;
            const updatedPrixUnit = (article.prixUnit + adjustment).toFixed(2);
            const updatedArticle = {
                ...article,
                prixUnit: parseFloat(updatedPrixUnit)
            };
            return updatedArticle;
        });

        const finalArticles = [...listArticle, ...updatedArticles];

        setArticles(finalArticles);
        return finalArticles
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
            {/* <MovingImage /> */}
            <div className="uploadButton">
                <label htmlFor="fileInput" className="btn">Importer une liste</label>
                <input style={{ visibility: "hidden" }} type="file" id="fileInput" ref={fileInputRef} accept=".txt" onChange={(e) => { handleFileUpload(e) }} />
            </div>
            <BtnCustom title="Exporter la liste" position="downloadButton" action={() => handleSaveArticles()} />
            <BtnCustom title="Exporter en PNG" position="PNGButton" action={() => handleExportPNG()} />
            <BtnCustom title="Informations générales" position="floatingButton" action={() => setOpenForm(true)} />
            <BtnCustom title="Montrer les codes barres" position="barCodesButton" action={() => setOpenBarCode(true)} />
            <BtnCustom title="Mélanger la liste" position="shuffleArticles" action={() => handleShuffleArticle(articles)} />
            <BtnCustom title="Exporter la liste" position="downloadButton" action={() => handleSaveArticles()} />
            <BtnCustom title="Gestion articles" position="articlesButton" action={() => setOpenArticles(true)} />
            <div className='switchFormat'>
                <p>facture</p>
                <div className='formatInput'>
                    <input type="checkbox" id="switch" onClick={() => setFormat(!format)} />
                    <label htmlFor="switch">Toggle</label>
                </div>
                <p>ticket</p>
            </div>
            <div className={`a4Format ${!format ? 'ticketFormat' : ''}`} id="a4Page">
                {openTroll && <TrollModal closeModal={() => setOpenTroll(false)} gif={gif} />}
                {openBarCode && articles.some(e => !e.random) && <BarCodeModal closeModal={() => setOpenBarCode(false)} articles={articles} />}
                <CSSTransition
                    in={openForm}
                    timeout={300}
                    classNames="modal"
                    unmountOnExit
                >
                    <FormFacture closeModal={() => setOpenForm(false)} setMainInfos={(e) => setMainInfos(e)} mainInfos={mainInfos} setOpenArticles={(e) => setOpenArticles(e)} />
                </CSSTransition>
                <CSSTransition
                    in={openArticles}
                    timeout={300}
                    classNames="modal"
                    unmountOnExit
                >
                    <ArticleModal closeModal={() => setOpenArticles(false)} setArticles={(e) => { setArticles(e); isMobile && setOpenBarCode(!openBarCode) }} articles={articles} isMobile={isMobile} handleRandom={(nbrRandomArticles, articles) => { handleAddRandomArticles(nbrRandomArticles, articles, true) }} />
                </CSSTransition>
                {format ? <HeaderFacture firstProfile={mainInfos.currentProfile} /> : <HeaderTicket firstProfile={mainInfos.currentProfile} setHeure={(heure) => setHeure(heure)} heure={heure} />}
                {format ? <Bill articles={articles} /> : <BillTicket articles={articles} setArticles={(e) => { setArticles(e) }} />}
                {format ? <BilanFacture totaux={totaux} tvaArray={tvaArray} /> : <BilanTicket cardNumber={mainInfos.currentProfile.cardNumber} totaux={totaux} tvaArray={tvaArray} />}
                {format ? <FooterFacture /> : <FooterTicket mainInfos={mainInfos} heure={heure} />}
            </div>
        </div>
    )
}

export default HomePage