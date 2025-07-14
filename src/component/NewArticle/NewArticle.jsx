import './NewArticle.css'
import { useEffect, useState } from 'react'
import { useForm, useFieldArray } from "react-hook-form";
import { insertEssential } from "../../services/essentialsServices.js"
import { insertRandom } from "../../services/randomsServices.js"

import Loader from '../Loader/Loader.jsx';

function NewArticle(props) {
    let { essentials } = props
    const [loading, setLoading] = useState(false)

    const { register, handleSubmit, control } = useForm({
        defaultValues: {
            newArticle: [
                {
                    marque: "",
                    code: "",
                    libelle: "",
                    qtyCmd: '',
                    tva: "",
                    prixUnit: "",
                    prixRemise: "",
                    type: false
                }
            ]
        }
    });
    const { fields } = useFieldArray({
        control,
        name: "newArticle",
    });

    const createEssential = async (data) => {
        setLoading(true)
        try {
            await insertEssential(data);
        } catch (error) {
            console.error('error', error)
        }
        setLoading(false)
    }

    const createRandom = async (data) => {
        setLoading(true)
        try {
            await insertRandom(data);
        } catch (error) {
            console.error('error', error)
        }
        setLoading(false)
    }

    const onSubmit = (data) => {
        const newArticle = data.newArticle[0]
        if (newArticle.type === true) {
            createEssential(newArticle)

        } else {
            createRandom(newArticle)
        }
    };
    console.log('essentails', essentials)
    return (
        <form onSubmit={handleSubmit(onSubmit)}>
            {loading && <Loader />}
            <table className='tableModal'>
                <thead>
                    <tr className='headerRow'>
                        <th>Marque</th>
                        <th>Code EAN</th>
                        <th>Libelé</th>
                        <th>Qte</th>
                        <th>TVA</th>
                        <th>Prix Unit</th>
                        <th>Remise</th>
                        <th>Random/Essential</th>
                    </tr>
                </thead>
                <tbody>
                    {essentials && fields.map((field, index) => (
                        <tr key={field.id} className='divField'>
                            <td>
                                <input type='text' list="marqueList" {...register(`newArticle.${index}.marque`, { required: true })} className='codeCol'></input>
                                <datalist id="marqueList">
                                    {[...new Set(essentials.map(item => item.marque || "Sans marque"))]
                                        .sort()
                                        .map((brand, index) => (
                                            <option key={index} value={brand}></option>
                                        ))}
                                </datalist>
                            </td>
                            <td>
                                <input type='text' {...register(`newArticle.${index}.code`, { required: true })} className='codeCol'></input>
                            </td>
                            <td>
                                <input type='text' {...register(`newArticle.${index}.libelle`, { required: true })} className='codeLibele'></input>
                            </td>
                            <td>
                                <input type='number' {...register(`newArticle.${index}.qtyCmd`, { required: true, valueAsNumber: true })} className='codeQtyCmd'></input>
                            </td>
                            <td>
                                <select  {...register(`newArticle.${index}.tva`, { required: true })}>
                                    <option value="20">20</option>
                                    <option value="10">10</option>
                                    <option value="5.5">5.5</option>
                                    <option value="0">0</option>
                                </select>
                            </td>
                            <td>
                                <input type='number' step=".01" {...register(`newArticle.${index}.prixUnit`, { required: true, valueAsNumber: true })} className='codePrix'></input>
                            </td>
                            <td>
                                <input type='number' step=".01" {...register(`newArticle.${index}.prixRemise`, { valueAsNumber: true })} className='codePrix'></input>
                            </td>
                            <td style={{ position: 'relative' }}>
                                <div className='switchFormat2'>
                                    <div className='formatInput'>
                                        <input type="checkbox" id="switch2" {...register(`newArticle.${index}.type`)} />
                                        <label htmlFor="switch2">Toggle</label>
                                    </div>
                                </div>
                            </td>
                        </tr>))}
                    <tr className='divField'>
                        <td colSpan="100%" className='saveRow'>
                            <button type='submit' className='submitArticle'>Créer</button>
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
        </form>
    )
}

export default NewArticle