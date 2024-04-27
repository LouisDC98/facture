import React from 'react'
import './FormArticle.css'
import { useForm } from "react-hook-form";


function FormArticle(props) {
    let { closeModal } = props

    const { register, handleSubmit } = useForm();

    const onSubmit = data => {
        data.total = ((data.prixUnit * data.qtyCmd) - data.prixRemise).toFixed(2);
        if (data.prixRemise === "") {
            data.prixRemise = 0;
        }
        console.log('articleData', data)
        closeModal(data)
    }

    return (
        <div className='displayModal'>
            <div className='modalBgArticle'>
                <button onClick={() => { closeModal() }} className='closeButton' />

                <form className='gridModalArticle' onSubmit={handleSubmit(onSubmit)}>
                    <input type='text' className='inputArticle code' placeholder='Code EAN 13' {...register("code", { required: true })}></input>
                    <input type='text' className='inputArticle libelle' placeholder='Libellé'{...register("libelle", { required: true })}></input>
                    <input type='number' step=".01" className='inputArticle qtyCmd' placeholder='Qté Cdée'{...register("qtyCmd", { required: true })}></input>
                    <input type='number' step=".01" className='inputArticle tva' placeholder='TVA %'{...register("tva", { required: true })}></input>
                    <input type='number' step=".01" className='inputArticle prixUnit' placeholder='Prix Unit. TTC'{...register("prixUnit", { required: true })}></input>
                    <input type='number' step=".01" className='inputArticle prixRemise' placeholder='Montant remise TTC'{...register("prixRemise")}></input>
                    <button type='submit' className='saveButton' />
                </form>

            </div>
        </div>
    )
}

export default FormArticle