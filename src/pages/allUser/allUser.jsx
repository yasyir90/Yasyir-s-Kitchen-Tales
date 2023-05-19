import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Image } from 'react-bootstrap';
import axios from 'axios';
import emailImg from '../assets/new-email-outlined-envelope-back.png'
import telepon from'../assets/phone-working-indicator.png'
import users from '../assets/user-image-with-black-background.png'


const AllUser = () => {
  const [userData, setUserData] = useState({});

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await axios.get(`https://api-bootcamp.do.dibimbing.id/api/v1/all-user`, {
          headers: {
            Authorization: `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6Inlhc3lpcm1hc3lhaGhndWxAZ21haWwuY29tIiwidXNlcklkIjoiMDE1MDBmNWItZDk1MC00YjNiLTg2ZDYtZTdjZWZlMDRiMTdlIiwicm9sZSI6ImFkbWluIiwiaWF0IjoxNjg0MDMzOTgzfQ.RdonVZLKNhC4cJq6ugBIv0pqxCHJaS38FqWYweky2Fc`,
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
    <Row key={user.id} style={{background:"#111",marginTop:"20px",borderRadius:"30px"}}>
      <div style={{width:"100%",height:"70px",background:"#32cd32",borderTopRightRadius:"30px", borderTopLeftRadius:"30px"}}></div>
        <Col xs={12} md={4} className="d-flex justify-content-center align-items-center">
          <Image className='imgProfile' style={{ width: "200px", height: "200px", objectFit: "cover", objectPosition: "center",marginBottom:"10px",border:"4px solid #32cd32" }} src={user.profilePictureUrl || 'https://via.placeholder.com/200x200'} roundedCircle />
        </Col>
        <Col  xs={12} md={8} style={{textAlign:"center",marginTop:"10px"}}>
          <h2 style={{color:"#32cd32",fontWeight:"bold",fontFamily:"Righteous"}}>{userData.name}</h2>

        <div style={{display:"flex",justifyContent:"center",width:"100%",gap:"20px",marginTop:"30px",marginBottom:"30px"}}>
        <div className='containerData'>
          <img className='emailImg' src={emailImg} alt="email" style={{width:"40px",backgroundColor:"#32cd32",padding:"5px",borderRadius:"50%",}}/>
        <div style={{display:"flex", justifyContent:"center"}}> <div className='kotakText'><p className='pEmail'>{user.email}</p></div></div>
          </div>

          <div className='containerData'>
          <img className='emailImg' src={telepon} alt="email" style={{width:"40px",backgroundColor:"#32cd32",padding:"5px",borderRadius:"50%",}}/>
        <div style={{display:"flex", justifyContent:"center"}}> <div className='kotakText'> <p  className='pEmail'>{user.phoneNumber}</p></div></div>
          </div>

          <div className='containerData'>
          <img className='emailImg' src={users} alt="email" style={{width:"40px",backgroundColor:"#32cd32",padding:"5px",borderRadius:"50%",}}/>
        <div style={{display:"flex", justifyContent:"center"}}> <div className='kotakText'>  <p className='pEmail'>{user.role}</p></div></div>
          </div>
        </div>
      
      
        
        </Col>
    </Row>
  ))}
</Container>

    );
    };
    
    export default AllUser;