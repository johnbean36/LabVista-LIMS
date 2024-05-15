import { useEffect } from 'react';

function SampleLog({setCustData, setTests, setCommodity, tests, custData, commodity, error}){
    
    useEffect(()=>{
        async ()=> {
            const temp = await axios.get("https://labvista-lims-back-5117b5a6c829.herokuapp.com");
        }
    },[]);

    return (
        <div>
        </div>
    )
}

export default Samplelog;