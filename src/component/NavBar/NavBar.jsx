import './NavBar.css'

import dashboard from '../../assets/dashboardIcon.svg'
import essentials from '../../assets/essentialsIcon.svg'
import randomArticles from '../../assets/randomsIcon.svg'
import profiles from '../../assets/profilesIcon.svg'
import stores from '../../assets/storesIcon.svg'

function NavBar(props) {
    let { type, setType } = props

    const getButtonClass = (value) => {
        return `navBtn ${type === value ? 'active' : ''}`
    }

    return (
        <div className='navBar'>
            <div className='navBarHeader'>
                <h3>Gestion des données</h3>
            </div>
            <button className={getButtonClass("dashboard")} onClick={() => setType("dashboard")}><img alt='dashboard_icon' src={dashboard} />Dashboard</button>
            <button className={getButtonClass("essential")} onClick={() => setType("essential")}><img alt='eseentials_icon' src={essentials} />Articles essentiels</button>
            <button className={getButtonClass("random")} onClick={() => setType("random")}><img alt='randoms_icon' src={randomArticles} />Articles randoms</button>
            <button className={getButtonClass("profile")} onClick={() => setType("profile")}><img alt='profile_icon' src={profiles} />Profils</button>
            <button className={getButtonClass("store")} onClick={() => setType("store")}><img alt='stores_icon' src={stores} />Magasins</button>
        </div>
    )
}

export default NavBar