import React, { Component } from 'react';
import './login.css';
import { Form, Button } from 'react-bootstrap';
import axios from 'axios';

export default class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      password: ''
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(event) {
    const target = event.target;
    const value = target.value;
    const name = target.name;
    this.setState({
      [name]: value
    });
  }

  handleSubmit(event) {
    event.preventDefault();
    const apikey = process.env.REACT_APP_APIKEY;
    const data = {
      email: this.state.email,
      password: this.state.password
    };
    axios.post('https://api-bootcamp.do.dibimbing.id/api/v1/login', data, {
        headers: { 'apiKey': `${apikey}` }
      })
      .then(response => {
        console.log(response.data);
        // Do something with the response
      })
      .catch(error => {
        console.log(error);
        // Handle the error
      });
  }

  render() {
    return (
      <div className="d-flex justify-content-center align-items-center" style={{ width: '100%', minHeight: '100vh' }}>
        <Form className="background p-4" onSubmit={this.handleSubmit}>
          <h3 className="mb-4">Sign In</h3>
          <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Label>Email address</Form.Label>
            <Form.Control type="email" name="email" placeholder="Enter email" value={this.state.email} onChange={this.handleChange} />
          </Form.Group>
          <Form.Group className="mb-3" controlId="formBasicPassword">
            <Form.Label>Password</Form.Label>
            <Form.Control type="password" name="password" placeholder="Enter password" value={this.state.password} onChange={this.handleChange} />
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
