import { useEffect } from 'react';
import axios from 'axios';
import '../App.css';

function Overdue({ handleSubmit, setTests, tests, handleChange, dueList }) {
    useEffect(() => {
        const fetchData = async () => {
            const token = localStorage.getItem('token');
            const response = await axios.get("https://labvista-lims-back-5117b5a6c829.herokuapp.com/samples/tests", {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });
            setTests(response.data);
        };
        fetchData();
    }, []);

    if (!tests.length) {
        return <div>Loading...</div>;
    }

    return (
        <div>
            <form onSubmit={(e) => handleSubmit(e, "overdue")}>
                <div className="ccode">
                    <label htmlFor="overdue">Commodity Code</label>
                    <select onChange={(e) => handleChange(e, "overdue")} name="overdue" id="overdue">
                        <option value="default">-Select a Commodity-</option>
                        {tests.map((test) => (
                            <option key={test._id} value={test.name}>{test.name}</option>
                        ))}
                    </select>
                </div>
                <div>
                    <button type="submit">Submit</button>
                </div>
            </form>
            <div className="">
            {dueList.length ? (
                <div className="margin">
                    {dueList.map((due) => (<div key={due}>Sample Id: {due}</div>))}</div>) : (<div></div>)}
            </div>
        </div>
    );
}

export default Overdue;