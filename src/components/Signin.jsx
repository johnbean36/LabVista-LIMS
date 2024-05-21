import 'bootstrap/dist/css/bootstrap.min.css';
import {Form, Button, Row, Col} from 'react-bootstrap';

function Signin({userEmail, handleChange, password, handleSubmit, error}){
    return (
        <div>
            <div className="margin select">
                <Form onSubmit={(e)=>(handleSubmit(e, "signin"))} >
                    <Form.Group as={Row} className="mb-3 justify-content-center">
                        <Form.Label column sm="5" htmlFor="email">Enter your email: </Form.Label>
                        <Col sm="10">
                            <Form.Control type="email" id="email" value={userEmail} onChange={(e)=>(handleChange(e, "email"))} />
                        </Col>
                    </Form.Group>
                    <Form.Group as={Row} className="mb-3 justify-content-center">
                        <Form.Label column sm="5" htmlFor="password">Enter a password: </Form.Label>
                        <Col sm="10">
                            <Form.Control type="password" id="password" value={password} onChange={(e)=>(handleChange(e, "password"))} />
                        </Col>
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