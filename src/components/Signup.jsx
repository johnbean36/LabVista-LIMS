import Error from './Error'
import 'bootstrap/dist/css/bootstrap.min.css';
import {Form, Button, Row, Col} from 'react-bootstrap';

function Signup({userName, handleChange, userEmail, password, confirm, handleSubmit, error}){
    return (
        <div>
            <h1>Sign Up</h1>
            <div className="margin select">
                <Form onSubmit={(e)=>(handleSubmit(e, "signup"))} >
                    <Form.Group as={Row} className="mb-3 justify-content-center">
                        <Form.Label htmlFor="name">Enter your name: </Form.Label>
                        <Col sm="10">
                            <Form.Control onChange={(e)=>(handleChange(e, "name"))} id="name" value={userName} />
                        </Col>
                    </Form.Group>
                    <Form.Group as={Row} className="mb-3 justify-content-center">
                        <Form.Label htmlFor="email">Enter your email: </Form.Label>
                        <Col sm="10">
                            <Form.Control type="email" id="email" value={userEmail} onChange={(e)=>(handleChange(e, "email"))} />
                        </Col>
                    </Form.Group>
                    <Form.Group as={Row} className="mb-3 justify-content-center">
                        <Form.Label htmlFor="password">Enter a password: </Form.Label>
                        <Col sm="10">
                            <Form.Control type="password" id="password" value={password} onChange={(e)=>(handleChange(e, "password"))} />
                        </Col>
                    </Form.Group>
                    <Form.Group as={Row} className="mb-3 justify-content-center">
                        <Form.Label htmlFor="confirm">Confirm your password: </Form.Label>
                        <Col sm="10">
                            <Form.Control type="password" id="confirm" value={confirm} onChange={(e)=>(handleChange(e, "confirm"))} />
                        </Col>
                    </Form.Group>
                    <Form.Group as={Row} className="mb-3 justify-content-center">
                        <Col sm="10">
                            <Button type="submit">Submit</Button>
                        </Col>
                    </Form.Group>
                </Form>
                <div>
                    {error ? (<Error error={error} />) : (null)}
                </div>
            </div>
        </div>
    )   
}

export default Signup;