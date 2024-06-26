import { useEffect } from 'react';
import axios from 'axios';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { Select, Space, Spin } from 'antd';
const { Option } =  Select;
import 'bootstrap/dist/css/bootstrap.min.css';
import {Form, Button} from 'react-bootstrap';
import '../App.css';
let tOptions;

function SampleLog({setCustData, setTests, setCommodity, tests, loginResponse, custData, commodity, error, handleSubmit, handleChange, startDate, setStartDate, selectedTests, setSelectedTests}){

    useEffect(()=>{
        const token = localStorage.getItem('token');
        const fetchData = async ()=> {
            const temp = await axios.get("https://labvista-lims-back-5117b5a6c829.herokuapp.com/samples/customer", {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });
            const temp1 = await axios.get("https://labvista-lims-back-5117b5a6c829.herokuapp.com/samples/commodity", {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });
            const temp2 = await axios.get("https://labvista-lims-back-5117b5a6c829.herokuapp.com/samples/tests", {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });
            
            setCustData(temp.data);
            setCommodity(temp1.data);
            setTests(temp2.data);
            const data = temp2.data
            tOptions = data.map((test)=>({
                label: test.name,
                value: test._id
            }));
            
        }
        fetchData();
    },[]);

    function iHandleChange(value){
        setSelectedTests(value);
    }
    if(commodity.length && custData.length && tOptions.length){

    
    return (
        <div>
            <div className="margin select"><h1>Register Samples</h1></div>
            <div className="margin">
            <Form onSubmit={(e)=>(handleSubmit(e, "samplelogin"))}>
                <div className="loginfields">
                    <div className="ccode">
                        <Form.Label htmlFor="ccode">Commodity Code</Form.Label>
                        <Form.Select onChange={(e)=>(handleChange(e, "ccode"))} name="ccode" id="ccode">
                        <option value="default">-Select a Commodity-</option>
                        {commodity.map((comm)=> (<option key={comm._id} text={comm.desc} value={comm.code}>{comm.code}-{comm.desc}</option>))}
                        </Form.Select>
                    </div>
                    <div className="ccode">
                        <Form.Label htmlFor="dateselect">Select a Login Date</Form.Label>
                        <DatePicker selected={startDate} id="dateselect" onChange={(date)=> setStartDate(date)} placeholderText="Select a date" dateFormat="yyyy-MM-dd" className="form-control" autoComplete="off" />
                    </div>
                    <div className="ccode">
                        <Form.Label htmlFor="custcode">Customer Code</Form.Label>
                        <Form.Select onChange={(e)=>(handleChange(e, "custcode"))} name="custcode" id="custcode">
                            <option value="default">--Select a Customer Code</option>
                            {custData.map((cust)=> (<option key={cust._id} value={cust.code}>{cust.code}</option>))}
                        </Form.Select>
                    </div>
                    <div className="margin-select">
                        <Select
                            mode="multiple"
                            allowClear
                            style={{ width: '100%', minWidth: '300px', maxWidth: '300px'}}
                            placeholder="Please select"
                            defaultValue={[]}
                            options={tOptions}
                            value={selectedTests}
                            onChange={iHandleChange}
                            />
                    </div>
                </div>
                <div>
                <Button type="submit">Submit</Button>
                </div>
            </Form>
            </div>
            <div>
                <div>{loginResponse.length ? (<div>{loginResponse.map((sample)=>(<div key={sample.sampleid._id}>Sample id(s) logged in: {sample.sampleid.sampleid}</div>))}</div>): (<div></div>)}</div>
            </div>
        </div>
    )
}
else{
    return (
        <div>
            loading
        </div>
    )
}
}

export default SampleLog;