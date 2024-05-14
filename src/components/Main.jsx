function Main({user}){
    return (
        <div>
            <div><h1>Welcome to LabVista LIMS</h1></div>
            { user ? <div><h3>Please Signin or Signup</h3></div> : null }
        </div>
    )
}

export default Main;