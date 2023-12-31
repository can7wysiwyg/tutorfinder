import { Link } from "react-router-dom";
import { Container, Form, Row, Col, Button } from "react-bootstrap";
import axios from "axios";
import {  useState } from "react";



function Login() {

    const [values, setValues] = useState({ username: "", password: "" });

    

  const handleChange = (event) => {
    const { name, value } = event.target;
    setValues({ ...values, [name]: value });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    const res = await axios.post("https://apigigs.onrender.com/auth/login", { ...values });
    localStorage.setItem("token", res.data.accesstoken);
    if (res.data.msg) {
     alert(res.data.msg)
     window.location.href = "/login"
    } else  {
      window.location.href = "/";
    }
  };




    return(<>
    <Container>
      <Row className="justify-content-md-center">
        <Col xs={12} md={6}>
          <h1>Log In</h1>
          
          <Form onSubmit={handleSubmit}>
            <Form.Group className="mb-3" controlId="formBasicEmail">
              <Form.Label>enter your username</Form.Label>
              <Form.Control
                type="name"
                name="username"
                value={values.username}
                onChange={handleChange}
                placeholder="enter your username"
              />
            </Form.Group>

            <Form.Group className="mb-3" controlId="formBasicPassword">
              <Form.Label>enter your password</Form.Label>
              <Form.Control
                type="password"
                name="password"
                value={values.password}
                onChange={handleChange}
                placeholder="enter your password"
              />
            </Form.Group>
          
            <Button variant="danger" type="submit">
              Submit
            </Button> 
          </Form>
          <Row className="py-3">
            <Col>
              New Tutor?
              <Link to="/register">Register For An Account</Link>
            </Col>
            <Col className="text-right">
              <Link to="/forgot">Forgot Password</Link>
            </Col>
          </Row>
        </Col>
      </Row>
    </Container>



    
    
    </>)
}

export default Login