import React, { useEffect } from 'react'
import "./HeaderTicket.css"

import logo from '../../assets/logoCarrefour.png'

function HeaderTicket(props) {
    let { firstProfile, setHeure, heure } = props

    useEffect(() => {
        let randomHour = heureAleatoire()
        setHeure(randomHour)
    });

    const heureAleatoire = () => {
        let minutesAleatoires = Math.floor(Math.random() * 300);

        let heures = Math.floor(minutesAleatoires / 60) + 11;
        let minutes = minutesAleatoires % 60;

        heures = heures < 10 ? '0' + heures : heures;
        minutes = minutes < 10 ? '0' + minutes : minutes;

        return heures + ':' + minutes;
    }

    return (
        <>
            <section className='headerTicket'>
                <img src={logo} alt="logoCarrefour" />
                <h2 className='wrapperP'>{firstProfile?.magasin?.ticket ? firstProfile.magasin?.ticket : <span>TOULOUSE PURPAN</span>}</h2>
                <p className='wrapperP telNumberTicket'>{firstProfile?.magasin?.tel ? firstProfile.magasin?.tel + " à " + heure : <span>06 66 66 66 66</span>}</p>
                {firstProfile?.magasin?.horaires.map((option, index) => (
                    <p key={index}>{option}</p>
                ))}
            </section>
            <p className='wrapperP dateTicket'>{firstProfile?.date ? firstProfile.date + " à " + heure : <span>01/01/2000 à 01:01</span>}</p>
        </>
    )
}

export default HeaderTicket