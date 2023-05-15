import React, { useState } from 'react';
import { Button, Form, Modal } from 'react-bootstrap';
import axios from 'axios';

const ChangeRole = () => {
    const [showModal, setShowModal] = useState(false);
    const [selectedRole, setSelectedRole] = useState('');
    const [roles, setRoles] = useState({});

    
    const handleChangeRole = async () => {
      try {
        const headers = {
          apiKey: process.env.REACT_APP_APIKEY,
          Authorization: `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6Im1pZnRhaGZhcmhhbkBnbWFpbC5jb20iLCJ1c2VySWQiOiJjYTIzZDdjYy02Njk1LTQzNGItODE2Yy03ZTlhNWMwNGMxNjQiLCJyb2xlIjoiYWRtaW4iLCJpYXQiOjE2NjE4NzUzMjF9.wV2OECzC25qNujtyb9YHyzYIbYEV-wud3TQsYv7oB4Q`,
          'Content-Type': 'application/json', // Perbaikan: Ubah tipe konten menjadi 'application/json'
        };

       
    
        const userId = localStorage.getItem('id');
    
        const requestBody = {
          role: selectedRole,
        };
    
        const response = await axios.post(
          `${process.env.REACT_APP_BASE_URL}/api/v1/update-user-role/${userId}`,
          requestBody,
          { headers }
        );
        if(response.status === 200){
          const token = localStorage.getItem("token");    
          const config = {
            headers: {
              apiKey: process.env.REACT_APP_APIKEY,
              Authorization: `Bearer ${token}`,
            },
          };
          
      
          const responseRole = await axios.get(
            `${process.env.REACT_APP_BASE_URL}/api/v1/user`,
            config
          );
          const roles =JSON.stringify(responseRole.data)
          setRoles(roles)
          // const roles= role.user.id
          localStorage.setItem("role", roles);
           window.location.reload();
        }
    
     
        // Handle the response
      } catch (error) {
        console.log('Error while updating user role:', error);
        // Handle the error
      }
    };

    
    

 
  const handleRoleChange = (event) => {
    setSelectedRole(event.target.value);
  };

  const handleCloseModal = () => {
    setShowModal(false);
  };

  const handleOpenModal = () => {
    setShowModal(true);
  };



  

  return (
    <div>
      <br/>
      <Button variant="primary" onClick={handleOpenModal}>
        Change Role
      </Button>

      <Modal show={showModal} onHide={handleCloseModal}>
        <Modal.Header closeButton>
          <Modal.Title>Change Role</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form.Group controlId="formBasicRole">
            <Form.Label>Select a role</Form.Label>
            <Form.Control as="select" onChange={handleRoleChange}>
            <option value="user">Select Role</option>
              <option value="user">User</option>
              <option value="admin">Admin</option>
            </Form.Control>
          </Form.Group>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseModal}>
            Cancel
          </Button>
          <Button variant="primary" onClick={handleChangeRole}>
            Save
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default ChangeRole;
