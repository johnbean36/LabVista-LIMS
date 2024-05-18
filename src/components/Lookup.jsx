import { useEffect } from 'react';
import axios from 'axios';
import '../App.css';

function Lookup({ handleSubmit, handleChange, ids, setIds, viewSamples, testResult, setTestResult, handleChangeTests, setViewSamples, }) {
  useEffect(() => {
    const fetchData = async () => {
      const token = localStorage.getItem('token');
      const response = await axios.get("https://labvista-lims-back-5117b5a6c829.herokuapp.com/samples/sampleid", {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
      setIds(response.data);
    };
    fetchData();
  }, [setIds]);

  useEffect(()=>{
    const fetchData = ()=>{
      if(viewSamples.length){
        let vSamples = viewSamples;
        let Obj = {};
        vSamples.forEach((test)=>{
          if(test.result===null){
            Obj[test.name] = "";
          }
          else{
            Obj[test.name] = test.result;
          }
        })
        setTestResult(Obj);
      }      
 
    };
    fetchData()
  },[setViewSamples])

  if (ids.length) {
    return (
      <div>
        <div>
          <form onSubmit={(e) => handleSubmit(e, "lookup")}>
            <div className="ccode">
              <label htmlFor="lookup">Select a test to Lookup</label>
              <select onChange={(e) => handleChange(e, "lookup")} name="lookup" id="lookup">
                <option value="default">-Select a Test-</option>
                {ids.map((id) => (
                  <option key={id._id} value={id.sampleid}>{id.sampleid}</option>
                ))}
              </select>
            </div>
            <div>
              <button type="submit">Submit</button>
            </div>
          </form>
          <div>
            {viewSamples && (
              <div>
                {viewSamples.map((sample) => (
                  <div key={sample.sampleid._id}>
                    <form onSubmit={(e)=>(handleSubmit(e, "update"))}>
                    <div className="margin">Sample Id: {sample.sampleid.sampleid}</div>
                    <div>{sample.tests.map((test)=>(<div key={test._id}><div></div><div>{test.name}</div><input name={test.name} data-id={sample.sampleid.sampleid} onChange={handleChangeTests} value={testResult[test.name]} /><div></div></div>))}</div>
                    <button type="submit">Submit</button>
                    </form>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    );
  } else {
    return <div>loading</div>;
  }
}

export default Lookup;