function Signup({setUserName, setUserEmail, setPassword, userName, handleSubmit, handleChange, userEmail, password, confirm, onSubmit}){
    return (
        <div>
            <h1>Sign Up</h1>
            <div>
                <form>
                    <div>
                        <div><label for="name">Enter your name: </label></div>
                        <div><input onChange={(e)=>(handleChange(e, "name"))} id="name" value={userName} /></div>
                    </div>
                    <div>
                        <div><label for="email">Enter your email: </label></div>
                        <div><input id="email" value={userEmail} onChange={(e)=>(handleChange(e, "email"))} /></div>
                    </div>
                    <div>
                        <div><label for="password">Enter a password: </label></div>
                        <div><input id="password" value={password} onChange={(e)=>(handleChange(e, "password"))} /></div>
                    </div>
                    <div>
                        <div><label for="confirm">Confirm your password: </label></div>
                        <div><input id="confirm" value={confirm} onChange={(e)=>(handleChange(e, "confirm"))} /></div>
                    </div>
                    <div>
                        <button type="submit">Submit</button>
                    </div>
                </form>
            </div>
        </div>
    )   
}

export default Signup;