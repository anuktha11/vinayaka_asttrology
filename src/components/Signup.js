import React, { useState } from 'react';
import { Form, Button, Container, Row, Col } from 'react-bootstrap';
import axios from 'axios';

const Signup = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    password: '',
    dob: '',
  });

  const [errors, setErrors] = useState({
    name: '',
    email: '',
    phone: '',
    password: '',
    dob: '',
  });

  const [otp, setOtp] = useState('');
  const [isOtpSent, setIsOtpSent] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    validate(name, value);
  };

  const validate = (name, value) => {
    let errorMsg = '';
    switch (name) {
      case 'name':
        if (!value) errorMsg = 'Name is required.';
        else if (/[^a-zA-Z\s]/.test(value)) errorMsg = 'Name can only contain letters and spaces.';
        break;
      case 'email':
        if (!value) errorMsg = 'Email is required.';
        else if (!/\S+@\S+\.\S+/.test(value)) errorMsg = 'Invalid email format.';
        break;
      case 'phone':
        if (!value) errorMsg = 'Phone number is required.';
        else if (!/^\d{10}$/.test(value)) errorMsg = 'Phone number must be 10 digits.';
        break;
      case 'password':
        if (!value) errorMsg = 'Password is required.';
        else if (value.length < 6 || value.length > 9) errorMsg = 'Password must be between 6 to 9 characters.';
        else if (!/[A-Z]/.test(value)) errorMsg = 'Password must include at least one uppercase letter.';
        else if (!/[a-z]/.test(value)) errorMsg = 'Password must include at least one lowercase letter.';
        else if (!/\d/.test(value)) errorMsg = 'Password must include at least one number.';
        break;
      case 'dob':
        if (!value) errorMsg = 'Date of birth is required.';
        else if (new Date(value) > new Date()) errorMsg = 'Future dates are not allowed.';
        break;
      default:
        break;
    }
    setErrors({ ...errors, [name]: errorMsg });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const isValid = Object.keys(formData).every((key) => {
      validate(key, formData[key]);
      return errors[key] === '';
    });

    if (isValid) {
      try {
        const response = await axios.post('http://localhost:5000/api/auth/signup', formData);
        if (response.data.message === 'User registered, OTP sent to email') {
          setIsOtpSent(true);
        }
      } catch (error) {
        console.error('Error during signup:', error.response ? error.response.data.message : error.message);
        alert('Signup failed: ' + (error.response ? error.response.data.message : 'Server error'));
      }
    }
  };

  const handleOtpSubmit = async () => {
    try {
      const response = await axios.post('http://localhost:5000/api/auth/verify-otp', {
        email: formData.email,
        otp,
      });
      if (response.data.message === 'OTP verified, registration complete') {
         window.location.href = '/login';  
      }
    } catch (error) {
      console.error('Error during OTP verification:', error.response ? error.response.data.message : error.message);
      alert('OTP verification failed: ' + (error.response ? error.response.data.message : 'Server error'));
    }
  };

  return (
    <Container className="mt-5">
      <Row className="justify-content-center">
        <Col xs={12} md={8} lg={6}>
          <div className="form-box">
            <h2 style={{ marginBottom: '30px', color: 'brown' }}><b>Sign Up</b></h2>
            <Form onSubmit={handleSubmit}>
              <Form.Group controlId="formName">
                <Form.Label className="form-label">Name</Form.Label>
                <Form.Control
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  isInvalid={!!errors.name}
                  className="form-control-custom"
                />
                <Form.Control.Feedback type="invalid" className="error-message">{errors.name}</Form.Control.Feedback>
              </Form.Group>
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
              <Form.Group controlId="formPhone">
                <Form.Label className="form-label">Phone Number</Form.Label>
                <Form.Control
                  type="text"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  isInvalid={!!errors.phone}
                  className="form-control-custom"
                />
                <Form.Control.Feedback type="invalid" className="error-message">{errors.phone}</Form.Control.Feedback>
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
              <Form.Group controlId="formDob">
                <Form.Label className="form-label">Date of Birth</Form.Label>
                <Form.Control
                  type="date"
                  name="dob"
                  value={formData.dob}
                  onChange={handleChange}
                  isInvalid={!!errors.dob}
                  className="form-control-custom"
                />
                <Form.Control.Feedback type="invalid" className="error-message">{errors.dob}</Form.Control.Feedback>
              </Form.Group>
              <Button variant="primary" type="submit" className="mt-3 w-100">Sign Up</Button>
            </Form>

            {isOtpSent && (
              <div className="otp-section mt-4">
                <h4>Enter OTP</h4>
                <Form.Group controlId="formOtp">
                  <Form.Control
                    type="text"
                    name="otp"
                    value={otp}
                    onChange={(e) => setOtp(e.target.value)}
                    className="form-control-custom"
                  />
                </Form.Group>
                <Button variant="primary" onClick={handleOtpSubmit} className="mt-3 w-100">Verify OTP</Button>
              </div>
            )}
          </div>
        </Col>
      </Row>
    </Container>
  );
};

export default Signup;
