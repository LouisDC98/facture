import './ManageProfile.css'
import '../modals.css'

import { useForm, useFieldArray } from "react-hook-form";

function ManageProfile(props) {
    const { closeModal, selectedItem, action, profiles } = props

    const { register, handleSubmit, control } = useForm({
        defaultValues: {
            newItem:
            {
                profileID: selectedItem?.profileID,
                firstName: selectedItem?.firstName,
                lastName: selectedItem?.lastName,
                adresse: selectedItem?.adresse,
                city: selectedItem?.city,
                codePostal: selectedItem?.codePostal,
                country: selectedItem?.country,
                cardNumber: selectedItem?.cardNumber,
                magasinID: selectedItem?.magasinID,
                ownerID: selectedItem?.ownerID,
            }

        }
    });
    const { fields } = useFieldArray({
        control,
        name: "newItem",
    });

    const onSubmit = (data) => {
        console.log('data')
        action(data.newItem)
    };

    return (
        <div className='displayModal'>
            <div className='modalBg'>
                <button onClick={() => closeModal()} className='buttonIcon closeButton' />
                <div className='confirmModal'>
                    <form onSubmit={handleSubmit(onSubmit)} className='form'>

                        <div className='input'>
                            <div className='titleInput'>Prénom</div>
                            <input className='field' type='text' {...register(`newItem.firstName`, { required: true })}></input>
                        </div>

                        <div className='input'>
                            <div className='titleInput'>Nom</div>
                            <input className='field' type='text' {...register(`newItem.lastName`, { required: true })}></input>
                        </div>

                        <div className='input'>
                            <div className='titleInput'>Adresse</div>
                            <input className='field' type='text' {...register(`newItem.adresse`, { required: true })}></input>
                        </div>

                        <div className='input'>
                            <div className='titleInput'>Ville</div>
                            <input className='field' type='text' {...register(`newItem.city`, { required: true })}></input>
                        </div>

                        <div className='input'>
                            <div className='titleInput'>Code Postal</div>
                            <input className='field' type='text' {...register(`newItem.codePostal`, { required: true })}></input>
                        </div>

                        <div className='input'>
                            <div className='titleInput'>Pays</div>
                            <input className='field' type='text' disabled {...register(`newItem.country`)}></input>
                        </div>

                        <div className='input'>
                            <div className='titleInput'>Numéro de carte</div>
                            <input className='field' type='number' min={0} step="any" {...register(`newItem.cardNumber`, { required: true, valueAsNumber: true })}></input>
                        </div>

                        <div className='input'>
                            <div className='titleInput'>Propriétaire</div>
                            <select className='field selectTVA' {...register(`newItem.ownerID`, { required: true })}>
                                <option value="1">Louis</option>
                                <option value="2">Yohan</option>
                            </select>
                        </div>

                        <div className='input'>
                            <div className='titleInput'>Magasin</div>
                            <input className='field' type='number' min={0} step="any" {...register(`newItem.magasinID`, { required: true, valueAsNumber: true })}></input>
                        </div>

                        {/* <div className='input'>
                            <div className='titleInput'>Magasin</div>
                            <select className='field selectTVA' {...register(`newItem.tva`, { required: true })}>
                                <option value="20">20</option>
                                <option value="10">10</option>
                                <option value="5.5">5.5</option>
                                <option value="0">0</option>
                            </select>
                        </div> */}


                        <button type='submit' className='submitEdit'>{selectedItem ? "Confirmer les modifications" : "Créer l'article"}</button>
                    </form>
                </div>
            </div>
        </div>
    )
}


export default ManageProfile