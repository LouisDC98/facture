import { useEffect, useMemo, useCallback } from 'react'
import './SelectProfile.css'

import { Temporal } from 'temporal-polyfill'
import { randomFactureNbr, randomCommandNbr, autoDate } from "../../callBack.js"
import { useForm, useFieldArray } from "react-hook-form";

function SelectProfile(props) {
    const { profileList, storeList, setProfile } = props

    const { register, handleSubmit, setValue, control } = useForm({
        defaultValues: {
            profile: [],
        },
    });
    const { fields, append, remove } = useFieldArray({
        control,
        name: "profile",
    });

    const groupedUsers = useMemo(() => {
        if (!profileList) return
        return profileList.reduce((acc, user) => {
            (acc[user.ownerID] = acc[user.ownerID] || []).push(user);
            return acc;
        }, {});
    }, [profileList]);

    const getYesterdayDate = useCallback(() => {
        const today = Temporal.Now.plainDateISO();
        const yesterday = today.subtract({ days: 1 });

        return yesterday.toString();
    }, []);

    const getTodayDate = useCallback(() => {
        const today = Temporal.Now.plainDateISO();
        return today.toString();
    }, []);

    useEffect(() => {
        if (!profileList || !storeList) return;

        let localData = localStorage.getItem("user");
        if (localData) {
            const arrayData = JSON.parse(localData).filter(el => el !== null && el !== "null");

            const enrichedProfiles = arrayData.map((userID) => {
                const selectedUser = profileList.find(e => e.profileID === userID);
                const selectedStore = storeList.find(store => store.id === selectedUser?.magasinID);

                return {
                    user: userID,
                    magasin: selectedStore ?? null,
                    date: Temporal.PlainDate.from(getYesterdayDate()).toLocaleString(),
                    dateFacturation: Temporal.PlainDate.from(getTodayDate()).toLocaleString(),
                    factureNumber: randomFactureNbr(),
                    commandNumber: randomCommandNbr(),
                    ...selectedUser
                };
            });

            append(enrichedProfiles, { shouldFocus: false });
            setProfile(enrichedProfiles);
        }

    }, [profileList, storeList]);


    const onChangeDate = useCallback((e, index) => {
        if (!e) return;
        let { day, month, year } = autoDate(e);
        let facturationDate = `${year}-${month}-${day}`;
        setValue(`profile.${index}.dateFacturation`, facturationDate, { shouldValidate: true });
    }, [setValue]);

    const onSubmit = data => {
        if (!profileList || !storeList) {
            return;
        }
        const enrichedProfiles = data.profile.map(item => {
            const selectedUser = profileList.find(e => e.profileID === item.user);
            const selectedStore = storeList.find(store => store.id === selectedUser?.magasinID);

            return {
                ...item,
                user: item.user,
                magasin: selectedStore ?? null,
                factureNumber: randomFactureNbr(),
                commandNumber: randomCommandNbr(),
                date: Temporal.PlainDate.from(item.date).toLocaleString(),
                dateFacturation: Temporal.PlainDate.from(item.dateFacturation).toLocaleString(),
                ...selectedUser

            };
        });
        setProfile(enrichedProfiles);

        const userIds = enrichedProfiles.map(p => p.user);
        localStorage.setItem("user", JSON.stringify(userIds));
    };

    return (
        <form onBlur={handleSubmit(onSubmit)} className='selectProfiles'>
            <table className='tableProfils'>
                <thead>
                    <tr>
                        <th></th>
                        <th>Utilisateur</th>
                        <th>Commande</th>
                        <th>Facturation</th>
                    </tr>
                </thead>
                <tbody>
                    {fields.map((field, index) => (
                        <tr key={field.id}>
                            <td>
                                <button type='button' className='addBtn' onClick={() => remove(index)} title={"Supprimer la ligne"}>-</button>
                            </td>
                            <td>
                                <select {...register(`profile.${index}.user`, {
                                    validate: value => value !== "null" || "obligatoire", valueAsNumber: true,
                                })}>
                                    <option value="null" hidden>Nom</option>
                                    {groupedUsers && Object.keys(groupedUsers).map((ownerID) => (
                                        <optgroup key={ownerID} label={Number(ownerID) === 1 ? "Louis" : "Yohan"}>
                                            {groupedUsers[ownerID].map((user, optIndex) => (
                                                <option key={optIndex} value={user.profileID}>
                                                    {user.firstName}
                                                </option>
                                            ))}
                                        </optgroup>
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
                    <tr>
                        <td>
                            <button type='button' className='addBtn' onClick={() => append({ user: 'null', magasin: "null", date: "null" })} title={"Ajouter une ligne"}>+</button>
                        </td>

                    </tr>
                </tbody>
            </table>
        </form>
    )
}

export default SelectProfile