import { useEffect } from 'react';
import axios from 'axios';
import '../App.css';
import Button from 'react-bootstrap/Button'
import 'bootstrap/dist/css/bootstrap.min.css';
import {Form, InputGroup} from 'react-bootstrap';
let response;

function DeleteSample({ids, setIds, handleSubmit, handleChange}){

    useEffect(() => {
        const fetchData = async () => {
            const token = localStorage.getItem('token');
            response = await axios.get("https://labvista-lims-back-5117b5a6c829.herokuapp.com/samples/sampleid", {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });
            setIds(response.data)
        };
        fetchData();
    }, []);
    if(ids.length){
    return (
        <div className="select">
            <Form onSubmit={(e) => handleSubmit(e, "delete")}>
                <div className="ccode">
                    <Form.Label htmlFor="delete">Select a test to Delete</Form.Label>
                    <Form.Select onChange={(e) => handleChange(e, "delete")} name="delete" id="delete">
                        <option value="default">-Select a Test-</option>
                        {ids.map((id) => <option key={id._id} value={id.sampleid}>{id.sampleid}</option>)}
                    </Form.Select>
                </div>
                <div>
                    <Button variant="primary" type="submit">Submit</Button>
                </div>
            </Form>
            <div>
            
            </div>
        </div>
    )
    }
    else{
        return (
            <div>
                Loading
            </div>
        )
    }
}

export default DeleteSample