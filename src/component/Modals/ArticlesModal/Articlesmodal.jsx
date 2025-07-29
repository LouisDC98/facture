import React, { useEffect, useState } from 'react'
import './ArticlesModal.css'
import '../modals.css'
import { useForm, useFieldArray } from "react-hook-form";
import arrow from "../../../assets/arrow_down.svg"
import Accordion from '../../Accordion/Accordion';


function ArticlesModal(props) {
    let { closeModal, setArticles, articles, isMobile, handleRandom, essentials } = props
    const [nbrRandomArticles, setNbrRandomArticles] = useState(0)
    const [mainOpen, setMainOpen] = useState(true);

    const toggleMainAccordion = () => {
        setMainOpen(!mainOpen);
    };

    const { register, handleSubmit, control } = useForm();
    const { fields, append, remove } = useFieldArray({
        control,
        name: "articleItem",
    });

    const onSubmit = (data) => {
        const processed = data.articleItem.map(item => {
            const prixUnit = item.major
                ? Math.floor((item.prixUnit * 1.2) / 0.05) * 0.05
                : item.prixUnit;

            const prixRemise = isNaN(item.prixRemise) ? 0 : item.prixRemise;

            return {
                ...item,
                prixUnit: parseFloat(prixUnit.toFixed(2)),
                prixRemise,
                total: parseFloat((prixUnit * item.qtyCmd - prixRemise).toFixed(2))
            };
        });

        setArticles(processed);
        closeModal();
    };

    useEffect(() => {
        isMobile && toggleMainAccordion()
        if (articles?.length > 0) {
            articles.forEach((article) => {
                const alreadyExists = fields.some(f => f.code === article.code);
                if (!alreadyExists) {
                    append({ ...article });
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
            article.tva = parseFloat(article.tva)
            append({ ...article })
        }
    };

    const handleRandomChild = () => {
        handleRandom(nbrRandomArticles, articles)
    };

    const handleDeleteRandom = () => {
        const indicesToRemove = fields
            .map((article, index) => article.random ? index : -1)
            .filter(index => index !== -1)
            .reverse();

        indicesToRemove.forEach(index => remove(index));

        const filteredFields = fields.filter(article => !article.random);
        setArticles(filteredFields);
    };

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
                        {essentials && (
                            <div className="accordionContent" aria-expanded={mainOpen}>
                                {Object.entries(
                                    essentials
                                        .filter(item => item.active === 1 || item.active === true)
                                        .reduce((acc, item) => {
                                            const brand = item.marque || "Sans marque";
                                            if (!acc[brand]) acc[brand] = [];
                                            acc[brand].push(item);
                                            return acc;
                                        }, {})
                                ).map(([marque, articles], index) => (
                                    <Accordion
                                        key={index}
                                        title={marque}
                                        articles={articles}
                                        fields={fields}
                                        handleCheckboxChange={handleCheckboxChange}
                                    />
                                ))}
                            </div>
                        )}
                    </div>
                    {!isMobile && <div className='divRandom'>
                        <div>
                            +
                            <input type='number' placeholder='0' onChange={(e) => setNbrRandomArticles(e.target.value)}></input>
                            <button className='saveRandomBtn' onClick={() => handleRandomChild()}>add random</button>
                        </div>
                        <button className='saveRandomBtn deleteRandomBtn' onClick={() => handleDeleteRandom()}>delete randoms</button>
                    </div>}
                </div>

                <form onSubmit={handleSubmit(onSubmit)}>
                    <table className='tableModal'>
                        {!isMobile &&
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
                        }
                        <tbody>
                            {
                                !isMobile &&
                                fields.map((field, index) => (
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

                                ))
                            }
                            <tr className='divField'>
                                {
                                    !isMobile &&
                                    <td>
                                        <button type='button' className='addFieldBtn' onClick={() => append({ code: "", libelle: "", qtyCmd: '', tva: "", prixUnit: "", prixRemise: "" })} title={"Ajouter une ligne"}></button>
                                    </td>
                                }
                                <td colSpan="100%" className='greyCell'>
                                    <button type='submit' className='submitArticle'>Sauvegarder</button>
                                </td>

                            </tr>
                        </tbody>
                        {
                            !isMobile &&
                            <tfoot>
                                <tr >
                                    <td colSpan="100%">
                                    </td>
                                </tr>

                            </tfoot>
                        }
                    </table>
                </form>

            </div>
        </div>
    )
}

export default ArticlesModal