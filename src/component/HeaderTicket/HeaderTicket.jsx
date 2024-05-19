import React, { useEffect } from 'react'
import "./HeaderTicket.css"

import logo from '../../assets/logoCarrefour.png'

function HeaderTicket(props) {
    let { mainInfos, setHeure } = props

    useEffect(() => {
        let randomHour = heureAleatoire()
        setHeure(randomHour)
    }, []);

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
                <h2>{mainInfos.magasin.ticket}</h2>
                <p className='telNumberTicket'>{mainInfos.magasin.tel}</p>
                {mainInfos.magasin.horaires.map((option, index) => (
                    <p key={index}>{option}</p>
                ))}
            </section>
            <p className='wrapperP dateTicket'>{mainInfos?.date ? mainInfos.date + " à " + heureAleatoire() : <span>01/01/2000 à 01:01</span>}</p>
        </>
    )
}

export default HeaderTicket