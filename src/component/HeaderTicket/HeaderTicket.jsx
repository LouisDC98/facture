import React, { useEffect} from 'react'
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
                <h2>TOULOUSE PURPAN</h2>
                <p className='telNumberTicket'>Tél: 05 34 26 58 79</p>
                <p>Lun. au Jeu.: 08:30 à 21:30</p>
                <p>Ven.: 08:30 à 22:00</p>
                <p>Sam.: 08:30 à 21:00</p>
                <p>Dim.: Fermé</p>
            </section>
            <p className='wrapperP dateTicket'>{mainInfos?.date ? mainInfos.date + " à " + heureAleatoire() : <span>01/01/2000 à 01:01</span>}</p>
        </>
    )
}

export default HeaderTicket