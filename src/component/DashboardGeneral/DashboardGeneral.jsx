import { useEffect, useState } from 'react'
import './DashboardGeneral.css'

import toast, { Toaster } from 'react-hot-toast';
import { getAllRandoms, insertRandom } from '../../services/randomsServices.js';
import { getAllEssentials, insertEssential } from '../../services/essentialsServices.js';
import { getAllProfiles, insertProfile } from '../../services/profileServices.js';
import { getAllStores, insertStore } from '../../services/storeServices.js';

import ManageArticle from '../Modals/ManageArticle/ManageArticle'
import ManageProfile from '../Modals/ManageProfile/ManageProfile.jsx';
import ManageStore from '../Modals/ManageStore/ManageStore.jsx';
import Loader from '../Loader/Loader.jsx'

function DashboardGeneral() {
    const [type, setType] = useState(false)
    const [openNewArticle, setOpenNewArticle] = useState(false)
    const [openNewProfile, setOpenNewProfile] = useState(false)
    const [openNewStore, setOpenNewStore] = useState(false)
    const [loading, setLoading] = useState(false)
    const [essentialsArticles, setEssentialsArticles] = useState(undefined)
    const [randomArticles, setRandomArticles] = useState(undefined)
    const [profileList, setProfileList] = useState(undefined)
    const [storeList, setStoreList] = useState(undefined)

    useEffect(() => {
        setLoading(true)
        getEssentialList()
        getRandomList()
        getProfileList()
        getStoreList()
        setLoading(false)
    }, [type]);

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

    const createRandom = async (newArticle) => {
        setLoading(true)
        try {
            await insertRandom(newArticle)
            setOpenNewArticle(false)
            toast.success('Création réussie')
        } catch {
            toast.error('Une erreur est survenue')
        }
        setLoading(false)
    }

    const createEssential = async (newArticle) => {
        setLoading(true)
        try {
            await insertEssential(newArticle)
            getEssentialList()
            setOpenNewArticle(false)
            toast.success('Création réussie')
        } catch {
            toast.error('Une erreur est survenue')
        }
        setLoading(false)
    }

    const createProfile = async (newArticle) => {
        setLoading(true)
        try {
            await insertProfile(newArticle)
            getProfileList()
            setOpenNewProfile(false)
            toast.success('Création réussie')
        } catch {
            toast.error('Une erreur est survenue')
        }
        setLoading(false)
    }

    const createStore = async (newItem) => {
        setLoading(true)
        try {
            await insertStore(newItem)
            getStoreList()
            setOpenNewStore(false)
            toast.success('Création réussie')
        } catch {
            toast.error('Une erreur est survenue')
        }
        setLoading(false)
    }

    return (
        <div className='dashboardGeneral'>
            <Toaster />
            {loading && <Loader />}
            {openNewArticle && <ManageArticle closeModal={() => { setOpenNewArticle(false) }} selectedItem={undefined} action={(newArticle) => type === 'random' ? createRandom(newArticle) : createEssential(newArticle)} isRandom={type === "random"} essentials={essentialsArticles} />}
            {openNewProfile && <ManageProfile closeModal={() => { setOpenNewProfile(false) }} selectedItem={undefined} action={(newItem) => createProfile(newItem)} storeList={storeList} />}
            {openNewStore && <ManageStore closeModal={() => { setOpenNewStore(false) }} selectedItem={undefined} action={(newItem) => createStore(newItem)} />}

            <div className='wrapper'>
                <div className='tip'>
                    <p className='subtitle'>Nombre d'article random : </p>
                    <div className='nbrItem'>{randomArticles?.length}</div>
                    <button onClick={() => { setType('random'); setOpenNewArticle(true) }} className='addBtn'>+</button>
                </div>
                <div className='tip'>
                    <p className='subtitle'>Nombre d'article essentiels : </p>
                    <div className='nbrItem'>{essentialsArticles?.length}</div>
                    <button onClick={() => { setType('essential'); setOpenNewArticle(true) }} className='addBtn'>+</button>
                </div>

                <div className='tip'>
                    <p className='subtitle'>Nombre de profil : </p>
                    <div className='nbrItem'>{profileList?.length}</div>
                    <button onClick={() => { setType('profile'); setOpenNewProfile(true) }} className='addBtn'>+</button>
                </div>

                <div className='tip'>
                    <p className='subtitle'>Nombre de magasin : </p>
                    <div className='nbrItem'>{storeList?.length}</div>
                    <button onClick={() => { setType('store'); setOpenNewStore(true) }} className='addBtn'>+</button>
                </div>
            </div>
        </div>
    )
}

export default DashboardGeneral