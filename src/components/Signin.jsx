function Signin({handleSubmit, userEmail, handleChange, password, handleSubmit}){
    return (
        <div>
            <div>
                <form onSubmit={(e)=>(handleSubmit(e))} >
                    <div>
                        <div><label for="email">Enter your email: </label></div>
                        <div><input id="email" value={userEmail} onChange={(e)=>(handleChange(e, "email"))} /></div>
                    </div>
                    <div>
                        <div><label for="password">Enter a password: </label></div>
                        <div><input id="password" value={password} onChange={(e)=>(handleChange(e, "password"))} /></div>
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

export default Signin;