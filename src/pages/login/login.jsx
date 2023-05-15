import React, { Component } from 'react';
import './login.css';
import { Form, Button } from 'react-bootstrap';
import axios from 'axios';
import { Link } from 'react-router-dom';

export default class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      password: '',
      loginError: ''
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
        const token = response.data.token;
        localStorage.setItem("token", token);

        const role = response.data.user.role;
        localStorage.setItem("role", role);

        const name = response.data.user.name;
        localStorage.setItem("name", name);

        const email = response.data.user.email;
        localStorage.setItem("email", email);

        const id = response.data.user.id;
        localStorage.setItem("id", id);
        // Redirect to home page or do something else
        window.location.href = "/";
        console.log(token)
      })
      .catch(error => {
        console.log(error);
        this.setState({
          loginError: 'Failed to login. Please check your password or email.'
        });
      });
  }

  render() {
    return (
      <div className="d-flex justify-content-center align-items-center" style={{ width: '100%', minHeight: '100vh' }}>
        <Form className="background p-4" onSubmit={this.handleSubmit}>
          <h3 className="mb-4">Login</h3>
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
          {this.state.loginError && <p className="text-danger mt-2">{this.state.loginError}</p>}
          <Link as={Link} style={{textDecoration:"none",marginTop:"10px" ,marginBottom:"10px"}} to="/Signin" className="forgot-password text-right mt-2">
            Daftar
          </Link>
        </Form>
      </div>
    );
  }
}
