function Main({user}){
    return (
        <div>
            <div><h1>Welcome to LabVista LIMS</h1></div>
            { user ? <div></div> : <h3>Please Signin or Signup</h3> }
        </div>
    )
}

export default Main;