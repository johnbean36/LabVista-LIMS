function Signup({setUserName, setUserEmail, setPassword, userName, handleSubmit, handleChange, userEmail}){
    return (
        <div>
            <h1>Sign Up</h1>
            <div>
                <div>
                    <div><label for="name">Enter your name: </label></div>
                    <div><input onChange={(e)=>(handleChange(e, "name"))} id="name" value={userName} /></div>
                </div>
                <div>
                    <div><label for="email">Enter your email: </label></div>
                    <div><input id="email" value={userEmail} onChange={(e)=>(handleChange(e, "email"))}/></div>
                </div>
                <div></div>
                <div></div>
            </div>
        </div>
    )   
}

export default Signup;