import { useEffect } from 'react';
import axios from 'axios';
import '../App.css';
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
        <div>
            <form onSubmit={(e) => handleSubmit(e, "delete")}>
                <div className="ccode">
                    <label htmlFor="delete">Select a test to Delete</label>
                    <select onChange={(e) => handleChange(e, "delete")} name="delete" id="delete">
                        <option value="default">-Select a Test-</option>
                        {ids.map((id) => <option key={id._id} value={id.sampleid}>{id.sampleid}</option>)}
                    </select>
                </div>
                <div>
                    <button type="submit">Submit</button>
                </div>
            </form>
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