import { useEffect, useState } from 'react'
import './DashboardPicture.css'

import toast, { Toaster } from 'react-hot-toast';
import { getAllEssentials } from '../../services/essentialsServices.js';
import { getAllPicture, insertPicture } from '../../services/picturesServices.js';

import ManagePicture from '../Modals/ManagePicture/ManagePicture.jsx';
import Loader from '../Loader/Loader.jsx'

function DashboardPicture() {
    const [openNew, setOpenNew] = useState(false)
    const [openDelete, setOpenDelete] = useState(false)
    const [loading, setLoading] = useState(false)
    const [essentialsArticles, setEssentialsArticles] = useState(undefined)
    const [pictureList, setPictureList] = useState(undefined)

    useEffect(() => {
        const fetchData = async () => {
            setLoading(true)
            await getEssentialList()
            await getPictureList()
            setLoading(false)
        }

        fetchData()
    }, []);

    const getEssentialList = async () => {
        const response = await getAllEssentials()
        setEssentialsArticles(response)
    }

    const getPictureList = async () => {
        const response = await getAllPicture()
        setPictureList(response)
    }

    const createPicture = async (data) => {
        setLoading(true)
        try {
            const formData = new FormData();
            formData.append('image', data.file);
            formData.append('name', data.file.name);
            formData.append('code', data.code);
            await insertPicture(formData)
            getPictureList()
            setOpenNew(false)
            toast.success('Création réussie')
        } catch {
            toast.error('Une erreur est survenue')
        }
        setLoading(false)
    }

    return (
        <div className='dashboardPicture'>
            <Toaster />
            {loading && <Loader />}
            {openNew && <ManagePicture closeModal={() => { setOpenNew(false) }} action={(newItem) => createPicture(newItem)} essentials={essentialsArticles} />}
            {openDelete && <ManagePicture closeModal={() => { setOpenDelete(false) }} action={(newItem) => createPicture(newItem)} essentials={essentialsArticles} isDelete={true} pictureList={pictureList}/>}
            <button onClick={() => setOpenNew(!openNew)} className='primaryBtn'>New image</button>
            <button onClick={() => setOpenDelete(!openDelete)} className='primaryBtn'>Delete image</button>
            <div className='container'>


            </div>
            {/* <div className='wrapper'>
                <div className='tip'>
                    <p className='subtitle'>Nombre de magasin : </p>
                    <div className='nbrItem'>{pictureList?.length}</div>

                </div>
                <div>{toto?.name}</div>
                <img src={`data:image/jpeg;base64,${toto?._data}`} alt="tutu" className='toto' />
            </div> */}
        </div>
    )
}

export default DashboardPicture