import './NavBar.css'

function NavBar() {
    return (
        <div className='navBar'>
            <button className='navBtn'>Article randoms</button>
            <button className='navBtn'>Article essentiels</button>
            <button className='navBtn'>Profils</button>
            <button className='navBtn'>Magasins</button>
        </div>
    )
}

export default NavBar