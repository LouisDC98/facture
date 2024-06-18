import React, { useEffect, useState } from 'react'
import './ArticlesModal.css'
import '../modals.css'
import { useForm, useFieldArray } from "react-hook-form";
import essentials from "../../../data/essential.json"
import arrow from "../../../assets/arrow_down.svg"
import Accordion from '../../Accordion/Accordion';


function ArticlesModal(props) {
    let { closeModal, setArticles, articles, handleRandom } = props
    let [nbrRandomArticles, setNbrRandomArticles] = useState(0)
    const [mainOpen, setMainOpen] = useState(true);

    const toggleMainAccordion = () => {
        setMainOpen(!mainOpen);
    };

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
                if (fields.findIndex(field => field.code === element.code) === -1) {
                    append({ code: element.code, libelle: element.libelle, qtyCmd: element.qtyCmd, tva: element.tva, prixUnit: element.prixUnit, prixRemise: element.prixRemise, random: element.random })
                }
            });
        } else if (fields.length === 0) {
            append({ code: "", libelle: "", qtyCmd: '', tva: "", prixUnit: "", prixRemise: "" })
        }
    }, [articles]);


    const handleCheckboxChange = (article) => {
        let index = fields.findIndex(e => e.code === article.code)
        if (index !== -1) {
            if (fields.length === 1) {
                append({ code: "", libelle: "", qtyCmd: '', tva: "", prixUnit: "", prixRemise: "" })
            }
            remove(index)
        } else {
            if (fields[0]?.code === "") {
                remove(0)
            }
            append({ code: article.code, libelle: article.libelle, qtyCmd: article.qtyCmd, tva: article.tva, prixUnit: article.prixUnit, prixRemise: article.prixRemise })
        }
    };

    const handleRandomChild = () => {
        handleRandom(nbrRandomArticles, articles)
    };

    const categoryList = [
        "Hygiène & beauté",
        "À boire",
        "Autres"
    ]

    return (
        <div className='displayModal'>
            <div className='modalBg modalBgArticle'>
                <h2>Elaborer la liste</h2>
                <button onClick={() => closeModal()} className='buttonIcon closeButton' />

                <div className='divUpArticleModal'>

                    <div className="accordionComponent">
                        <div onClick={toggleMainAccordion} className="accordionHeader" aria-expanded={mainOpen}>
                            <div>Articles essentiels</div>
                            <img src={arrow} alt='openAccordion' className="accordionOpenBtn" />
                        </div>
                        <div className="accordionContent" aria-expanded={mainOpen}>
                            {essentials.map((articles, index) => (
                                <Accordion
                                    key={index}
                                    title={categoryList[index]}
                                    articles={articles}
                                    fields={fields}
                                    handleCheckboxChange={handleCheckboxChange}
                                />
                            ))}
                        </div>
                    </div>
                    <div className='divRandom'>+
                        <input type='number' placeholder='0' onChange={(e) => setNbrRandomArticles(e.target.value)}></input>
                        <button className='saveRandomBtn' onClick={() => handleRandomChild()}>articles random</button>
                    </div>
                </div>

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