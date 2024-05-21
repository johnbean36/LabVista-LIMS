import { useEffect, useRef } from 'react';
import axios from 'axios';
import '../App.css';
import Error from "./Error"
import Button from 'react-bootstrap/Button'
import 'bootstrap/dist/css/bootstrap.min.css';
import {Form, InputGroup} from 'react-bootstrap';

function Lookup({ handleSubmit, handleChange, ids, setIds, viewSamples, testResult, setTestResult, handleChangeTests, setViewSamples, error}) {
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
      let Obj = {};
      let vSamples = viewSamples;
      const testR = testResult;
      Obj = {
        ...testR
      }
      vSamples.forEach((sample)=>{
      const tests = sample.tests;
        tests.forEach((test)=>{
          const name = test.name;
          const result = test.result;
          const sampleid = sample.sampleid.sampleid;
          const testR = testResult
          Obj = {
            ...Obj, [sampleid]:{
              ...Obj[sampleid],
              [name]: result
            }
          }
        })
        setTestResult(Obj);
      })

    };
    fetchData()
  },[viewSamples])

  if (ids.length) {
    return (
      <div>
        <div className="select">
          <Form className="margin" onSubmit={(e) => handleSubmit(e, "lookup")}>
            <div className="ccode">
              <Form.Label className="formlabel" htmlFor="lookup">Select a test to Lookup</Form.Label>
              <Form.Select onChange={(e) => handleChange(e, "lookup")} name="lookup" id="lookup">
                <option value="default">-Select a Test-</option>
                {ids.map((id) => (
                  <option key={id._id} value={id.sampleid}>{id.sampleid}</option>
                ))}
              </Form.Select>
            </div>
            <div>
              <Button variant="primary" type="submit">Submit</Button>
            </div>
          </Form>
        <div>
          {
            viewSamples.length > 0 && (
              <div>
                {viewSamples.map((sample) => (
                  <div key={sample.sampleid._id}>
                    <Form onSubmit={(e) => handleSubmit(e, "update")}>
                      <div className="margin">Sample Id: {sample.sampleid.sampleid}</div>
                      <div>
                        {sample.tests.map((test) => (
                          <div key={test._id} className="tests">
                            <div>{test.name}</div>
                            <InputGroup>
                            <Form.Control
                              name={test.name}
                              data-id={sample.sampleid.sampleid}
                              onChange={handleChangeTests}
                              value={testResult[sample.sampleid.sampleid]?.[test.name] || ''}
                            />
                            
                            </InputGroup>
                          </div>
                        ))}
                      </div>
                      <div className="margin">
                        <Button variant="primary" type="submit">Submit</Button>
                      </div>
                    </Form>
                  </div>
                ))}
              </div>
            )
          }
          </div>
          <div className="margin">
                <Error error={error} />
          </div>
        </div>
      </div>
    )
  } else {
    return <div>loading</div>;
  }
}

export default Lookup;