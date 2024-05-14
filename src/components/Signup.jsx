import Error from './Error'

function Signup({userName, handleChange, userEmail, password, confirm, handleSubmit, error}){
    return (
        <div>
            <h1>Sign Up</h1>
            <div>
                <form onSubmit={(e)=>(handleSubmit(e, "signup"))} >
                    <div>
                        <div><label htmlFor="name">Enter your name: </label></div>
                        <div><input onChange={(e)=>(handleChange(e, "name"))} id="name" value={userName} /></div>
                    </div>
                    <div>
                        <div><label htmlFor="email">Enter your email: </label></div>
                        <div><input id="email" value={userEmail} onChange={(e)=>(handleChange(e, "email"))} /></div>
                    </div>
                    <div>
                        <div><label htmlFor="password">Enter a password: </label></div>
                        <div><input type="password" id="password" value={password} onChange={(e)=>(handleChange(e, "password"))} /></div>
                    </div>
                    <div>
                        <div><label htmlFor="confirm">Confirm your password: </label></div>
                        <div><input type="password" id="confirm" value={confirm} onChange={(e)=>(handleChange(e, "confirm"))} /></div>
                    </div>
                    <div>
                        <button type="submit">Submit</button>
                    </div>
                    <div>
                        {error ? (<Error error={error} />) : (null)}
                    </div>
                </form>
            </div>
        </div>
    )   
}

export default Signup;