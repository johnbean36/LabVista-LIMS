import { NavLink } from 'react-router-dom'
import '../App.css'

function Nav({ user }){
    return (
        <div className="navbar">
            {user ? (<div className="navstyle"><div className="log"><NavLink to="/samplelogin">Sample Login</NavLink></div><div className="log"><NavLink to="/lookup">Lookup Samples</NavLink></div><div className="log"><NavLink to="/overdue">Overdue List</NavLink></div><div className="log"><NavLink to="/validate">Validate Samples</NavLink></div><div className="log"><NavLink to="/reports">Reports</NavLink></div></div>) : (<div className="navstyle"><div className="log"><NavLink to="/signup">Signup</NavLink></div><div className="log"><NavLink to="/signin">Login</NavLink></div></div>)}
        </div>
    )
}

export default Nav;