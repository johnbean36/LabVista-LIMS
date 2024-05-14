import { NavLink } from 'react-router-dom'

function Nav({ user }){
    return (
        <div>
            {user ? (<div></div>) : (<><div><NavLink to="/signup">Signup</NavLink></div><div><NavLink to="/login">Login</NavLink></div></>)}
        </div>
    )
}

export default Nav;