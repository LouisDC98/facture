import { useEffect, useState } from 'react'
import './ManageProfile.css'
import '../modals.css'

import { useForm } from "react-hook-form";

function ManageProfile(props) {
    const { closeModal, selectedItem, action, storeList } = props
    const [cardNumberRandom, setCardNumberRandom] = useState(true)
    const [clientIDRandom, setClientIDRandom] = useState(true)

    const { register, handleSubmit, control, setValue } = useForm({
        defaultValues: {
            newItem: {
                profileID: selectedItem?.profileID,
                firstName: selectedItem?.firstName,
                lastName: selectedItem?.lastName,
                adresse: selectedItem?.adresse,
                city: selectedItem?.city,
                codePostal: selectedItem?.codePostal,
                country: selectedItem?.country,
                cardNumber: selectedItem?.cardNumber,
                clientID: selectedItem?.clientID,
                magasinID: selectedItem?.magasinID,
                ownerID: selectedItem?.ownerID,
                gender: selectedItem?.gender,
            }
        }
    });

    useEffect(() => {
        if (cardNumberRandom && !selectedItem) {
            const randomCardNumber = generateCardNumber();
            setValue("newItem.cardNumber", randomCardNumber);
        } else if (!selectedItem) {
            setValue("newItem.cardNumber", null);
        }
    }, [cardNumberRandom]);

    useEffect(() => {
        if (clientIDRandom && !selectedItem) {
            const randomClientID = generateClientID();
            setValue("newItem.clientID", randomClientID);
        } else if (!selectedItem) {
            setValue("newItem.clientID", null);
        }
    }, [clientIDRandom]);

    const generateCardNumber = () => {
        let result = '';
        for (let i = 0; i < 19; i++) {
            result += Math.floor(Math.random() * 10);
        }
        return parseInt(result);
    }

    const generateClientID = () => {
        const prefix = Math.random() < 0.5 ? '50' : '51';
        let result = prefix;
        for (let i = 0; i < 5; i++) {
            result += Math.floor(Math.random() * 10);
        }
        return parseInt(result);
    };

    const onSubmit = (data) => {
        console.log('data', data)
        data.newItem.country = "France"
        action(data.newItem)
    };

    return (
        <div className='displayModal'>
            <div className='modalBg'>
                <button onClick={() => closeModal()} className='buttonIcon closeButton' />
                <div className='confirmModal'>
                    <form onSubmit={handleSubmit(onSubmit)} className='form profilForm'>

                        <div className='inputProfile'>
                            <div className='titleInput'>Prénom</div>
                            <input className='field' type='text' {...register(`newItem.firstName`, { required: true })}></input>
                        </div>

                        <div className='inputProfile'>
                            <div className='titleInput'>Nom</div>
                            <input className='field' type='text' {...register(`newItem.lastName`, { required: true })}></input>
                        </div>
                        <div className='inputProfile genderCol'>
                            <div className='radioGroup'>
                                <label>
                                    <input
                                        type='radio'
                                        value='male'
                                        {...register('newItem.gender', { required: true })}
                                    />
                                    Homme
                                </label>
                                <label>
                                    <input
                                        type='radio'
                                        value='female'
                                        {...register('newItem.gender', { required: true })}
                                    />
                                    Femme
                                </label>
                            </div>
                        </div>


                        <div className='inputProfile adressCol'>
                            <div className='titleInput'>Adresse</div>
                            <input className='field' type='text' {...register(`newItem.adresse`, { required: true })}></input>
                        </div>

                        <div className='inputProfile'>
                            <div className='titleInput'>Ville</div>
                            <input className='field' type='text' {...register(`newItem.city`, { required: true })}></input>
                        </div>

                        <div className='inputProfile'>
                            <div className='titleInput'>Code Postal</div>
                            <input className='field' type='text' {...register(`newItem.codePostal`, { required: true })}></input>
                        </div>

                        {/* <div className='inputProfile'>
                            <div className='titleInput'>Pays</div>
                            <input className='field' type='text' disabled placeholder='France' {...register(`newItem.country`)}></input>
                        </div> */}

                        <div className='inputProfile'>
                            <div className='titleInput'>Numéro de carte</div>
                            <input className='field' type='number' min={0} step="any" disabled={cardNumberRandom} {...register(`newItem.cardNumber`, { required: true, valueAsNumber: true })}></input>
                        </div>
                        <div className='inputProfile'>
                            <div className='titleInput'>Numéro client</div>
                            <input className='field' type='number' min={0} step="any" disabled={clientIDRandom} {...register(`newItem.clientID`, { required: true, valueAsNumber: true })}></input>
                        </div>
                        <div className='randomDiv'>
                            <input type='checkbox' checked={cardNumberRandom} onChange={(e) => setCardNumberRandom(e.target.checked)} />
                            <label>Random numéro de carte</label>
                        </div>

                        <div className='randomDiv'>
                            <input type='checkbox' checked={clientIDRandom} onChange={(e) => setClientIDRandom(e.target.checked)} />
                            <label>Random numéro de client</label>
                        </div>

                        <div className='inputProfile'>
                            <div className='titleInput'>Propriétaire</div>
                            <select className='field selectTVA' {...register(`newItem.ownerID`, { required: true })}>
                                <option value="1">Louis</option>
                                <option value="2">Yohan</option>
                            </select>
                        </div>

                        {/* <div className='inputProfile'>
                            <div className='titleInput'>Magasin</div>
                            <input className='field' type='number' min={0} step="any" {...register(`newItem.magasinID`, { required: true, valueAsNumber: true })}></input>
                        </div> */}

                        <div className='inputProfile'>
                            <div className='titleInput'>Magasin</div>
                            <select className='field selectTVA' {...register(`newItem.magasinID`, { required: true })}>
                                <option value="">-- Sélectionnez un magasin --</option>
                                {storeList?.map((store) => (
                                    <option key={store.id} value={store.id}>
                                        {store.name}
                                    </option>
                                ))}
                            </select>
                        </div>


                        <button type='submit' className='submitEdit submitCol'>{selectedItem ? "Confirmer les modifications" : "Créer l'article"}</button>
                    </form>
                </div>
            </div>
        </div>
    )
}


export default ManageProfile