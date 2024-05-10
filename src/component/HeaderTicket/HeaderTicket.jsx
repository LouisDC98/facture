import React from 'react'
import "./HeaderTicket.css"

import logo from '../../assets/logoCarrefour.png'

function HeaderTicket() {
    return (
        <>
            <section className='headerTicket'>
                <img src={logo} alt="logoCarrefour" />
                <h2>TOULOUSE PURPAN</h2>
                <p className='telNumberTicket'>Tél: 05 34 26 58 79</p>
                <p>Lun. au Jeu.: 08:30 à 21:30</p>
                <p>Ven.: 08:30 à 22:00</p>
                <p>Sam.: 08:30 à 21:00</p>
                <p>Dim.: Fermé</p>
            </section>
            <div className='dateTicket'>08/05/2024 à 15h40</div>
        </>
    )
}

export default HeaderTicket