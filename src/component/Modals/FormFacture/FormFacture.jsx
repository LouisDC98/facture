import React, { useState, useEffect } from 'react'
import './FormFacture.css'
import data from "../../../data.json"
import { useForm } from "react-hook-form";
import magasinList from "../../../magasins.json"

import { randomFactureNbr, randomCommandNbr, autoDate, formatDateRevert } from "../../../callBack.js"

function FormFacture(props) {
    let { closeModal, mainInfos } = props
    let [magasin, setMagasin] = useState(0)

    const { register, handleSubmit, setValue, reset } = useForm();

    const insertSpaceAfterTwoChars = (str) => {
        let firstTwoChars = str.substring(0, 2);
        let remainingChars = str.substring(2);
        let result = firstTwoChars + ' ' + remainingChars;
        return result;
    }

    const handleSelect = (e) => {
        if (e === "null") {
            reset({
                lastName: "",
                firstName: "",
                adresse: "",
                codePostal: "",
                city: "",
                country: "",
                clientID: ""
            });
        } else {
            setValue('lastName', data[e].lastName, { shouldValidate: true })
            setValue('firstName', data[e].firstName, { shouldValidate: true })
            setValue('adresse', data[e].adresse.rue, { shouldValidate: true })
            setValue('codePostal', data[e].adresse.code_postal, { shouldValidate: true })
            setValue('city', data[e].adresse.ville, { shouldValidate: true })
            setValue('country', data[e].adresse.pays, { shouldValidate: true })
            setValue('clientID', data[e].idClient, { shouldValidate: true })
            setValue('cardNumber', data[e].cardNumber, { shouldValidate: true })
            localStorage.setItem("data", e);
        }
    }

    useEffect(() => {
        let localData = data[localStorage.getItem("data")]
        if (localData) {
            setValue('lastName', localData.lastName, { shouldValidate: true })
            setValue('firstName', localData.firstName, { shouldValidate: true })
            setValue('adresse', localData.adresse.rue, { shouldValidate: true })
            setValue('codePostal', localData.adresse.code_postal, { shouldValidate: true })
            setValue('city', localData.adresse.ville, { shouldValidate: true })
            setValue('country', localData.adresse.pays, { shouldValidate: true })
            setValue('clientID', localData.idClient, { shouldValidate: true })
            setValue('cardNumber', localData.cardNumber, { shouldValidate: true })
        }

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
        data.magasin = magasinList[magasin]
        data.adresse = data.adresse.toUpperCase()
        data.city = data.city.toUpperCase()
        data.country = data.country.toUpperCase()
        data.codePostal = insertSpaceAfterTwoChars(data.codePostal.trim())
        data.date = formatDate(data.date)
        data.dateFacturation = formatDate(data.dateFacturation)
        closeModal(data)
    }

    return (
        <div className='displayModal'>
            <div className='modalBg modalBgFacture'>
                <button onClick={() => closeModal()} className='buttonIcon closeButton' />

                <form className='gridModal' onSubmit={handleSubmit(onSubmit)}>
                    <div className='divSelect'>
                        <select onChange={(e) => { setMagasin(e.target.value) }}>
                            <option value={0}>Purpan</option>
                            <option value={1}>Portet</option>
                            <option value={2}>Melun</option>
                            <option value={3}>Marseille</option>
                        </select>
                    </div>
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
                    <div className='displayInput'>
                        <label>Date de facturation/livraison</label>
                        <input type='date' {...register("dateFacturation", { required: true })}></input>
                    </div>
                    <div className='divSelect marginTopSelect'>
                        <select defaultValue={localStorage.getItem("data") || "null"} onChange={(e) => { handleSelect(e.target.value) }}>
                            <option value={"null"}>Données personnelles</option>
                            {data.map((option, index) => (
                                <option key={index} value={index}>
                                    {option.firstName}
                                </option>
                            ))}
                        </select>
                    </div>

                    <div className='displayInput'>
                        <label>Nom</label>
                        <input type='text' {...register("lastName", { required: true })}></input>
                    </div>
                    <div className='displayInput'>
                        <label>Prénom</label>
                        <input type='text' {...register("firstName", { required: true })}></input>
                    </div>
                    <div className='displayInput'>
                        <label>Adresse</label>
                        <input type='text' {...register("adresse", { required: true })}></input>
                    </div>
                    <div className='displayInput'>
                        <label>Code postal</label>
                        <input type='text' {...register("codePostal", { required: true })}></input>
                    </div>
                    <div className='displayInput'>
                        <label>Ville</label>
                        <input type='text' {...register("city", { required: true })}></input>
                    </div>
                    <div className='displayInput'>
                        <label>Pays</label>
                        <input type='text' {...register("country", { required: true })}></input>
                    </div>
                    <div className='displayInput'>
                        <label>Identifiant client</label>
                        <input type='text' {...register("clientID", { required: true })}></input>
                    </div>
                    <button type='submit' className='buttonIcon saveButton' />
                </form>

            </div>
        </div>
    )
}

export default FormFacture