import React, { useState } from 'react'
import './FormFacture.css'
import data from "../../../data.json"
import { useForm } from "react-hook-form";


function FormFacture(props) {
    let { closeModal } = props
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
        }
    }

    const magasinList = [{primary: "CARREFOUR TOULOUSE PURPAN 36 RTE DE BAYONNE", secondary: "PURPAN 31000 TOULOUSE"}, {primary: "CARREFOUR PORTET SUR GARONNE BOULEVARD DE L'EUROPE", secondary: "31126 PORTET SUR GARONNE CEDEX"}]

    const handleRandomCommand = () => {
        const randomNumber = "5" + Math.floor(Math.random() * 1000000000000).toString().padStart(12, "0");
        setValue('commandNumber', randomNumber, { shouldValidate: true });
    }

    const handleRandomFacture = () => {
        const randomDigits = Math.floor(Math.random() * 1000000).toString().padStart(6, "0");
        const factureNumber = "WEB-000119-00" + randomDigits;
        setValue('factureNumber', factureNumber, { shouldValidate: true });
    }

    const autoDate = (e) => {
        let dateInitiale = new Date(e);
        dateInitiale.setDate(dateInitiale.getDate() + 1);

        var year = dateInitiale.getFullYear();
        var month = (dateInitiale.getMonth() + 1).toString().padStart(2, '0');
        var day = dateInitiale.getDate().toString().padStart(2, '0');
        let newDate = year + '-' + month + '-' + day;
        setValue('dateFacturation', newDate, { shouldValidate: true });
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
                        </select>
                    </div>
                    <div className='positionRelative'>
                        <input type='text' placeholder='N° de commande' {...register("commandNumber", { required: true })}></input>
                        <button className='randomButton' onClick={() => handleRandomCommand()}></button>
                    </div>
                    <div className='positionRelative'>
                        <input type='text' placeholder='N° de facture'{...register("factureNumber", { required: true })}></input>
                        <button className='randomButton' onClick={() => handleRandomFacture()}></button>
                    </div>
                    <div className='inputDisplay'>
                        <label className='label'>Date de commande</label>
                        <input type='date' onSelect={(e) => autoDate(e.target.value)} {...register("date", { required: true })}></input>
                    </div>
                    <div className='inputDisplay marginTop'>
                        <label className='label'>Date facturation/livraison</label>
                        <input type='date' {...register("dateFacturation", { required: true })}></input>
                    </div>
                    <div className='divSelect marginTopSelect'>
                        <select onChange={(e) => { handleSelect(e.target.value) }}>
                            <option value={"null"}>Données personnelles</option>
                            {data.map((option, index) => (
                                <option key={index} value={index}>
                                    {option.firstName}
                                </option>
                            ))}
                        </select>
                    </div>
                    <input type='text' placeholder='Nom'{...register("lastName", { required: true })}></input>
                    <input type='text' placeholder='Prénom'{...register("firstName", { required: true })}></input>
                    <input type='text' placeholder='Adresse'{...register("adresse", { required: true })}></input>
                    <input type='text' placeholder='Code postal'{...register("codePostal", { required: true })}></input>
                    <input type='text' placeholder='Ville'{...register("city", { required: true })}></input>
                    <input type='text' placeholder='Pays'{...register("country", { required: true })}></input>
                    <input type='text' placeholder='Identifiant client'{...register("clientID", { required: true })}></input>
                    <button type='submit' className='buttonIcon saveButton' />
                </form>

            </div>
        </div>
    )
}

export default FormFacture