import React, { useState } from 'react';
import { Form, Button } from 'react-bootstrap';
import axios from 'axios';

const Signin = () => {
  const [userData, setUserData] = useState({
    name: '',
    email: '',
    password: '',
    passwordRepeat: '',
    role: 'admin',
    // profilePictureUrl: '',
    phoneNumber: '',
  });

  const handleChange = (event) => {
    const { name, value } = event.target;
    setUserData((prevUserData) => ({
      ...prevUserData,
      [name]: value,
    }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const headers = {
        apiKey: process.env.REACT_APP_APIKEY,
      };
      const response = await axios.post(
        `${process.env.REACT_APP_BASE_URL}/api/v1/register`,
        userData,
        { headers }
      );
      console.log('Response:', response);
      // Clear the form fields
      setUserData({
        name: '',
        email: '',
        password: '',
        passwordRepeat: '',
        role: 'admin',
        // profilePictureUrl: '',
        phoneNumber: '',
      });
    } catch (error) {
      console.log('Error while signing up:', error);
    }
  };

  console.log(userData)
  return (
    <div className="d-flex justify-content-center align-items-center" style={{ width: '100%', minHeight: '100vh' }}>
      <Form className="background p-4" onSubmit={handleSubmit}>
        <h3 className="mb-4">Sign In</h3>
        <Form.Group className="mb-3" controlId="formBasicName">
          <Form.Label>Name</Form.Label>
          <Form.Control type="text" placeholder="Enter name" name="name" value={userData.name} onChange={handleChange} />
        </Form.Group>
        <Form.Group className="mb-3" controlId="formBasicEmail">
          <Form.Label>Email address</Form.Label>
          <Form.Control type="email" placeholder="Enter email" name="email" value={userData.email} onChange={handleChange} />
        </Form.Group>
        <Form.Group className="mb-3" controlId="formBasicPassword">
          <Form.Label>Password</Form.Label>
          <Form.Control type="password" placeholder="Enter password" name="password" value={userData.password} onChange={handleChange} />
        </Form.Group>
        <Form.Group className="mb-3" controlId="formBasicPasswordRepeat">
          <Form.Label>Repeat Password</Form.Label>
          <Form.Control type="password" placeholder="Enter password again" name="passwordRepeat" value={userData.passwordRepeat} onChange={handleChange} />
        </Form.Group>
        {/* <Form.Group className="mb-3" controlId="formBasicProfilePictureUrl">
          <Form.Label>Profile Picture URL</Form.Label>
          <Form.Control type="text" placeholder="Enter profile picture URL" name="profilePictureUrl" value={userData.profilePictureUrl} onChange={handleChange} />
        </Form.Group> */}
        <Form.Group className="mb-3" controlId="formBasicPhoneNumber">
          <Form.Label>Phone Number</Form.Label>
          <Form.Control type="text" placeholder="Enter phone number" name="phoneNumber" value={userData.phoneNumber} onChange={handleChange} />
        </Form.Group>
        <Button variant="primary" type="submit" className="w-100">
          Submit
        </Button>
      </Form>
    </div>
  );
};

export default Signin;
