import { useEffect, useState } from 'react'
import './ManagePicture.css'
import '../modals.css'

import { getByCode, removePicture } from '../../../services/picturesServices.js';

import { useForm } from "react-hook-form";
import Loader from '../../Loader/Loader.jsx';
import bin from '../../../assets/bin.svg';

function ManagePicture(props) {
    const { action, essentials, pictureList } = props
    const [loading, setLoading] = useState(false)
    const [selectedArticle, setSelectedArticle] = useState(undefined)
    const [images, setImages] = useState(undefined)
    const [localPictureList, setLocalPictureList] = useState(pictureList)

    const { register, handleSubmit, setValue } = useForm();

    useEffect(() => {
        if (pictureList) {
            setLocalPictureList(pictureList);
        }
    }, [pictureList]);

    const onSubmit = async (data) => {
        data.file = data.file[0]
        await action(data)
        await getPicturesByCode(data.code)
        setLocalPictureList(prev => [...prev, { code: data.code }])
        setValue('code', selectedArticle)
    };

    const handleDelete = async (id) => {
        await removePicture(id)
        const response = await getByCode(selectedArticle)
        setImages(response)
        setLocalPictureList(prev => prev.filter(pic => pic.id !== id))
    }

    const getPicturesByCode = async (code) => {
        setLoading(true)
        try {
            setSelectedArticle(code)
            const response = await getByCode(code)
            setImages(response)
        } catch {
            console.error('Une erreur est survenue')
        }
        setLoading(false)
    }

    const commonItems = essentials?.filter(item =>
        localPictureList?.some(picture => picture.code === item.code)
    );

    const otherItems = essentials?.filter(item =>
        !localPictureList?.some(picture => picture.code === item.code)
    );

    return (
        <div className='managePicture'>
            {loading && <Loader />}
            <form onSubmit={handleSubmit(onSubmit)} className='form gridDisposal'>
                <div className='input fileCol'>
                    <div className='titleInput'>Image</div>
                    <input className='field fileField' type='file' accept="image/*" {...register(`file`, { required: true })}></input>
                </div>

                <div className='input articleCol'>
                    <div className='titleInput'>Article lié</div>
                    <select className='field select' {...register(`code`, { required: true })} onChange={(e) => { getPicturesByCode(e.target.value) }}>
                        <option value="">-- Sélectionnez un article --</option>
                        {commonItems?.length > 0 && (
                            <optgroup label="Contient déjà des photos">
                                {commonItems.map((item) => (
                                    <option key={item.code} value={item.code}>
                                        {item.libelle}
                                    </option>
                                ))}
                            </optgroup>
                        )}
                        {otherItems?.length > 0 && (
                            <optgroup label="Autres éléments">
                                {otherItems.map((item) => (
                                    <option key={item.code} value={item.code}>
                                        {item.libelle}
                                    </option>
                                ))}
                            </optgroup>
                        )}
                    </select>
                </div>

                <div className='input eanCol'>
                    <div className='titleInput'>EAN</div>
                    <div className='field fakeField' type='text' disabled>{selectedArticle}</div>
                </div>
                <button type='submit' className='secondaryBtn submitBtn btnCol'>Ajouter l'image</button>
            </form>

            <div className='wrapper'>
                {images?.map((item) => (
                    <div key={item.id} className='container'>
                        <img alt='imgae_list' src={`data:image/jpeg;base64,${item._data}`} className='articleImage' onClick={() => { handleDelete(item.id) }} />
                        <img alt='delete_icon' src={bin} className='deleteImage' />
                    </div>
                ))}
                <div className='warning'>Toute suppression est définitive (aucune confirmation ne sera demandée)</div>
            </div>
        </div>
    )
}

export default ManagePicture