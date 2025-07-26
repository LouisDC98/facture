import { useEffect, useState } from 'react'
import './DashboardPicture.css'

import toast, { Toaster } from 'react-hot-toast';
import { getAllEssentials } from '../../services/essentialsServices.js';
import { getAllPicture, insertPicture } from '../../services/picturesServices.js';

import ManagePicture from '../Modals/ManagePicture/ManagePicture.jsx';
import Loader from '../Loader/Loader.jsx'

function DashboardPicture() {
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
            <div className='container'>
                <ManagePicture action={(newItem) => createPicture(newItem)} essentials={essentialsArticles} pictureList={pictureList} />
            </div>

        </div>
    )
}

export default DashboardPicture