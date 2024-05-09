import React from 'react'
import "./HeaderFacture.css"

function HeaderFacture(props) {
    let { mainInfos } = props
    return (
        <>
            <section className='displayMainInfoFacture'>
                <div>
                    <p className='wrapperP'>{mainInfos?.magasin?.primary || <span>CARREFOUR TOULOUSE PURPAN 36 RTE DE BAYONNE</span>}</p>
                    <p className='wrapperP'>{mainInfos?.magasin?.secondary || <span>PURPAN 31000 TOULOUSE</span>}</p><br />

                    <p className='size11'>Une question sur votre facture ?</p>
                    <p>www.carrefour.fr/nous-contacter</p>
                    <p>Horaires : lun. au sam. de 8h - 22h</p> <br />

                    <p className='wrapperP'>N° de commande {mainInfos?.commandNumber || <span>9999999999999</span>}</p>
                    <p className='wrapperP'>Identifiant client {mainInfos?.clientID || <span>9999999</span>}</p>
                    <p className='wrapperP'>N° de facture {mainInfos?.factureNumber || <span>WEB-999999-99999999</span>}</p><br />

                    <p className='wrapperP'>Merci pour votre commande Carrefour Drive du {mainInfos?.date || <span>01/01/2000</span>}</p><br /><br /><br /><br />
                </div>
                <div className='adressInfo'>
                    <p >Adresse de facturation</p>
                    <p className='marginLeft wrapperP'>{mainInfos?.lastName && mainInfos?.firstName ? `${mainInfos.lastName} ${mainInfos.firstName}` : <span>Maxime DUPONT</span>}</p>
                    <p className='marginLeft wrapperP'>{mainInfos?.adresse ? mainInfos.adresse : <span>11 avenue des Champs Elysées</span>}</p>
                    <p className='marginLeft wrapperP'>{mainInfos?.codePostal && mainInfos?.city ? `${mainInfos.codePostal} ${mainInfos.city}` : <span>99 999 Paris</span>}</p>
                    <p className='marginLeft wrapperP'>{mainInfos?.country ? mainInfos.country : <span>France</span>}</p><br />
                </div>
            </section>
            <section className='dateRow'>
                <div>
                    <p className='italic'>Date de commande</p>
                    <p className='wrapperP marginLeft'>{mainInfos?.date || <span>01/01/2000</span>}</p>
                </div>
                <div>
                    <p className='italic'>Date de Facturation</p>
                    <p className='wrapperP marginLeft'>{mainInfos?.dateFacturation || <span>01/01/2000</span>}</p>
                </div>
                <div className='marginEnd'>
                    <p className='italic'>Date de livraison</p>
                    <p className='wrapperP marginLeft'>{mainInfos?.dateFacturation || <span>01/01/2000</span>}</p>
                </div>
            </section>
        </>
    )
}

export default HeaderFacture