import React, { Component } from 'react';
import './login.css';
import { Form, Button } from 'react-bootstrap';

export default class Login extends Component {
  render() {
    return (
      <div className="d-flex justify-content-center align-items-center" style={{ width: '100%', minHeight: '100vh' }}>
          <Form className="background p-4">
            <h3 className="mb-4">Sign In</h3>
            <Form.Group className="mb-3" controlId="formBasicEmail">
              <Form.Label>Email address</Form.Label>
              <Form.Control type="email" placeholder="Enter email" />
            </Form.Group>
            <Form.Group className="mb-3" controlId="formBasicPassword">
              <Form.Label>Password</Form.Label>
              <Form.Control type="password" placeholder="Enter password" />
            </Form.Group>
            <Form.Group className="mb-3" controlId="formBasicCheckbox">
              <Form.Check type="checkbox" label="Remember me" />
            </Form.Group>
            <Button variant="primary" type="submit" className="w-100">
              Submit
            </Button>
            <p className="forgot-password text-right mt-2">
              Forgot <a href="#">password?</a>
            </p>
          </Form>

      </div>
    );
  }
}
