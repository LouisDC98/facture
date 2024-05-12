import React, { useState } from 'react'
import './FormArticle.css'
import '../modals.css'
import { useForm } from "react-hook-form";


function FormArticle(props) {
    let { closeModal, currentArticle } = props
    let [major, setMajor] = useState(false)

    const { register, handleSubmit } = useForm({ defaultValues: currentArticle });

    const onSubmit = data => {
        if (major) {
            data.prixUnit *= 1.2;
            data.prixUnit = Math.floor(data.prixUnit / 0.05) * 0.05;
            data.prixUnit = parseFloat(data.prixUnit.toFixed(2));
            setMajor(false);
        }

        if (isNaN(data.prixRemise)) {
            data.prixRemise = 0;
        }
        data.total = parseFloat((data.prixUnit * data.qtyCmd - data.prixRemise).toFixed(2));
        closeModal(data)
    }

    return (
        <div className='displayModal'>
            <div className='modalBg modalBgArticle'>
                <button onClick={() => closeModal()} className='buttonIcon closeButton' />
                <form className='gridModalArticle' onSubmit={handleSubmit(onSubmit)}>
                    <div className='displayInput code'>
                        <label>Code EAN 13</label>
                        <input type='text' {...register("code", { required: true })}></input>
                    </div>
                    <div className='displayInput libelle'>
                        <label>Libellé</label>
                        <input type='text' {...register("libelle", { required: true })}></input>
                    </div>
                    <div className='displayInput qtyCmd'>
                        <label>Qté Cdée</label>
                        <input type='number' {...register("qtyCmd", { required: true, valueAsNumber: true })}></input>
                    </div>
                    <div className='displayInput tva'>
                        <label>TVA %</label>
                        <input list="tva" type='number' step=".5" {...register("tva", { required: true, valueAsNumber: true })}></input>
                    </div>
                    <datalist id='tva'>
                        <option value="20">20</option>
                        <option value="10">10</option>
                        <option value="5.5">5.5</option>
                        <option value="0">0</option>
                    </datalist>
                    <div className='displayInput prixUnit'>
                        <label>Prix Unit. TTC</label>
                        <input type='number' step=".01" {...register("prixUnit", { required: true, valueAsNumber: true })}></input>
                    </div>
                    <div className='displayInput prixRemise'>
                        <label>Montant remise TTC</label>
                        <input type='number' step=".01" {...register("prixRemise", { valueAsNumber: true })}></input>
                    </div>
                    <div className='checkBoxMajor'>
                        <label htmlFor="checkMajor">majoration 20% ?</label>
                        <input type='checkbox' id="checkMajor" onClick={() => setMajor(!major)}></input>
                    </div>
                    <button type='submit' className='buttonIcon saveButton' />
                </form>
            </div>
        </div>
    )
}

export default FormArticle