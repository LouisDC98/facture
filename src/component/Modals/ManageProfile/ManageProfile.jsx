import { useEffect, useState } from 'react'
import './ManageProfile.css'
import '../modals.css'

import { useForm } from "react-hook-form";

function ManageProfile(props) {
    const { closeModal, selectedItem, action, storeList } = props
    const [cardNumberRandom, setCardNumberRandom] = useState(true)
    const [clientIDRandom, setClientIDRandom] = useState(true)

    const { register, handleSubmit, setValue } = useForm({
        defaultValues: {
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
    });

    useEffect(() => {
        if (cardNumberRandom && !selectedItem) {
            const randomCardNumber = generateCardNumber();
            setValue("cardNumber", randomCardNumber);
        } else if (!selectedItem) {
            setValue("cardNumber", null);
        }
    }, [cardNumberRandom]);

    useEffect(() => {
        if (clientIDRandom && !selectedItem) {
            const randomClientID = generateClientID();
            setValue("clientID", randomClientID);
        } else if (!selectedItem) {
            setValue("clientID", null);
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
        data.country = "France"
        action(data)
    };

    return (
        <div className='displayModal manageProfile'>
            <div className='modalBg'>
                <div className='moddalHeader'>
                    <h3 className='titleModal'>{selectedItem ? "Modifier un profil" : "Créer un profil"}</h3>
                    <button onClick={() => closeModal()} className='closeButtonNew' />
                </div>
                <span className='spanRow'></span>
                <form onSubmit={handleSubmit(onSubmit)} className='form gridDisposal'>
                    <div className='input genderCol'>
                        <div className='radioGroup'>
                            <label>
                                <input
                                    type='radio'
                                    value='male'
                                    {...register('gender', { required: true })}
                                />
                                Homme
                            </label>
                            <label>
                                <input
                                    type='radio'
                                    value='female'
                                    {...register('gender', { required: true })}
                                />
                                Femme
                            </label>
                        </div>
                    </div>

                    <div className='input'>
                        <div className='titleInput'>Prénom</div>
                        <input className='field' type='text' {...register(`firstName`, { required: true })}></input>
                    </div>

                    <div className='input'>
                        <div className='titleInput'>Nom</div>
                        <input className='field' type='text' {...register(`lastName`, { required: true })}></input>
                    </div>


                    <div className='input adressCol'>
                        <div className='titleInput'>Adresse</div>
                        <input className='field' type='text' {...register(`adresse`, { required: true })}></input>
                    </div>

                    <div className='input'>
                        <div className='titleInput'>Ville</div>
                        <input className='field' type='text' {...register(`city`, { required: true })}></input>
                    </div>

                    <div className='input'>
                        <div className='titleInput'>Code Postal</div>
                        <input className='field' type='text' {...register(`codePostal`, { required: true })}></input>
                    </div>

                    {/* <div className='input'>
                            <div className='titleInput'>Pays</div>
                            <input className='field' type='text' disabled placeholder='France' {...register(`country`)}></input>
                        </div> */}

                    <div className='input'>
                        <div className='titleInput'>Numéro de carte</div>
                        <input className='field' type='number' min={0} step="any" disabled={cardNumberRandom} {...register(`cardNumber`, { required: true, valueAsNumber: true })}></input>
                    </div>
                    <div className='input'>
                        <div className='titleInput'>Numéro client</div>
                        <input className='field' type='number' min={0} step="any" disabled={clientIDRandom} {...register(`clientID`, { required: true, valueAsNumber: true })}></input>
                    </div>
                    <div className='randomDiv'>
                        <input type='checkbox' checked={cardNumberRandom} onChange={(e) => setCardNumberRandom(e.target.checked)} />
                        <label>Random numéro de carte</label>
                    </div>

                    <div className='randomDiv'>
                        <input type='checkbox' checked={clientIDRandom} onChange={(e) => setClientIDRandom(e.target.checked)} />
                        <label>Random numéro de client</label>
                    </div>

                    <div className='input'>
                        <div className='titleInput'>Propriétaire</div>
                        <select className='field select' {...register(`ownerID`, { required: true })}>
                            <option value="1">Louis</option>
                            <option value="2">Yohan</option>
                        </select>
                    </div>

                    <div className='input'>
                        <div className='titleInput'>Magasin</div>
                        <select className='field select' {...register(`magasinID`, { required: true })}>
                            <option value="">-- Sélectionnez un magasin --</option>
                            {storeList?.map((store) => (
                                <option key={store.id} value={store.id}>
                                    {store.name}
                                </option>
                            ))}
                        </select>
                    </div>


                    <button type='submit' className='secondaryBtn submitBtn submitCol'>{selectedItem ? "Confirmer les modifications" : "Créer l'article"}</button>
                </form>
            </div>
        </div>
    )
}


export default ManageProfile