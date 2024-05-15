import { useEffect } from 'react';
import axios from 'axios';

function SampleLog({setCustData, setTests, setCommodity, tests, custData, commodity, error, handleSubmit, handleChange}){
    
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
            console.log(temp1)
        }
        fetchData();
    },[]);
    if(commodity.length){

    
    return (
        <div>
            <form onSubmit={(e)=>(handleSubmit(e, "samplelogin"))}>
                <div>
                    <div className="ccode">
                        <label htmlFor="ccode">Commodity Code</label>
                        <select onChange={(e)=>(handleChange(e, "ccode"))} name="ccode" id="ccode">
                        <option value="default">-Select a Commodity-</option>
                        {commodity.map((comm)=> (<option key={comm._id} text={comm.desc} value={comm.code}>{comm.code}-{comm.desc}</option>))}
                        </select>
                    </div>
                    <div className="cdesc">
                        <label htmlFor="cdesc">Commodity Description</label>
                    </div>
                </div>
                <div>

                </div>
            </form>
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