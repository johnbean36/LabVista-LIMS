import { useState } from 'react';
import reactLogo from './assets/react.svg';
import viteLogo from '/vite.svg';
import './App.css';
import Nav from '../components/Nav';
import Main from '../components/Main';
import Signin from '../components/Signin'
import { Routes, Route } from 'react-router-dom';
import axios from 'axios';

function App() {
  const [user, setUser] = useState(null)
  const [userName, setUserName] = useState(null);
  const [userEmail, setUserEmail] = useState(null);
  const [password, setPassword] = useState(null);
  const [confirm, setConfirm] = useState(null);
  const [error, setError] = useState(null);

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

  async function handleSubmit(e, input){
    e.preventDefault();
    if(input==="signup"){
      const object = {
        name: userName,
        email: userEmail,
        password: password
      }
      try{
        if(password===confirm){
          await axios.post("https://labvista-lims-back-5117b5a6c829.herokuapp.com/signup", object);
        }
        else{
          setError("Password did not match");
          return;
        }

        if(response.status===201){
          Navigate('/home')
        }
      }catch(err){
        console.log(err)
        if(err.response && err.response.status === 400){
          setError("A user with that email has already been registered");
        }
        else{
          setError("An error has occurred");
        }
      }
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
          <Route path='/home' element={<Main user={user}/>} />                                  
        </Routes>
      </main>
    </div>
  )
}

export default App
