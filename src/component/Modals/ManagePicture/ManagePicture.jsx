import { useState } from 'react'
import './ManagePicture.css'
import '../modals.css'

import { getByCode, removePicture } from '../../../services/picturesServices.js';

import { useForm } from "react-hook-form";
import Loader from '../../Loader/Loader.jsx';
import bin from '../../../assets/bin.svg';

function ManagePicture(props) {
    const { closeModal, action, essentials, isDelete, pictureList } = props
    const [loading, setLoading] = useState(false)
    const [selectedArticle, setSelectedArticle] = useState(undefined)
    const [images, setImages] = useState(undefined)

    const { register, handleSubmit } = useForm();

    const onSubmit = (data) => {
        data.file = data.file[0]
        action(data)
    };

    const handleDelete = async (id) => {
        await removePicture(id)
        const response = await getByCode(selectedArticle)
        setImages(response)
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

    return (
        <div className='displayModal managePicture'>
            {loading && <Loader />}
            <div className='modalBg'>
                <div className='moddalHeader'>
                    <h3 className='titleModal'>{isDelete ? "Supprimer une image" : "Ajouter une image"}</h3>
                    <button onClick={() => closeModal()} className='closeButtonNew' />
                </div>
                <span className='spanRow'></span>
                <form onSubmit={handleSubmit(onSubmit)} className='form gridDisposal'>
                    {!isDelete && <div className='input fileCol'>
                        <div className='titleInput'>Image</div>
                        <input className='field fileField' type='file' accept="image/*" {...register(`file`, { required: true })}></input>
                    </div>}

                    <div className='input articleCol'>
                        <div className='titleInput'>Article lié</div>
                        <select className='field select' {...register(`code`, { required: true })} onChange={(e) => { getPicturesByCode(e.target.value); setSelectedArticle(e.target.value) }}>
                            <option value="">-- Sélectionnez un article --</option>
                            {(
                                isDelete
                                    ? essentials?.filter(item =>
                                        pictureList.some(picture => picture.code === item.code)
                                    )
                                    : essentials
                            )?.map((item) => (
                                <option key={item.code} value={item.code}>
                                    {item.libelle}
                                </option>
                            ))}
                        </select>
                    </div>

                    <div className='input eanCol'>
                        <div className='titleInput'>EAN</div>
                        <div className='field fakeField' type='text' disabled>{selectedArticle}</div>
                    </div>
                    {!isDelete && <button type='submit' className='secondaryBtn submitBtn btnCol'>Ajouter l'image</button>}
                </form>
                {isDelete &&
                    <div className='wrapper'>
                        {images?.map((item) => (
                            <div key={item.id} className='container'>
                                <img alt='tutu' src={`data:image/jpeg;base64,${item._data}`} className='articleImage' onClick={() => { handleDelete(item.id) }} />
                                <img alt='delete_icon' src={bin} className='deleteImage' />
                            </div>
                        ))}
                        <div className='warning'>Toute suppression est définitive (aucune confirmation ne sera demandée)</div>
                    </div>
                }
            </div>
        </div>
    )
}

export default ManagePicture