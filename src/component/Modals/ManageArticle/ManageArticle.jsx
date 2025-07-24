import './ManageArticle.css'
import '../modals.css'

import { useForm } from "react-hook-form";

function ManageArticle(props) {
    const { closeModal, selectedItem, action, isRandom, essentials } = props

    const { register, handleSubmit } = useForm({
        defaultValues: {
            ...(!isRandom && { marque: selectedItem?.marque }),
            code: selectedItem?.code,
            libelle: selectedItem?.libelle,
            qtyCmd: selectedItem?.qtyCmd,
            tva: parseFloat(selectedItem?.tva),
            prixUnit: selectedItem?.prixUnit,
            prixRemise: selectedItem?.prixRemise
        }
    });

    const onSubmit = (data) => {
        action(data)
    };

    return (
        <div className='displayModal manageArticle'>
            <div className='modalBg'>
                <div className='moddalHeader'>
                    <h3 className='titleModal'>{selectedItem ? "Modifier un article" : "Créer un article"}</h3>
                    <button onClick={() => closeModal()} className='closeButtonNew' />
                </div>
                <span className='spanRow'></span>
                <div className='confirmModal'>
                    <form onSubmit={handleSubmit(onSubmit)} className='form gridDisposal'>

                        {!isRandom &&
                            <div className='input'>
                                <div className='titleInput'>Marque</div>
                                <input className='field' type='text' list="marqueList"{...register(`marque`, { required: true })}></input>
                                <datalist id="marqueList">
                                    {[...new Set(essentials.map(item => item.marque || "Sans marque"))]
                                        .sort()
                                        .map((brand, index) => (
                                            <option key={index} value={brand}></option>
                                        ))}
                                </datalist>
                            </div>
                        }
                        <div className='input eanCol'>
                            <div className='titleInput'>Code EAN</div>
                            <input className='field' type='text' disabled={selectedItem} {...register(`code`, { required: true })}></input>
                        </div>

                        <div className='input tvaCol'>
                            <div className='titleInput'>TVA</div>
                            <select className='field select' {...register(`tva`, { required: true })}>
                                <option value="20">20</option>
                                <option value="10">10</option>
                                <option value="5.5">5.5</option>
                                <option value="0">0</option>
                            </select>
                        </div>
                        <div className='input libelleCol'>
                            <div className='titleInput'>Libellé</div>
                            <input className='field' type='text' {...register(`libelle`, { required: true })}></input>
                        </div>

                        <div className='input qtyCol'>
                            <div className='titleInput'>Quantité commandée</div>
                            <input className='field' type='number' min={0} step="any" {...register(`qtyCmd`, { required: true, valueAsNumber: true })}></input>
                        </div>


                        <div className='input unitPriceCol'>
                            <div className='titleInput'>Prix unitaire</div>
                            <input className='field' type='number' min={0} step="any" {...register(`prixUnit`, { required: true, valueAsNumber: true })}></input>
                        </div>

                        <div className='input discountPriceCol'>
                            <div className='titleInput'>Prix remise</div>
                            <input className='field' type='number' min={0} step="any" {...register(`prixRemise`, { required: true, valueAsNumber: true })}></input>
                        </div>

                        <button type='submit' className='secondaryBtn submitBtn btnCol'>{selectedItem ? "Confirmer les modifications" : "Créer l'article"}</button>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default ManageArticle