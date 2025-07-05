import React, { useEffect, useMemo, useState, useCallback } from 'react'
import './FormFacture.css'
import { useForm, useFieldArray } from "react-hook-form";

import { randomFactureNbr, randomCommandNbr, autoDate, formatDate, formatDateRevert } from "../../../callBack.js"

function FormFacture(props) {
    let { closeModal, setMainInfos, mainInfos, setOpenArticles, magasinList, users } = props
    const [submitAndOpen, setSubmitAndOpen] = useState(false)

    const { register, handleSubmit, setValue, control, formState: { errors } } = useForm();
    const { fields, append, remove } = useFieldArray({
        control,
        name: "profile",
    });

    useEffect(() => {
        if (mainInfos.profile?.length > 0) {
            const updatedFields = mainInfos.profile.map((element, i) => ({
                user: users.findIndex(e => e.firstName === element.firstName),
                magasin: magasinList.find(e => e.name === element.magasin.name).id,
                date: formatDateRevert(element.date),
                dateFacturation: formatDateRevert(element.dateFacturation),
            }));

            append(updatedFields, { shouldFocus: false });
        } else {
            let localData = localStorage.getItem("user");
            if (localData) {
                const arrayData = JSON.parse(localData);
                const updatedFields = arrayData.map((element, i) => ({
                    user: element,
                    magasin: "null",
                    date: getYesterdayDate(),
                    dateFacturation: getTodayDate(),
                }));

                append(updatedFields, { shouldFocus: false });
            } else if (fields.length === 0) {
                append({ user: "null", magasin: "null", date: getYesterdayDate(), dateFacturation: getTodayDate() });
            }
        }
    }, [mainInfos]);


    const getYesterdayDate = useCallback(() => {
        const today = new Date();
        const yesterday = new Date(today);
        yesterday.setDate(today.getDate() - 1);

        return yesterday.toISOString().split('T')[0];
    }, []);

    const getTodayDate = useCallback(() => {
        const today = new Date();
        return today.toISOString().split('T')[0];
    }, []);

    const onChangeDate = useCallback((e, index) => {
        if (!e) return;
        let { day, month, year } = autoDate(e);
        let facturationDate = `${year}-${month}-${day}`;
        setValue(`profile.${index}.dateFacturation`, facturationDate, { shouldValidate: true });
    }, [setValue]);

    const onSubmit = data => {
        const userLocalStorage = [];
        const formattedData = data.profile.map(item => {
            userLocalStorage.push(item.user);
            const selectedUser = users[item.user];
            const selectedMagasin = magasinList.find(magasin => magasin.id === selectedUser.magasinId);

            return {
                ...selectedUser,
                magasin: selectedMagasin,
                date: formatDate(item.date),
                dateFacturation: formatDate(item.dateFacturation),
                factureNumber: randomFactureNbr(),
                commandNumber: randomCommandNbr(),
            };
        });

        localStorage.setItem("user", JSON.stringify(userLocalStorage));
        setMainInfos({
            profile: [...formattedData],
            currentProfile: formattedData[0]
        });
        closeModal();

        if (submitAndOpen) {
            setOpenArticles(true);
        }
        setSubmitAndOpen(false);
    };

    const groupedUsers = useMemo(() => {
        if (!users) return
        return users.reduce((acc, user) => {
            (acc[user.ownerID] = acc[user.ownerID] || []).push(user);
            return acc;
        }, {});
    }, [users]);

    return (
        <div className='displayModal'>
            <div className='modalBg modalBgFacture'>
                <h2>Select a champion</h2>
                <button onClick={() => closeModal()} className='buttonIcon closeButton' />

                <form onSubmit={handleSubmit(onSubmit)}>
                    <table className='tableModal'>
                        <thead>
                            <tr className='headerRow'>
                                <th></th>
                                <th>Utilisateur</th>
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
                                    <td className='positionRelative'>
                                        <select {...register(`profile.${index}.user`, {
                                            validate: value => value !== "null" || "obligatoire"
                                        })}>
                                            <option value="null" hidden>Nom</option>
                                            {groupedUsers && Object.keys(groupedUsers).map((ownerID) => (
                                                <optgroup key={ownerID} label={Number(ownerID) === 1 ? "Louis" : "Yohan"}>
                                                    {groupedUsers[ownerID].map((user, optIndex) => (
                                                        <option key={optIndex} value={user.userID}>
                                                            {user.firstName}
                                                        </option>
                                                    ))}
                                                </optgroup>
                                            ))}
                                        </select>
                                        {errors.profile?.[index]?.user && <p className="errorSelect">{errors.profile[index].user.message}</p>}

                                    </td>
                                    <td className='positionRelative'>
                                        <input type='date' onSelect={(e) => onChangeDate(e.target.value, index)} {...register(`profile.${index}.date`, { required: "obligatoire" })}></input>
                                        {errors.profile?.[index]?.date && <p className="error">{errors.profile[index].date.message}</p>}
                                    </td>
                                    <td className='positionRelative'>
                                        <input type='date' {...register(`profile.${index}.dateFacturation`, { required: "obligatoire" })}></input>
                                        {errors.profile?.[index]?.dateFacturation && <p className="error">{errors.profile[index].dateFacturation.message}</p>}
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
                    <button type='submit' className='saveButton saveButtonAndOpen' onClick={() => setSubmitAndOpen(true)}>Sauvegarder et choisir articles</button>
                    <button type='submit' className='saveButton'>Sauvegarder</button>
                </form>

            </div>
        </div>
    )
}

export default FormFacture