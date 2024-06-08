import React, { useEffect } from 'react'
import './FormFacture.css'
import users from "../../../data/users.json"
import { useForm, useFieldArray } from "react-hook-form";
import magasinList from "../../../data/magasins.json"

import { randomFactureNbr, randomCommandNbr, autoDate, formatDate, formatDateRevert } from "../../../callBack.js"

function FormFacture(props) {
    let { closeModal, mainInfos } = props

    const { register, handleSubmit, setValue, control } = useForm();
    const { fields, append, remove } = useFieldArray({
        control,
        name: "profile",
    });


    useEffect(() => {
        if (mainInfos.profile?.length > 0) {

            mainInfos.profile.forEach((element, i) => {
                append({ user: "null", magasin: "null", date: "", dateFacturation: "" });

                setValue(`profile.${i}.user`, users.findIndex(e => e.firstName === element.firstName), { shouldValidate: true });
                setValue(`profile.${i}.magasin`, magasinList.find(e => e.name === element.magasin.name).id, { shouldValidate: true });
                setValue(`profile.${i}.date`, formatDateRevert(element.date), { shouldValidate: true });
                setValue(`profile.${i}.dateFacturation`, formatDateRevert(element.dateFacturation), { shouldValidate: true });
            });
        } else if (fields.length === 0) {
            append({ user: "null", magasin: "null", date: "", dateFacturation: "" });
        }
    }, [mainInfos]);

    const onChangeDate = (e, index) => {
        if (!e) return
        let { day, month, year } = autoDate(e)
        let facturationDate = year + '-' + month + '-' + day
        setValue(`profile.${index}.dateFacturation`, facturationDate, { shouldValidate: true });
    }

    const onSubmit = data => {
        const formattedData = data.profile.map((item) => {
            const selectedData = users[item.user];
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
                date: formatDate(item.date),
                dateFacturation: formatDate(item.dateFacturation),
                factureNumber: randomFactureNbr(),
                commandNumber: randomCommandNbr()
            };
        });

        closeModal({ profile: [...formattedData] })
    }

    return (
        <div className='displayModal'>
            <div className='modalBg modalBgFacture'>
                <h2>Select a champion</h2>
                <button onClick={() => closeModal()} className='buttonIcon closeButton' />

                <form onSubmit={handleSubmit(onSubmit)}>
                    <table className='tableFormFacture'>
                        <thead>
                            <tr className='headerRow'>
                                <th></th>
                                <th>Utilisateur</th>
                                <th>Magasin</th>
                                <th>Commande</th>
                                <th>Facturation</th>
                            </tr>
                        </thead>
                        <tbody>
                            {fields.map((field, index) => (
                                <tr key={field.id} className='divField'>
                                    <td>
                                        <button type='button' className='removeUserBtn' onClick={() => remove(index)} title={"Supprimer la ligne"}></button>
                                    </td>
                                    <td>
                                        <select {...register(`profile.${index}.user`)}>
                                            <option value="null" hidden>Nom</option>
                                            {users.map((option, optIndex) => (
                                                <option key={optIndex} value={optIndex}>
                                                    {option.firstName}
                                                </option>
                                            ))}
                                        </select>
                                    </td>
                                    <td>
                                        <select {...register(`profile.${index}.magasin`)}>
                                            <option value="null" hidden>Magasin</option>
                                            {magasinList.map((magasin) => (
                                                <option key={magasin.id} value={magasin.id}>
                                                    {magasin.name}
                                                </option>
                                            ))}
                                        </select>
                                    </td>
                                    <td>
                                        <input type='date' onSelect={(e) => onChangeDate(e.target.value, index)} {...register(`profile.${index}.date`, { required: true })}></input>
                                    </td>
                                    <td>
                                        <input type='date' {...register(`profile.${index}.dateFacturation`, { required: true })}></input>
                                    </td>
                                </tr>

                            ))}
                            <tr className='divField'>
                                <td>
                                    <button type='button' className='addFieldBtn' onClick={() => append({ user: 'null', magasin: "null", date: "null" })} title={"Ajouter une ligne"}></button>
                                </td>
                                <td colSpan="100%" className='greyCell'>
                                </td>

                            </tr>
                        </tbody>
                        <tfoot>
                            <tr >
                                <td colSpan="100%">
                                </td>
                            </tr>

                        </tfoot>

                    </table>
                </form>
                <button type='submit' className='buttonIcon saveButton' />

            </div>
        </div>
    )
}

export default FormFacture