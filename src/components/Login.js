import React, { useState } from 'react';
import { Form, Button, Container, Row, Col } from 'react-bootstrap';
import axios from 'axios';
import { Link } from 'react-router-dom';
const handleLogin = async (email, password) => {
  try {
    const response = await axios.post('http://localhost:5000/api/auth/login', { email, password });
    const { token, user } = response.data;
        localStorage.setItem('token', token);
    localStorage.setItem('user', JSON.stringify(user));
    return { success: true };
  } catch (error) {
    const message = error.response?.data?.message || 'Login failed';
    return { success: false, message };
  }
};

const Login = () => {
  const [formData, setFormData] = useState({ email: '', password: '' });
  const [errors, setErrors] = useState({ email: '', password: '' });
  const [serverMessage, setServerMessage] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    validate(name, value);
  };

  const validate = (name, value) => {
    let errorMsg = '';
    switch (name) {
      case 'email':
        if (!value) errorMsg = 'Email is required.';
        else if (!/\S+@\S+\.\S+/.test(value)) errorMsg = 'Invalid email format.';
        break;
      case 'password':
        if (!value) errorMsg = 'Password is required.';
        break;
      default:
        break;
    }
    setErrors({ ...errors, [name]: errorMsg });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    Object.keys(formData).forEach((key) => validate(key, formData[key]));
    if (Object.values(errors).every((err) => err === '')) {
      const result = await handleLogin(formData.email, formData.password);
      if (result.success) {
        setServerMessage('Login successful! Redirecting...');
        setTimeout(() => {
          window.location.href = '/';
        }, 2000);
      } else {
        setServerMessage(result.message);
      }
    }
  };

  return (
    <Container className="mt-5">
      <Row>
        <Col md={{ span: 6, offset: 3 }}>
          <div className="form-box">
            <h2 style={{ marginBottom: "30px", color: "brown" }}><b>Login</b></h2>
            <Form onSubmit={handleSubmit}>
              <Form.Group controlId="formEmail">
                <Form.Label className="form-label">Email</Form.Label>
                <Form.Control
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  isInvalid={!!errors.email}
                  className="form-control-custom"
                />
                <Form.Control.Feedback type="invalid" className="error-message">{errors.email}</Form.Control.Feedback>
              </Form.Group>
              <Form.Group controlId="formPassword">
                <Form.Label className="form-label">Password</Form.Label>
                <Form.Control
                  type="password"
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  isInvalid={!!errors.password}
                  className="form-control-custom"
                />
                <Form.Control.Feedback type="invalid" className="error-message">{errors.password}</Form.Control.Feedback>
              </Form.Group>
              <Button variant="primary" type="submit" className="mt-3">Login</Button>
            </Form>
            {serverMessage && <p className="mt-3" style={{ color: 'red' }}>{serverMessage}</p>}
            <p className="mt-3" style={{color:"black"}}>
              Don't have an account? <Link to="/signup">Signup</Link>
            </p> 
          </div>
        </Col>
      </Row>
    </Container>
  );
};

export default Login;
