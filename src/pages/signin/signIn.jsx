import React, { useState } from 'react';
import { Form, Button } from 'react-bootstrap';
import axios from 'axios';
import { Link } from 'react-router-dom';


const Signin = () => {

  const [userData, setUserData] = useState({
    name: '',
    email: '',
    password: '',
    passwordRepeat: '',
    role: '',
    profilePictureUrl: '',
    phoneNumber: '',
  });
  const [selectedImage, setSelectedImage] = useState ('https://img.freepik.com/free-vector/illustration-businessman_53876-5856.jpg?w=740&t=st=1683341675~exp=1683342275~hmac=d0f680af5e04b5034a756e6ebb404db85608e2226d6c18d4dc85bae2c5b93da3');





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
        role: '',
        profilePictureUrl: '',
        phoneNumber: '',
      });
      window.location.href = "/login";
    } catch (error) {
      console.log('Error while signing up:', error);
    }
  };
  
  const handleImageChangeImg = (event) => {
    setSelectedImage(event.target.files[0]);
  };

  const handleImageUpload = async () => {
    try {
      const formData = new FormData();
      formData.append('image', selectedImage);

      const headers = {
        apiKey: process.env.REACT_APP_APIKEY,
        Authorization: `Bearer ${localStorage.getItem('token')}`,
        'Content-Type': 'multipart/form-data',
      };

      const response = await axios.post(
        `${process.env.REACT_APP_BASE_URL}/api/v1/upload-image`,
        formData,
        { headers }
      );
      const url = response.data.url
      setUserData({ ...userData, profilePictureUrl: url });

      console.log('Response:', url.url);
      // Handle the response


    } catch (error) {
      console.log('Error while uploading image:', error);
      // Handle the error
    }
  };

 


  console.log(userData)
  return (
    <div className="d-flex justify-content-center align-items-center" style={{ width: '100%', minHeight: '100vh' ,marginTop:"20px",marginBottom:"20px"}}>
     
      <Form className="background p-4" onSubmit={handleSubmit}>
        <h3 className="mb-4">Sign In</h3>

        <div style={{width:"100%" , height: "200px"}} className='d-flex justify-content-center'>
        <img style={{width:"200px",height: "200px", borderRadius: "50%"}} onChange={handleImageChangeImg} src={selectedImage} alt='gambar'/>
      </div>

      <Form.Group className="mb-3" controlId="formBasicName">
        <Form.Label>Name</Form.Label>
        <Form.Control
          type="text"
          placeholder="Enter name"
          name="name"
          value={userData.name}
          onChange={handleChange}
          pattern="[A-Za-z\s]+"
          maxLength={30}
          required
        />
        <Form.Control.Feedback type="invalid">
          Name is required and should contain only letters.
        </Form.Control.Feedback>
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

        <Form.Group className="mb-3" controlId="formBasicRole">
        <Form.Label>Role</Form.Label>
        <div>
          <Form.Check
            type="radio"
            label="Admin"
            name="role"
            value="admin"
            checked={userData.role === 'admin'}
            onChange={handleChange}
          />
          <Form.Check
            type="radio"
            label="User"
            name="role"
            value="user"
            checked={userData.role === 'user'}
            onChange={handleChange}
          />
        </div>
      </Form.Group>

        <Form.Group className="mb-3" controlId="formBasicProfilePictureUrl">
          <Form.Label>Profile Picture URL</Form.Label>
        <Form.Control
          type="file"
          accept="image/*"
          onChange={handleImageChangeImg}
        />
         <Button variant="primary" onClick={handleImageUpload} >
        Upload Image
      </Button>

        </Form.Group>

        <Form.Group className="mb-3" controlId="formBasicPhoneNumber">
          <Form.Label>Phone Number</Form.Label>
          <Form.Control type="text" placeholder="Enter phone number" name="phoneNumber" value={userData.phoneNumber} onChange={handleChange} />
        </Form.Group>

        <Button variant="primary" type="submit" className="w-100">
          Submit
        </Button>

        <Link as={Link} style={{textDecoration:"none",marginTop:"10px" ,marginBottom:"10px"}} to="/login" className="forgot-password text-right mt-2">
            Sudah punya akun
          </Link>
      </Form>
    </div>
  );
};

export default Signin;
