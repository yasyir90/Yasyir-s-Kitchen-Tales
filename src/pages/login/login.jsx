import React, { Component } from 'react';
import './login.css';
import { Form, Button } from 'react-bootstrap';
import axios from 'axios';
import { Link } from 'react-router-dom';
import negative from '../assets/cancel-button.png'
import hide from './blind.png'
import show from './vision.png'



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
      
      })
      .catch(error => {

        this.setState({
          loginError: 'Failed to login. Please check your password or email.'
        });
    
      });
  }
  handleClose = (event) => {
    window.location.href = "/";
  };

    togglePasswordVisibility = () => {
    this.setState((prevState) => ({
      showPassword: !prevState.showPassword,
    }));
  };



  render() {
    const { showPassword } = this.state;

    return (
      <div className="d-flex justify-content-center align-items-center" style={{ width: '100%', minHeight: '100vh' }}>
        <Form style={{background:"#222" }} className="background p-4" onSubmit={this.handleSubmit}>

         <div  style={{display:"flex" , justifyContent:"space-between"}}>
         <h3 className="mb-4"  style={{color:"white",fontFamily:"Righteous"}}>Login</h3>
          <Button style={{background:"none",border:"none", }} variant="danger" onClick={this.handleClose} className="mb-2">
              <img src={negative} alt= "upload" style={{width:"40px",height:"40px",backgroundColor:"#dc3545",padding:"5px",borderRadius:"50%"}}/>
              </Button>
         </div>


          <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Label  style={{color:"white",fontFamily:"Righteous"}}>Email address</Form.Label>
            <Form.Control type="email" name="email" placeholder="Enter email" value={this.state.email} onChange={this.handleChange} />
          </Form.Group>
          <Form.Group className="mb-3" controlId="formBasicPassword">
            <Form.Label  style={{color:"white",fontFamily:"Righteous"}}>Password</Form.Label>
            <Form.Control type={showPassword ? 'text' : 'password'} name="password" placeholder="Enter password" value={this.state.password} onChange={this.handleChange} />
          </Form.Group>
          <button
              type="button"
              className="toggle-password"
              onClick={this.togglePasswordVisibility}
              style={{background:"none", border:"none",marginBottom:"20px"}}
            >
              {showPassword ? 
             <img src={hide} alt= "upload" style={{width:"40px",height:"40px",backgroundColor:"#005b8f",padding:"5px",borderRadius:"50%"}}/> :    <img src={show} alt= "upload" style={{width:"40px",height:"40px",backgroundColor:"#dc3545",padding:"5px",borderRadius:"50%"}}/>
              }
            </button>
         
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
