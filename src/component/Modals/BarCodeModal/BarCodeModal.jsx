import React from 'react'
import "./BarCodemodal.css"
import Barcode from 'react-barcode';

function BarCodeModal(props) {
    let { closeModal, articles } = props

    return (
        <div className='displayModal'>
            <div className='modalBg modalBgMobile'>
                <button onClick={() => closeModal()} className='buttonIcon closeButton' />
                <div className='modalBgBarCode'>
                    {articles.map((article, index) => (
                        (!article.random || article.random === false) && (
                            <div key={index} className='centerP'>
                                <p>{article.libelle}</p>
                                <Barcode value={article.code} className="codeBarsize" />
                            </div>
                        )
                    ))}
                </div>
            </div>
        </div>
    )
}

export default BarCodeModal