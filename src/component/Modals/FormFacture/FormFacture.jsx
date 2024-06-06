import React, { useEffect, useState } from 'react'
import './FormFacture.css'
import users from "../../../data.json"
import { useForm, useFieldArray } from "react-hook-form";
import magasinList from "../../../magasins.json"

import { randomFactureNbr, randomCommandNbr, autoDate, formatDateRevert } from "../../../callBack.js"

function FormFacture(props) {
    let { closeModal, mainInfos } = props

    const { register, handleSubmit, setValue, control } = useForm();
    const { fields, append, remove } = useFieldArray({
        control,
        name: "test",
    });

    useEffect(() => {
        if (mainInfos.date) {
            setValue('date', formatDateRevert(mainInfos?.date), { shouldValidate: true })
        }
        if (mainInfos.date) {
            setValue('dateFacturation', formatDateRevert(mainInfos?.dateFacturation), { shouldValidate: true })
        }

        let factureNbr = randomFactureNbr()
        let cmdNbr = randomCommandNbr()
        setValue('commandNumber', cmdNbr, { shouldValidate: true });
        setValue('factureNumber', factureNbr, { shouldValidate: true });
    }, []);

    const onChangeDate = (e) => {
        if (!e) return
        let { day, month, year } = autoDate(e)
        let facturationDate = year + '-' + month + '-' + day
        setValue('dateFacturation', facturationDate, { shouldValidate: true });
    }

    const handleRandomFactureNbr = () => {
        let number = randomFactureNbr()
        setValue('factureNumber', number, { shouldValidate: true });
    }

    const handleRandomCommandeNbr = () => {
        let number = randomCommandNbr()
        setValue('commandNumber', number, { shouldValidate: true });
    }

    function formatDate(inputDate) {
        let parts = inputDate.split('-');
        let year = parseInt(parts[0]);
        let month = parseInt(parts[1]);
        let day = parseInt(parts[2]);

        let dateObject = new Date(year, month - 1, day);
        let formattedDate = ('0' + dateObject.getDate()).slice(-2) + '/' + ('0' + (dateObject.getMonth() + 1)).slice(-2) + '/' + dateObject.getFullYear();

        return formattedDate;
    }

    const onSubmit = data => {
        const formattedData = data.test.map((item) => {
            const selectedData = users[item.value];
            const selectedMagasin = magasinList.find(magasin => magasin.id === parseInt(item.magasin, 10));
            return {
                lastName: selectedData.lastName,
                adresse: selectedData.adresse,
                cardNumber: selectedData.cardNumber,
                city: selectedData.city,
                clientID: selectedData.clientID,
                codePostal: selectedData.codePostal,
                country: selectedData.country,
                firstName: selectedData.firstName,
                magasin: selectedMagasin,
            };
        });
        delete data.test
        data.date = formatDate(data.date)
        data.dateFacturation = formatDate(data.dateFacturation)
        let finalData = { data, profile: [...formattedData] }
        console.log('finalData', finalData)
        closeModal(finalData)
    }

    return (
        <div className='displayModal'>
            <div className='modalBg modalBgFacture'>
                <button onClick={() => closeModal()} className='buttonIcon closeButton' />

                <form className='gridModal' onSubmit={handleSubmit(onSubmit)}>
                    <div className='displayInput'>
                        <label>N° de commande</label>
                        <input type='text' {...register("commandNumber", { required: true })}></input>
                        <button className='randomButton' onClick={() => handleRandomCommandeNbr()}></button>
                    </div>
                    <div className='displayInput'>
                        <label>N° de facture</label>
                        <input type='text' {...register("factureNumber", { required: true })}></input>
                        <button className='randomButton' onClick={() => handleRandomFactureNbr()}></button>
                    </div>
                    <div className='displayInput'>
                        <label>Date de commande</label>
                        <input type='date' onSelect={(e) => onChangeDate(e.target.value)} {...register("date", { required: true })}></input>
                    </div>
                    <div className='displayInput marginBottom'>
                        <label>Date de facturation/livraison</label>
                        <input type='date' {...register("dateFacturation", { required: true })}></input>
                    </div>

                    {fields.map((field, index) => (
                        <div key={field.id} className='divField'>
                            <div className='divSelect'>
                                <select {...register(`test.${index}.value`)}>
                                    <option value="null" hidden>Utilisateur</option>
                                    {users.map((option, optIndex) => (
                                        <option key={optIndex} value={optIndex}>
                                            {option.firstName}
                                        </option>
                                    ))}
                                </select>
                            </div>
                            <div className='divSelect'>
                                <select {...register(`test.${index}.magasin`)}>
                                    <option value="null" hidden>Magasin</option>
                                    {magasinList.map((magasin) => (
                                        <option key={magasin.id} value={magasin.id}>
                                            {magasin.name}
                                        </option>
                                    ))}
                                </select>
                            </div>
                            <button type='button' className='removeUserBtn' onClick={() => remove(index)}></button>
                        </div>
                    ))}
                    <button type='button' className='addFieldBtn' onClick={() => append({ value: 'null', magasin: 0 })}></button>
                    <button type='submit' className='buttonIcon saveButton' />
                </form>

            </div>
        </div>
    )
}

export default FormFacture