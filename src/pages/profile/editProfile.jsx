import React, { useState } from 'react';
import { Form, Button, Modal } from 'react-bootstrap';
import axios from 'axios';
import ChangeRole from './changeRole';
import profile from '../assets/review.png'
import negative from '../assets/cancel-button.png'

const EditProfile = () => {
  const [userData, setUserData] = useState({
    name: '',
    email: '',
    profilePictureUrl: '',
    phoneNumber: ''
  });
  const [selectedImage, setSelectedImage] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [show, setShow] = useState('none');
  const [eror, setEror] = useState('');
  const buttonStyle = {
    display: show
  };
  const [succes, setSucces] = useState('');


  

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

      await axios.post(
        `${process.env.REACT_APP_BASE_URL}/api/v1/update-profile`,
        userData,
        { headers }
      );

      window.location.reload();
           setEror('')
      // Handle the response
    } catch (error) {
          setEror('Error because the input is empty or the email already exists')
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
      setSucces('image uploade success')
      setEror('')  
      setShow('flex')
      setEror('') 
      // Handle the response
    } catch (error) {
      setEror('The file has been entered incorrectly or there is a problems')  
      setSucces('')
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
        <Modal.Header  style={{background:"#222" }}>
          <Modal.Title style={{color:"white",fontFamily:"Righteous"}}>Edit Profile</Modal.Title>
          <Button style={{background:"none",border:"none", }} variant="danger" onClick={handleCloseModal} className="mb-2">
              <img src={negative} alt= "upload" style={{width:"40px",height:"40px",backgroundColor:"#dc3545",padding:"5px",borderRadius:"50%"}}/>
              </Button>
        </Modal.Header>
        <Modal.Body style={{background:"#222" }}>

      <Form onSubmit={handleSubmit}>
        <Form.Group controlId="formBasicName">
          <Form.Label  style={{color:"white",fontFamily:"Righteous"}}>Name</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter name"
            name="name"
            value={userData.name}
            onChange={handleInputChange}
          />
        </Form.Group>
        <Form.Group controlId="formBasicEmail">
          <Form.Label  style={{color:"white",fontFamily:"Righteous"}}>Email address</Form.Label>
          <Form.Control
            type="email"
            placeholder="Enter email"
            name="email"
            value={userData.email}
            onChange={handleInputChange}
          />
        </Form.Group>
        <Form.Group controlId="formBasicPhoneNumber">
          <Form.Label  style={{color:"white",fontFamily:"Righteous"}}>Phone Number</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter phone number"
            name="phoneNumber"
            value={userData.phoneNumber}
            onChange={handleInputChange}
          />
        </Form.Group>
        <Form.Group controlId="formBasicProfilePictureUrl">
          <Form.Label  style={{color:"white",fontFamily:"Righteous"}}>Profile Picture</Form.Label>
        <Form.Control
          type="file"
          accept="image/*"
          onChange={handleImageChangeImg}
        />
       <p className="text-danger mt-2">{eror}</p>
       <p className="text-success mt-2">{succes}</p>
        <div style={{marginTop:"20px",display:"flex"}}>
        <Button variant="primary" onClick={handleImageUpload} style={{marginRight:"20px"}} >
        Submit Picture
      </Button>

      <Button variant="primary" type="submit" onSubmit={handleSubmit} style={buttonStyle}  >
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
