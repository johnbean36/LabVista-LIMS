import { useEffect } from 'react';
import axios from 'axios';
import '../App.css';

function Lookup({ handleSubmit, handleChange, ids, setIds, viewSamples }) {
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
            {viewSamples.length ? (
              <div>
                {viewSamples.map((sample) => (
                  <div key={sample.sampleid._id}>
                    <form>
                    <div>Sample Id: {sample.sampleid.sampleid}</div>
                    <div></div>
                    </form>
                  </div>
                ))}
              </div>
            ) : (
              <div>No samples available</div>
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