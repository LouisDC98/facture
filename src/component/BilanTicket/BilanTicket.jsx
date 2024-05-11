import React from 'react'
import "./BilanTicket.css"

function BilanTicket() {
    return (
        <section className='bilanTicket'>
            <div className='ticketGridBilan'>
                <p className='ticketAvRemise'>Total avant remises</p>
                <p className='ticketAvRemise secondColumn'>37.00€</p>

                <p>Total Remises immédiates remises</p>
                <p className='secondColumn colorRemise'>-6.03€</p>

                <p className='ticketTotalPrix'>Total à payer</p>
                <p className='ticketTotalPrix secondColumn'>30.97€</p>

                <p className='ticketAvRemise'>Payé par</p>
                <div></div>
                <p className=''>Cagnote fidélité utilisée..........................................</p>
                <p className='secondColumn colorRemise'>....................................................................-30.97€</p>
            </div>

            <div className='ticketGridBilan'>
                <p className='ticketAvRemise'>Total avant remises</p>
                <p className='ticketAvRemise secondColumn'>37.00€</p>

                <p>Total Remises immédiates remises</p>
                <p className='secondColumn colorRemise'>-6.03€</p>

                <p className='ticketTotalPrix'>Total à payer</p>
                <p className='ticketTotalPrix secondColumn'>30.97€</p>

                <p className='ticketAvRemise'>Payé par</p>
                <div></div>
                <p className=''>Cagnote fidélité utilisée..........................................</p>
                <p className='secondColumn colorRemise'>....................................................................-30.97€</p>
            </div>
        </section>
    )
}

export default BilanTicket