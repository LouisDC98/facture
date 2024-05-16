import React from 'react'
import "./BilanTicket.css"

function BilanTicket(props) {
    let { totaux, tvaArray } = props

    return (
        <section className='bilanTicket'>
            <div className='ticketGridBilan'>
                <p className='ticketAvRemise'>Total avant remises</p>
                <p className='ticketAvRemise secondColumn'>{(totaux.totalPanier - 0.7).toFixed(2)}€</p>

                <p>Total Remises immédiates remises</p>
                <p className='secondColumn colorRemise'>-{totaux.totalRemises}€</p>

                <p className='ticketTotalPrix'>Total à payer</p>
                <p className='ticketTotalPrix secondColumn'>{(totaux.totalPanier - 0.7 - totaux.totalRemises).toFixed(2)}€</p>

                <p className='ticketAvRemise'>Payé par</p>
                <div></div>
                <p>Carte bancaire utilisée</p>
                <p className='secondColumn colorRemise'>-{(totaux.totalPanier - 0.7 - totaux.totalRemises).toFixed(2)}€</p>
            </div>

            <div className='ticketGridTVA'>
                <p className='ticketAvRemise'>Taux TVA</p>
                <p className='ticketAvRemise secondColumn'>Total produits</p>
                <p className='ticketAvRemise secondColumn'>dont TVA</p>

                {tvaArray.prix5 !== 0 && <p>5.5%</p>}
                {tvaArray.prix5 !== 0 && <p className='secondColumn'>{(tvaArray.prix5 + tvaArray.tva5).toFixed(2)}€</p>}
                {tvaArray.prix5 !== 0 && <p className='secondColumn'>{tvaArray.tva5}€</p>}

                {tvaArray.prix10 !== 0 && <p>10.0%</p>}
                {tvaArray.prix10 !== 0 && <p className='secondColumn'>{(tvaArray.prix10 + tvaArray.tva10).toFixed(2)}€</p>}
                {tvaArray.prix10 !== 0 && <p className='secondColumn'>{tvaArray.tva10}€</p>}

                {tvaArray.prix20 !== 0 && <p>20.0%</p>}
                {tvaArray.prix20 !== 0 && <p className='secondColumn'>{(tvaArray.prix20 + tvaArray.tva20).toFixed(2)}€</p>}
                {tvaArray.prix20 !== 0 && <p className='secondColumn'>{tvaArray.tva20}€</p>}


                <p className='ticketAvRemise dashedBorder'>Total TVA</p>
                <p className='ticketAvRemise secondColumn dashedBorder'>{(tvaArray.totalPrix - 0.7 + tvaArray.totalTVA).toFixed(2)}€</p>
                <p className='ticketAvRemise secondColumn dashedBorder'>{tvaArray.totalTVA}€</p>
            </div>

            {/* <p className='ticketTotalPrix'>Détails de vos avantages fidélité</p> */}
        </section>
    )
}

export default BilanTicket