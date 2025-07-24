import './NavBar.css'

function NavBar(props) {
    let { type, setType } = props

      const getButtonClass = (value) => {
        return `navBtn ${type === value ? 'active' : ''}`
    }

    return (
        <div className='navBar'>
            <button className={getButtonClass("essential")} onClick={() => setType("essential")}>Article essentiels</button>
            <button className={getButtonClass("random")} onClick={() => setType("random")}>Article randoms</button>
            <button className={getButtonClass("profile")} onClick={() => setType("profile")}>Profils</button>
            <button className={getButtonClass("store")} onClick={() => setType("store")}>Magasins</button>
        </div>
    )
}

export default NavBar