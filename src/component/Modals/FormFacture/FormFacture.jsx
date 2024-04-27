import React from 'react'
import './FormFacture.css'
import data from "../../../data.json"
import { useForm } from "react-hook-form";


function FormFacture(props) {
    let { closeModal } = props

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
        data.adresse = data.adresse.toUpperCase()
        data.city = data.city.toUpperCase()
        data.country = data.country.toUpperCase()
        data.codePostal = insertSpaceAfterTwoChars(data.codePostal.trim())
        data.date = formatDate(data.date)
        data.dateFacturation = formatDate(data.dateFacturation)
        data.dateLivraison = formatDate(data.dateLivraison)
        console.log('data', data)
        closeModal(data)
    }

    return (
        <div className='displayModal'>
            <div className='modalBg modalBgFacture'>
                <button onClick={() => closeModal()} className='closeButton' />

                <form className='gridModal' onSubmit={handleSubmit(onSubmit)}>
                    <input type='text' placeholder='N° de commande' {...register("commandNumber", { required: true })}></input>
                    <input type='text' placeholder='N° de facture'{...register("factureNumber", { required: true })}></input>
                    <div className='inputDisplay'>
                        <label className='label'>Date de commande</label>
                        <input type='date' {...register("date", { required: true })}></input>
                    </div>
                    <div className='divSelect'>
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
                    <div></div>
                    <div className='inputDisplay marginTop'>
                        <label className='label'>Date de facturation</label>
                        <input type='date' {...register("dateFacturation", { required: true })}></input>
                    </div>
                    <div className='inputDisplay marginTop'>
                        <label className='label'>Date de livraison</label>
                        <input type='date' {...register("dateLivraison", { required: true })}></input>
                    </div>
                    <button type='submit' className='saveButton' />
                </form>

            </div>
        </div>
    )
}

export default FormFacture