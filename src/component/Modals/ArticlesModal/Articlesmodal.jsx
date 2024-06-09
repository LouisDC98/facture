import React, { useEffect } from 'react'
import './ArticlesModal.css'
import '../modals.css'
import { useForm, useFieldArray } from "react-hook-form";


function ArticlesModal(props) {
    let { closeModal, setArticles, articles } = props

    const { register, handleSubmit, control, formState: { errors } } = useForm();
    const { fields, append, remove } = useFieldArray({
        control,
        name: "articleItem",
    });

    const onSubmit = data => {

        for (const element of data.articleItem) {
            if (element.major) {
                element.prixUnit *= 1.2;
                element.prixUnit = Math.floor(element.prixUnit / 0.05) * 0.05;
                element.prixUnit = parseFloat(element.prixUnit.toFixed(2));
            }

            if (isNaN(element.prixRemise)) {
                element.prixRemise = 0;
            }
            element.total = parseFloat((element.prixUnit * element.qtyCmd - element.prixRemise).toFixed(2));
        }
        setArticles([...data.articleItem])
        closeModal()
    }

    useEffect(() => {
        if (articles?.length > 0) {
            articles.forEach((element, i) => {
                append({ code: element.code, libelle: element.libelle, qtyCmd: element.qtyCmd, tva: element.tva, prixUnit: element.prixUnit, prixRemise: element.prixRemise })
            });
        } else if (fields.length === 0) {
            append({ code: "", libelle: "", qtyCmd: '', tva: "", prixUnit: "", prixRemise: "" })
        }
    }, [articles]);

    return (
        <div className='displayModal'>
            <div className='modalBg modalBgArticle'>
                <h2>Elaborer sa liste</h2>
                <button onClick={() => closeModal()} className='buttonIcon closeButton' />

                <form onSubmit={handleSubmit(onSubmit)}>
                    <table className='tableFormFacture'>
                        <thead>
                            <tr className='headerRow'>
                                <th></th>
                                <th>Code EAN</th>
                                <th>Libelé</th>
                                <th>Qte</th>
                                <th>TVA</th>
                                <th>Prix Unit</th>
                                <th>Majoration</th>
                                <th>Remise</th>
                            </tr>
                        </thead>
                        <tbody>
                            {fields.map((field, index) => (
                                <tr key={field.id} className='divField'>
                                    <td>
                                        <button type='button' className='removeUserBtn' onClick={() => remove(index)} title={"Supprimer la ligne"}></button>
                                    </td>
                                    <td>
                                        <input type='text' {...register(`articleItem.${index}.code`, { required: true })} className='codeCol'></input>
                                    </td>
                                    <td>
                                        <input type='text' {...register(`articleItem.${index}.libelle`, { required: true })} className='codeLibele'></input>
                                    </td>
                                    <td>
                                        <input type='number' {...register(`articleItem.${index}.qtyCmd`, { required: true, valueAsNumber: true })} className='codeQtyCmd'></input>
                                    </td>
                                    <td>
                                        <select  {...register(`articleItem.${index}.tva`, { required: true })}>
                                            <option value="20">20</option>
                                            <option value="10">10</option>
                                            <option value="5.5">5.5</option>
                                            <option value="0">0</option>
                                        </select>
                                    </td>
                                    <td>
                                        <input type='number' step=".01" {...register(`articleItem.${index}.prixUnit`, { required: true, valueAsNumber: true })} className='codePrix'></input>
                                    </td>
                                    <td>
                                        <input type='checkbox' {...register(`articleItem.${index}.major`)} className='codeCol'></input>
                                    </td>
                                    <td>
                                        <input type='number' step=".01" {...register(`articleItem.${index}.prixRemise`, { valueAsNumber: true })} className='codePrix'></input>
                                    </td>
                                </tr>

                            ))}
                            <tr className='divField'>
                                <td>
                                    <button type='button' className='addFieldBtn' onClick={() => append({ code: "", libelle: "", qtyCmd: '', tva: "", prixUnit: "", prixRemise: "" })} title={"Ajouter une ligne"}></button>
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
                    <button type='submit' className='saveButton'>Sauvegarder</button>
                </form>

            </div>
        </div>
    )
}

export default ArticlesModal