import React, { useState } from 'react';
import { Form, Button, Modal } from 'react-bootstrap';
import axios from 'axios';
import ChangeRole from './changeRole';
import profile from '../assets/review.png'

const EditProfile = () => {
  const [userData, setUserData] = useState({
    name: '',
    email: '',
    profilePictureUrl: '',
    phoneNumber: ''
  });
  const [selectedImage, setSelectedImage] = useState(null);
  const [showModal, setShowModal] = useState(false);

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setUserData({ ...userData, [name]: value });
  };

  const handleImageChangeImg = (event) => {
    setSelectedImage(event.target.files[0]);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const token = localStorage.getItem('token');

      const headers = {
        apiKey: process.env.REACT_APP_APIKEY,
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json'
      };

      const response = await axios.post(
        `${process.env.REACT_APP_BASE_URL}/api/v1/update-profile`,
        userData,
        { headers }
      );

      console.log('Response:', response);
      window.location.reload();
      // Handle the response
    } catch (error) {
      console.log('Error while updating profile:', error);
      // Handle the error
    }
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
      const url = response.data.url;
      setUserData({ ...userData, profilePictureUrl: url });

      console.log('Response:', url.url);
      alert('gambar dah siap')
      // Handle the response
    } catch (error) {
      console.log('Error while uploading image:', error);
      // Handle the error
    }
  };

  const handleCloseModal = () => {
    setShowModal(false);
  };

  const handleShowModal = () => {
    setShowModal(true);
  };


  

  return (
    <div>

    <div style={{display:"flex" ,justifyContent:"space-between",marginTop:"20px"}}>
    <Button onClick={handleShowModal} style={{background:"none",border:"none",marginTop:"15px"}}>
        <img src={profile} alt="role" style={{width:"40px",backgroundColor:"#005b8f",padding:"5px",borderRadius:"50%",cursor:"pointer",border:"2px solid #dc3545"}}/>
      </Button>
      <ChangeRole/>
    </div>

      <Modal show={showModal} onHide={handleCloseModal}>
        <Modal.Header closeButton>
          <Modal.Title>Edit Profile</Modal.Title>
        </Modal.Header>
        <Modal.Body>
            <h3>Edit Profile</h3>
      <Form onSubmit={handleSubmit}>
        <Form.Group controlId="formBasicName">
          <Form.Label>Name</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter name"
            name="name"
            value={userData.name}
            onChange={handleInputChange}
          />
        </Form.Group>
        <Form.Group controlId="formBasicEmail">
          <Form.Label>Email address</Form.Label>
          <Form.Control
            type="email"
            placeholder="Enter email"
            name="email"
            value={userData.email}
            onChange={handleInputChange}
          />
        </Form.Group>
        <Form.Group controlId="formBasicPhoneNumber">
          <Form.Label>Phone Number</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter phone number"
            name="phoneNumber"
            value={userData.phoneNumber}
            onChange={handleInputChange}
          />
        </Form.Group>
        <Form.Group controlId="formBasicProfilePictureUrl">
          <Form.Label>Profile Picture</Form.Label>
          <Form.Label>Select an image</Form.Label>
        <Form.Control
          type="file"
          accept="image/*"
          onChange={handleImageChangeImg}
        />
        <div style={{marginTop:"20px"}}>
        <Button variant="primary" onClick={handleImageUpload} style={{marginRight:"20px"}} >
        Submit Picture
      </Button>

      <Button variant="primary" type="submit" >
         Update Profile
        </Button>
        </div>
        </Form.Group>
      </Form>
    </Modal.Body>
    </Modal>
      
    </div>
  );
};

export default EditProfile;
