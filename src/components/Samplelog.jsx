import { useEffect } from 'react';
import axios from 'axios';

function SampleLog({setCustData, setTests, setCommodity, tests, custData, commodity, error}){
    
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

            setCustData(temp.data);
            console.log(temp1);


        }
        fetchData();
    },[]);

    return (
        <div>
        </div>
    )
}

export default SampleLog;