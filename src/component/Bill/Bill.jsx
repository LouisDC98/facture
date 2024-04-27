import React from 'react'
import "./Bill.css"

function Bill() {
    return (
        <table>
            <thead className='headerTable'>
                <tr>
                    <th>Code EAN 13</th>
                    <th>Libellé</th>
                    <th>Qté Cdée</th>
                    <th>Qté livrée</th>
                    <th>TVA %</th>
                    <th>Prix Unit. TTC</th>
                    <th>Montant remise TTC</th>
                    <th>Montant TTC</th>
                </tr>
            </thead>
            <tbody>
                <tr>
                    <td>3333340008267</td>
                    <td>Filet 2Kg Pommes de T. de consommation chair ferme</td>
                    <td className='alignEnd'>1</td>
                    <td className='alignEnd'>1</td>
                    <td className='alignEnd'>20</td>
                    <td className='alignEnd'>1.99</td>
                    <td className='alignEnd'></td>
                    <td className='alignEnd'>1.99</td>
                </tr>
                
            </tbody>
        </table>
    )
}

export default Bill