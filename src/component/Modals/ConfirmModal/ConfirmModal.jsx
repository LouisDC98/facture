import './ConfirmModal.css'
import '../modals.css'

function ConfirmModal(props) {
    const { closeModal, confirmAction } = props
    return (
        <div className='displayModal'>
            <div className='modalBg'>
                <button onClick={() => closeModal()} className='buttonIcon closeButton' />
                <div className='confirmModal'>
                    <p>Etes-vous sûr de continuer ?</p>
                    <div className='displayBtn'>
                    <button  className='secondaryBtn' onClick={() => closeModal()}>Annuler</button>
                    <button className='secondaryBtn' onClick={() => confirmAction()}>Continuer</button>

                    </div>
                </div>
            </div>
        </div>
    )
}

export default ConfirmModal