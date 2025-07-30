import { useEffect, useState } from 'react'
import './DashboardFacture.css'

import { getAllRandoms } from '../../services/randomsServices.js';
import { getAllEssentials } from '../../services/essentialsServices.js';
import { getAllProfiles } from '../../services/profileServices.js';
import { getAllStores } from '../../services/storeServices.js';
import { getByCode } from '../../services/picturesServices.js';

import Loader from '../Loader/Loader.jsx'

import HeaderFacture from '../HeaderFacture/HeaderFacture.jsx';
import Bill from '../BillFacture/BillFacture.jsx';
import BilanFacture from '../BilanFacture/BilanFacture.jsx';
import FooterFacture from '../FooterFacture/FooterFacture.jsx';

import html2canvas from 'html2canvas';
import { saveAs } from 'file-saver';
import JSZip from 'jszip';
import SelectProfile from '../SelectProfile/SelectProfile.jsx';
import SelectEssentials from '../SelectEssentials/SelectEssentials.jsx';
import SelectRandoms from '../SelectRandoms/SelectRandoms.jsx';

function DashboardFacture() {
    const [loading, setLoading] = useState(false)
    const [essentialsArticles, setEssentialsArticles] = useState(undefined)
    const [randomArticles, setRandomArticles] = useState(undefined)
    const [profileList, setProfileList] = useState(undefined)
    const [storeList, setStoreList] = useState(undefined)

    const [choosenEssentialsArticles, setChoosenEssentialsArticles] = useState([])
    const [choosenRandomArticles, setChoosenRandomArticles] = useState([])
    const [allChoosenArticles, setAllChoosenArticles] = useState([])
    const [totaux, setTotaux] = useState({ totalRemises: 0, totalPanier: 0, totalNbrArticle: 0 })
    const [preview, setPreview] = useState(false)
    const [profile, setProfile] = useState([]);
    const [tvaArray, setTvaArray] = useState([])
    const [currentProfile, setCurrentProfile] = useState(undefined)

    useEffect(() => {
        setLoading(true)
        getEssentialList()
        getRandomList()
        getProfileList()
        getStoreList()
        setLoading(false)
    }, []);

    const getRandomList = async () => {
        const response = await getAllRandoms()
        setRandomArticles(response)
    }

    const getEssentialList = async () => {
        const response = await getAllEssentials()
        setEssentialsArticles(response)
    }

    const getProfileList = async () => {
        const response = await getAllProfiles()
        setProfileList(response)
    }

    const getStoreList = async () => {
        const response = await getAllStores()
        setStoreList(response)
    }

    const getPicturesByCode = async (code) => {
        try {
            const response = await getByCode(code, false);
            if (response.length === 0) {
                console.warn(`Aucune image trouvée pour le code ${code}`);
                return null;
            }
            return response;
        } catch (error) {
            console.error('Une erreur est survenue', error);
            return null;
        }
    };

    useEffect(() => {
        setAllChoosenArticles([...choosenEssentialsArticles, ...choosenRandomArticles]);
    }, [choosenEssentialsArticles, choosenRandomArticles]);

    useEffect(() => {
        for (const element of allChoosenArticles) {
            element.total = element.prixUnit * element.qtyCmd
        }
        if (allChoosenArticles.length > 0) {
            let calcs = {
                totalRemises: parseFloat(allChoosenArticles.filter(element => element.prixRemise !== "").reduce((total, element) => total + parseFloat(element.prixRemise), 0)).toFixed(2),
                totalPanier: allChoosenArticles.reduce((total, element) => total + element.total, 0 + 0.70),
                totalNbrArticle: parseFloat(allChoosenArticles.reduce((totals, element) => totals + parseFloat(element.qtyCmd), 0))
            }
            setTotaux(calcs)
        }
        calcTVA()
    }, [allChoosenArticles]);

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

        let tempArticles = [...allChoosenArticles, { total: "0.70", tva: "0" }]

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

    const handleExportPNG = async (arg) => {
        setPreview(true)
        await new Promise(resolve => setTimeout(resolve, 100))
        const element = document.getElementById('a4Page');

        const scale = 2;
        const options = { scale, useCORS: true };
        let validImages;

        for (let i = 0; i < profile?.length; i++) {
            const zip = new JSZip();
            if (arg) {
                const images = await Promise.all(
                    choosenEssentialsArticles.map(article => getPicturesByCode(article.code))
                );
                validImages = images.filter(Boolean);
            }
            if (i > 0) {
                const length = choosenRandomArticles.length;
                const shuffled = [...randomArticles].sort(() => 0.5 - Math.random());
                setChoosenRandomArticles(shuffled.slice(0, length))
            }

            setCurrentProfile(profile[i]);
            await new Promise(resolve => setTimeout(resolve, 100));

            const canvas = await html2canvas(element, options);
            const blob = await new Promise(resolve => canvas.toBlob(resolve, 'image/png', 1));
            const factureName = `facture_${profile[i].commandNumber}.png`;

            zip.file(factureName, blob);
            if (arg) {
                for (const image of validImages) {
                    const byteArray = new Uint8Array(image.data.data);
                    zip.file(image.name, byteArray);
                }
            }
            const zipBlob = await zip.generateAsync({ type: 'blob' });
            saveAs(zipBlob, 'export_factures_et_images.zip');
        }

        setPreview(false)
    };

    const handleShuffleArticles = () => {
        setAllChoosenArticles(prev => {
            const shuffled = [...prev].sort(() => 0.5 - Math.random());
            return shuffled;
        });
    }

    return (
        <div className='dashboardFacture'>
            {loading && <Loader />}
            <div className='tip'>
                <SelectProfile profileList={profileList} storeList={storeList} setProfile={(e) => setProfile(e)} />
            </div>

            <div className='tip bigTip'>
                <p className='subtitle'>Articles essentiels :</p>
                <SelectEssentials essentialsArticles={essentialsArticles} choosenEssentialsArticles={choosenEssentialsArticles} setChoosenEssentialsArticles={(e) => setChoosenEssentialsArticles(e)} />
            </div>

            <div className='tip bigTip'>
                <p className='subtitle'>Articles random :</p>
                <SelectRandoms randomArticles={randomArticles} choosenRandomArticles={choosenRandomArticles} setChoosenRandomArticles={(e) => setChoosenRandomArticles(e)} />
            </div>

            <div className='tip'>
                <div className='displayBtnPreview'>
                    <button onClick={() => setPreview(!preview)} className='secondaryBtn btn2'>Apercu</button>
                    <button onClick={() => handleShuffleArticles()} className='secondaryBtn btn2'>Mélanger</button>
                    <button onClick={() => handleExportPNG(true)} className='primaryBtn btn2'>Exporter</button>
                    <button onClick={() => handleExportPNG(false)} className='primaryBtn btn2'>Exporter sans photo</button>
                </div>
            </div>
            {preview && (
                <div className="overlay">
                    <div className="a4Format" id="a4Page">
                        <HeaderFacture firstProfile={currentProfile} />
                        <Bill articles={allChoosenArticles} />
                        <BilanFacture totaux={totaux} tvaArray={tvaArray} />
                        <FooterFacture />
                    </div>
                    <button onClick={() => setPreview(!preview)} className='closePreviewButton'></button>
                </div>
            )}
        </div>
    )
}

export default DashboardFacture