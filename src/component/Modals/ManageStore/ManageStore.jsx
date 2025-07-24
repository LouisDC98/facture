import './ManageStore.css'
import '../modals.css'

import { useForm } from "react-hook-form";

function ManageStore(props) {
    const { closeModal, selectedItem, action } = props

    const { register, handleSubmit } = useForm({
        defaultValues: {
            name: selectedItem?.name,
            primary_address: selectedItem?.primary_address,
            secondary_address: selectedItem?.secondary_address,
            tel: selectedItem?.tel,
            ticket: selectedItem?.ticket,
            horaires: selectedItem?.horaires
        }
    });

    const onSubmit = (data) => {
        action(data)
    };

    return (
        <div className='displayModal manageStore'>
            <div className='modalBg'>
                <div className='moddalHeader'>
                    <h3 className='titleModal'>{selectedItem ? "Modifier un magasin" : "Créer un magasin"}</h3>
                    <button onClick={() => closeModal()} className='closeButtonNew' />
                </div>
                <span className='spanRow'></span>
                <form onSubmit={handleSubmit(onSubmit)} className='form gridDisposal'>
                    <div className='input'>
                        <div className='titleInput'>Ville</div>
                        <input className='field' type='text' placeholder='Purpan' {...register(`name`, { required: true })}></input>
                    </div>

                    <div className='input primAddressCol'>
                        <div className='titleInput'>Adresse principale</div>
                        <input className='field' type='text' placeholder='CARREFOUR TOULOUSE PURPAN 36 RTE DE BAYONNE' {...register(`primary_address`, { required: true })}></input>
                    </div>


                    <div className='input secondAddressCol'>
                        <div className='titleInput'>Adresse secondaire</div>
                        <input className='field' type='text' placeholder='PURPAN 31000 TOULOUSE' {...register(`secondary_address`, { required: true })}></input>
                    </div>

                    <div className='input'>
                        <div className='titleInput'>Téléphone</div>
                        <input className='field' type='text' placeholder='05 34 26 58 79'{...register(`tel`, { required: true })}></input>
                    </div>

                    <div className='input ticketCol'>
                        <div className='titleInput'>Ticket</div>
                        <input className='field' type='text' placeholder='TOULOUSE PURPAN' {...register(`ticket`, { required: true })}></input>
                    </div>

                    <div className='input hoursCol'>
                        <div className='titleInput'>Horaires</div>
                        <textarea className='field fieldTextArea' type='text' placeholder='["Lun. au Jeu.: 08:30 à 21:30", "Ven.: 08:30 à 22:00", "Sam.: 08:30 à 21:00", "Dim.: Fermé"]' {...register(`horaires`, { required: true })} ></textarea>
                    </div>

                    <button type='submit' className='secondaryBtn submitBtn submitCol'>{selectedItem ? "Confirmer les modifications" : "Créer l'article"}</button>
                </form>
            </div>
        </div>
    )
}

export default ManageStore