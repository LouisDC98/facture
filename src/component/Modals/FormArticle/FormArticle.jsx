import React from 'react'
import './FormArticle.css'
import '../modals.css'
import { useForm } from "react-hook-form";


function FormArticle(props) {
    let { closeModal } = props

    const { register, handleSubmit } = useForm();

    const onSubmit = data => {
        data.total = ((data.prixUnit * data.qtyCmd) - data.prixRemise).toFixed(2);
        if (data.prixRemise === "") {
            data.prixRemise = 0;
        }
        closeModal(data)
    }

    return (
        <div className='displayModal'>
            <div className='modalBg modalBgArticle'>
                <button onClick={() => closeModal()} className='buttonIcon closeButton' />
                <form className='gridModalArticle' onSubmit={handleSubmit(onSubmit)}>
                    <input type='text' className='code' placeholder='Code EAN 13' {...register("code", { required: true })}></input>
                    <input type='text' className='libelle' placeholder='Libellé'{...register("libelle", { required: true })}></input>
                    <input type='number' className='qtyCmd' placeholder='Qté Cdée'{...register("qtyCmd", { required: true })}></input>
                    <datalist id='tva'>
                        <option value="20">20</option>
                        <option value="5.5">5.5</option>
                        <option value="10">10</option>
                    </datalist>
                    <input list="tva" type='number' step=".5" className='tva' placeholder='TVA %'{...register("tva", { required: true })}></input>
                    <input type='number' step=".01" className='prixUnit' placeholder='Prix Unit. TTC'{...register("prixUnit", { required: true })}></input>
                    <input type='number' step=".01" className='prixRemise' placeholder='Montant remise TTC'{...register("prixRemise")}></input>
                    <button type='submit' className='buttonIcon saveButton' />
                </form>
            </div>
        </div>
    )
}

export default FormArticle