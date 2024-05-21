import 'bootstrap/dist/css/bootstrap.min.css';
import {Form, Button} from 'react-bootstrap';

function Signin({userEmail, handleChange, password, handleSubmit, error}){
    return (
        <div>
            <div>
                <Form onSubmit={(e)=>(handleSubmit(e, "signin"))} >
                    <Form.Group>
                        <div><Form.Label htmlFor="email">Enter your email: </Form.Label></div>
                        <div><Form.Control type="email" id="email" value={userEmail} onChange={(e)=>(handleChange(e, "email"))} /></div>
                    </Form.Group>
                    <Form.Group>
                        <div><Form.Label htmlFor="password">Enter a password: </Form.Label></div>
                        <div><Form.Control type="password" id="password" value={password} onChange={(e)=>(handleChange(e, "password"))} /></div>
                    </Form.Group>
                    <Form.Group>
                        <Button type="submit">Submit</Button>
                    </Form.Group>
                </Form>
            </div>
            <div>
                {error ? (<Error error={error} />) : (null)}
            </div>
        </div>
    )
}

export default Signin;