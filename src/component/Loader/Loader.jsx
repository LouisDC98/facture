import MovingImage from '../MovingImage/MovingImage'
import './Loader.css'

function Loader() {
    return (
        <div className='displayModalLoader'>
            {/* <div className="modal"> */}
                {/* <div className="loader"></div> */}
                <MovingImage />
            {/* </div> */}
        </div>
    )
}

export default Loader