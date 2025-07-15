import './ManageArticle.css'
import '../modals.css'

import { useForm, useFieldArray } from "react-hook-form";

function ManageArticle(props) {
    const { closeModal, selectedArticle, action, isRandom } = props

    const { register, handleSubmit, control } = useForm({
        defaultValues: {
            newArticle:
            {
                ...(!isRandom && { marque: selectedArticle?.marque }),
                code: selectedArticle?.code,
                libelle: selectedArticle?.libelle,
                qtyCmd: selectedArticle?.qtyCmd,
                tva: parseFloat(selectedArticle?.tva),
                prixUnit: selectedArticle?.prixUnit,
                prixRemise: selectedArticle?.prixRemise
            }

        }
    });
    const { fields } = useFieldArray({
        control,
        name: "newArticle",
    });

    const onSubmit = (data) => {
        action(data.newArticle)
    };

    return (
        <div className='displayModal'>
            <div className='modalBg'>
                <button onClick={() => closeModal()} className='buttonIcon closeButton' />
                <div className='confirmModal'>
                    <form onSubmit={handleSubmit(onSubmit)} className='form'>

                        {!isRandom &&
                            <div className='input'>
                                <div className='titleInput'>Marque</div>
                                <input className='field' type='text' {...register(`newArticle.marque`, { required: true })}></input>
                            </div>
                        }
                        <div className='input'>
                            <div className='titleInput'>Code EAN</div>
                            <input className='field' type='text' disabled={selectedArticle} {...register(`newArticle.code`, { required: true })}></input>
                        </div>

                        <div className='input'>
                            <div className='titleInput'>Libellé</div>
                            <input className='field' type='text' {...register(`newArticle.libelle`, { required: true })}></input>
                        </div>

                        <div className='input'>
                            <div className='titleInput'>Quantité commandée</div>
                            <input className='field' type='number' min={0} step="any" {...register(`newArticle.qtyCmd`, { required: true, valueAsNumber: true })}></input>
                        </div>

                        <div className='input'>
                            <div className='titleInput'>TVA</div>
                            <select className='field selectTVA' {...register(`newArticle.tva`, { required: true })}>
                                <option value="20">20</option>
                                <option value="10">10</option>
                                <option value="5.5">5.5</option>
                                <option value="0">0</option>
                            </select>
                        </div>

                        <div className='input'>
                            <div className='titleInput'>Prix unitaire</div>
                            <input className='field' type='number' min={0} step="any" {...register(`newArticle.prixUnit`, { required: true, valueAsNumber: true })}></input>
                        </div>

                        <div className='input'>
                            <div className='titleInput'>Prix remise</div>
                            <input className='field' type='number' min={0} step="any" {...register(`newArticle.prixRemise`, { required: true, valueAsNumber: true })}></input>
                        </div>

                        <button type='submit' className='submitEdit'>{selectedArticle ? "Confirmer les modifications" : "Créer l'article"}</button>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default ManageArticle