import React from 'react'

function TrollModal(props) {
    let { closeModal, gif } = props

    return (
        <div className='displayModal' style={{ zIndex: 100 }}>
            <div className='modalBg'>
                <button onClick={() => closeModal()} className='buttonIcon closeButton' style={{ zIndex: 1000 }}/>
                <div className='centerP'>
                    <img src={gif} alt="GIF" />
                </div>
            </div>
        </div>
    )
}

export default TrollModal