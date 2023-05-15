import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Image } from 'react-bootstrap';
import axios from 'axios';
import EditProfile from './editProfile';

const Profile = () => {
  const [userData, setUserData] = useState({});

  useEffect(() => {
    const fetchUserData = async () => {
   
      try {
        const response = await axios.get(`https://api-bootcamp.do.dibimbing.id/api/v1/user`,{
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`,
            apiKey: 'w05KkI9AWhKxzvPFtXotUva-',
          },
        });

        setUserData(response.data.user);
      } catch (error) {
        console.error(error);
      }
    };

    if (localStorage.getItem("token")) {
      fetchUserData();
    }
  }, []);
  console.log(userData.user)

  return (
    <Container className="my-4">
      <Row style={{background:"white",marginTop:"20px",padding:"20px",borderRadius:"15px"}}>
        <Col xs={12} md={4} className="d-flex justify-content-center align-items-center">
          <Image style={{ width: "200px", height: "200px", objectFit: "cover", objectPosition: "center",marginBottom:"10px" }} src={userData.profilePictureUrl || "https://via.placeholder.com/200x200"} roundedCircle />
        </Col>
        <Col xs={12} md={8} style={{textAlign:"center",marginTop:"10px"}}>
          <h2>{userData.name}</h2>
          <p>{userData.email}</p>
          <p>{userData.phoneNumber}</p>
          <p>{userData.role}</p>
        </Col>
      </Row>
      <EditProfile/>
    </Container>
  );
};

export default Profile;
