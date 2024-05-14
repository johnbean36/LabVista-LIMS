import { useState } from 'react';
import './App.css';
import Nav from './components/Nav';
import Main from './components/Main';
import Signin from './components/Signin'
import Signup from './components/Signup'
import { Routes, Route, useNavigate } from 'react-router-dom';
import axios from 'axios';

function App() {
  const [user, setUser] = useState(null)
  const [userName, setUserName] = useState("");
  const [userEmail, setUserEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  function handleChange(e, input){
    if(input === "name"){
      setUserName(e.target.value);
    }
    else if(input==="email"){
      setUserEmail(e.target.value);
    }
    else if(input==="password"){
      setPassword(e.target.value);
    }
    else if(input==="confirm"){
      setConfirm(e.target.value);
    }
  }

  async function handleSubmit(e, input){
    e.preventDefault();
    let response;

    if(input==="signup"){
      const object = {
        name: userName,
        email: userEmail,
        password: password
      }
      try{
        if(password===confirm){
          response = await axios.post("https://labvista-lims-back-5117b5a6c829.herokuapp.com/signup", object);
        }
        else{
          setError("Password did not match");
          return;
        }
        if(response.status===201){
          navigate('home');
        }
      }catch(err){
        console.log(err)
        if(err.response && err.response.status === 400){
          setError("A user with that email has already been registered");
        }
        else{
          setError(err.response);
        }
      }
    }
    else if(input==="signin"){
      const object = {
        email: userEmail,
        password: password
      }
      try{
        const response = await axios.post("https://labvista-lims-back-5117b5a6c829.herokuapp.com/signin", object)
        const { user, token } = response.data;
        setUser(user);
        console.log(user)
        localStorage.setItem('token', token);
      }catch(err){
        console.log(err);
        if(err.response && err.response.status === 401 || err.response.status === 404){
          setError("Error logging in")
        }
      }
      if(user){
        navigate('home');
      }
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
                                          handleChange={handleChange}
                                          error={error} /> } />
          <Route path='/signin' element={ <Signin 
                                          setUserEmail={setUserEmail}
                                          setPassword={setPassword}
                                          userEmail={userEmail}
                                          password={password}
                                          handleSubmit={handleSubmit}
                                          handleChange={handleChange}
                                          error={error}
                                          />} />
          <Route path='/home' element={<Main user={user}/>} />                                  
        </Routes>
      </main>
    </div>
  )
}

export default App
