import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Image } from 'react-bootstrap';
import axios from 'axios';

const AllUser = () => {
  const [userData, setUserData] = useState({});

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await axios.get(`https://api-bootcamp.do.dibimbing.id/api/v1/all-user`, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`,
            apiKey: 'w05KkI9AWhKxzvPFtXotUva-',
          },
        });

        setUserData(response.data);
      } catch (error) {
        console.error(error);
      }
    };

    if (localStorage.getItem('token')) {
      fetchUserData();
    }
  }, []);

  return (
<Container className="my-4">
  {userData.data && userData.data.map((user) => (
    <Row key={user.id} style={{background:"white",marginTop:"20px",padding:"20px",borderRadius:"15px"}}>
      <Col xs={12} md={4} className="d-flex justify-content-center align-items-center">
        <Image style={{ width: "200px", height: "200px", objectFit: "cover", objectPosition: "center",marginBottom:"10px" }} src={user.profilePictureUrl || 'https://via.placeholder.com/200x200'} roundedCircle />
      </Col>
      <Col xs={12} md={8} style={{textAlign:"center",marginTop:"10px"}}>
        <h2>{user.name}</h2>
        <p>{user.email}</p>
        <p>{user.phoneNumber}</p>
        <p>{user.role}</p>
      </Col>
    </Row>
  ))}
</Container>

    );
    };
    
    export default AllUser;