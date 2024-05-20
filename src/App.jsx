import { useState, useEffect } from 'react';
import './App.css';
import Nav from './components/Nav';
import Main from './components/Main';
import Signin from './components/Signin';
import Signup from './components/Signup';
import SampleLog from './components/Samplelog';
import Overdue from './components/Overdue';
import Delete from './components/Delete';
import Lookup from './components/Lookup';
import { Routes, Route, useNavigate } from 'react-router-dom';
import axios from 'axios';

function App() {
  const [user, setUser] = useState(null)
  const [userName, setUserName] = useState("");
  const [userEmail, setUserEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const [error, setError] = useState("");
  const [custData, setCustData] = useState({});
  const [commodity, setCommodity] = useState([]);
  const [tests, setTests] = useState({});
  const [comSelected, setcomSelected] = useState("");
  const [cusSelected, setcusSelected] = useState('');
  const [startDate, setStartDate] = useState(null);
  const [overDue, setOverDue] = useState("")
  const [dueList, setDueList] = useState([]);
  const [selectedTests, setSelectedTests] = useState([]);
  const [ids, setIds] = useState([])
  const [idSelect, setidSelect] = useState(0)
  const [loginResponse, setLoginResponse] = useState({});
  const [viewSamples, setViewSamples] = useState([]);
  const [testResult, setTestResult] = useState({});
  const [lookupResult, setLookupResult] = useState("")
  const [data, setData] = useState(false)

  const navigate = useNavigate();
  useEffect(() => {
    if (!user) {
        navigate('/home');
    }
}, [user]);

  function handleChangeTests(e){
    const sampleid = e.target.dataset.id;
    const name = e.target.name;
    const value = e.target.value;
    setTestResult((currentState)=>({
      ...currentState, [sampleid]:{
        ...currentState[sampleid],
        [name]: value
      }
    }));  }

  //handlesChanges
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
    else if(input==="update"){

    }
    else if(input==="overdue"){
      setOverDue(e.target.value);
    }
    else if(input==="confirm"){
      setConfirm(e.target.value);
    }
    else if(input==="ccode"){
      setcomSelected(e.target.value);
    }
    else if(input==="custcode"){
      setcusSelected(e.target.value);
    }
    else if(input==="delete"){
      setidSelect(e.target.value);
    }
    else if(input==="lookup"){
      setidSelect(e.target.value);
    }
    else if(input==="update"){
      setLookupResult(e.target.value);
    }
  }

  //Handles Submit requests
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
        response = await axios.post("https://labvista-lims-back-5117b5a6c829.herokuapp.com/signin", object)
        const { user, token } = response.data;
        setUser(user);
        localStorage.setItem('token', token);
      }catch(err){
        console.log(err);
        if(response && response.status === 401 || response.status === 404){
          setError("Error logging in")
        }
      }
      if(response.status===200){
        navigate('home');
      }
    }
    else if(input==="samplelogin"){
      let sampleData = [{
        cust: cusSelected,
        commodity: comSelected,
        date: startDate,
        tests: selectedTests
      }]
      let response;
      try{
        const token = localStorage.getItem('token');
        response = await axios.post("https://labvista-lims-back-5117b5a6c829.herokuapp.com/samples/register", {sampleData}, {
          headers: {
              'Authorization': `Bearer ${token}`
          }
      });
      setLoginResponse(response.data)
      }catch(err){
        console.log(err);
      }
    }
    else if(input==="overdue"){
      let response;
      try{
        let data = {
          testName: overDue
        }
        const token = localStorage.getItem('token');
        response = await axios.post("https://labvista-lims-back-5117b5a6c829.herokuapp.com/samples/overduelist", data, {
          headers: {
              'Authorization': `Bearer ${token}`
          }
      });
      setDueList(response.data);
      }catch(err){
        console.log(err);
      }
    }
    else if(input==="delete"){
      try{
        let data = [{
          sampleid: idSelect
        }]
        const token = localStorage.getItem('token');
        response = await axios.post("https://labvista-lims-back-5117b5a6c829.herokuapp.com/samples/deletesamples", data, {
          headers: {
              'Authorization': `Bearer ${token}`
          }
      });
      if(response.status===200){
        navigate('home');
      }
    }catch(err){
      console.log(err);
    }
  }
  else if(input==="lookup"){
    try{
      let data = [{
        sampleid: idSelect
      }]
      const token = localStorage.getItem('token');
      response = await axios.post("https://labvista-lims-back-5117b5a6c829.herokuapp.com/samples/viewsamples", data, {
        headers: {
            'Authorization': `Bearer ${token}`
        }})
      if(response.data){
        setViewSamples(response.data);
      }

    }catch(err){
      console.log(err);
    }
  }
  else if(input==="update"){
    const token = localStorage.getItem('token');
    response = await axios.post("https://labvista-lims-back-5117b5a6c829.herokuapp.com/samples/updatesamples", testResult, {
      headers: {
          'Authorization': `Bearer ${token}`
      }})
  }
  if(response.status===200){
    setError("Sample updated")
  }
  else{
    setError("Problem submitting sample")
  }
}

  return (
    <div className="body">
      <header className="nav">
        <Nav user={user} />
      </header>
      <main>
        <Routes>
          <Route path='/samplelogin' element={ <SampleLog 
                                          setCustData={setCustData}
                                          setTests={setTests}
                                          setCommodity={setCommodity}
                                          commodity={commodity}
                                          tests={tests}
                                          custData={custData}
                                          handleSubmit={handleSubmit}
                                          handleChange={handleChange}
                                          error={error}
                                          startDate={startDate}
                                          setStartDate={setStartDate}
                                          setSelectedTests={setSelectedTests}
                                          selectedTests={selectedTests}
                                          loginResponse={loginResponse}
                                          />} />
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
          <Route path='/overdue' element={ <Overdue 
                                          handleSubmit={handleSubmit}
                                          overDue={overDue}
                                          setOverDue={setOverDue}
                                          setTests={setTests}
                                          tests={tests}
                                          handleChange={handleChange}
                                          dueList={dueList}
                                            />} />
          <Route path='/delete' element={ <Delete
                                          handleSubmit={handleSubmit}
                                          handleChange={handleChange}
                                          ids={ids}
                                          setIds={setIds}
                                        />} />
          <Route path='/lookup' element={ <Lookup
                                          handleSubmit={handleSubmit}
                                          handleChange={handleChange}
                                          ids={ids}
                                          setIds={setIds}
                                          viewSamples={viewSamples}
                                          testResult={testResult}
                                          handleChangeTests={handleChangeTests}
                                          setLookupResult={setLookupResult}
                                          setViewSamples={setViewSamples}
                                          setTestResult={setTestResult}
          /> } />
          <Route path='/home' element={<Main user={user}/>} />                                  
        </Routes>
      </main>
    </div>
  );

}
export default App;