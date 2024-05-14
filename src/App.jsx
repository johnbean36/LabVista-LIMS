import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import Nav from '../components/Nav'
import { Routes, Route } from 'react-router-dom'

function App() {
  const [user, setUser] = useState(null)
  const [userName, setUserName] = useState(null);
  const [userEmail, setUserEmail] = useState(null);
  const [password, setPassword] = useState(null);
  const [confirm, setConfirm] = useState(null);

  function handleSubmit(e){
    
  }

  function handleChange(e, input){
    if(input === "name"){
      setUserName(e);
    }
    else if(input==="email"){
      setUserEmail(e);
    }
    else if(input==="password"){
      setPassword(e);
    }
    else if(input==="confirm"){
      setConfirm(e);
    }
  }

  function handleSubmit(e, input){
    e.preventDefault();
    if(input==="signup"){

    }
    else if(input==="signin"){

    }
  }

  return (
    <div>
      <header>
        <Nav user={user} />
      </header>
      <main>
        <Routes>
          <Route path='/signup' element={ <Signup 
                                          setUserName={setUserName}
                                          setUserEmail={setUserEmail} 
                                          setPassword={setPassword}
                                          userName={userName}
                                          userEmail={userEmail}
                                          password={password}
                                          confirm={confirm}
                                          handleSubmit={handleSubmit}
                                          handleChange={handleChange} /> } />
          <Route path='/signin' element={ <Signin 
                                          setUserEmail={setUserEmail}
                                          setPassword={setPassword}
                                          userEmail={userEmail}
                                          password={password}
                                          handleSubmit={handleSubmit}
                                          handleChange={handleChange}
                                          />} />                                          
        </Routes>
      </main>
    </div>
  )
}

export default App
