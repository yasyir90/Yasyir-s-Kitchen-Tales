import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Image } from 'react-bootstrap';
import axios from 'axios';
import EditProfile from './editProfile';
import './profile.css'
import emailImg from '../assets/new-email-outlined-envelope-back.png'
import telepon from'../assets/phone-working-indicator.png'
import user from '../assets/user-image-with-black-background.png'


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
    <Container className="my-4 container"style={{borderRadius:"20px"}}>
      <Row style={{background:"#111",marginTop:"20px",borderRadius:"30px"}}>
        <div style={{width:"100%",height:"70px",background:"#dc3545",borderTopRightRadius:"30px", borderTopLeftRadius:"30px"}}> <EditProfile/></div>
        <Col xs={12} md={4} className="d-flex justify-content-center align-items-center">
          <Image className='imgProfile' style={{ width: "200px", height: "200px", objectFit: "cover", objectPosition: "center",marginBottom:"10px",border:"4px solid #dc3545" }} src={userData.profilePictureUrl || "https://via.placeholder.com/200x200"} roundedCircle />
        </Col>
        <Col  xs={12} md={8} style={{textAlign:"center",marginTop:"10px"}}>
          <h2 style={{color:"#dc3545",fontWeight:"bold",fontFamily:"Righteous"}}>{userData.name}</h2>

        <div style={{display:"flex",justifyContent:"center",width:"100%",gap:"20px",marginTop:"30px",marginBottom:"30px"}}>
        <div className='containerData'>
          <img className='emailImg' src={emailImg} alt="email" style={{width:"40px",backgroundColor:"#005b8f",padding:"5px",borderRadius:"50%",}}/>
        <div style={{display:"flex", justifyContent:"center"}}> <div className='kotakText'><p className='pEmail'>{userData.email}</p></div></div>
          </div>

          <div className='containerData'>
          <img className='emailImg' src={telepon} alt="email" style={{width:"40px",backgroundColor:"#005b8f",padding:"5px",borderRadius:"50%",}}/>
        <div style={{display:"flex", justifyContent:"center"}}> <div className='kotakText'> <p  className='pEmail'>{userData.phoneNumber}</p></div></div>
          </div>

          <div className='containerData'>
          <img className='emailImg' src={user} alt="email" style={{width:"40px",backgroundColor:"#005b8f",padding:"5px",borderRadius:"50%",}}/>
        <div style={{display:"flex", justifyContent:"center"}}> <div className='kotakText'>  <p className='pEmail'>{userData.role}</p></div></div>
          </div>
        </div>
      
      
        
        </Col>
      </Row>
     
    </Container>
  );
};

export default Profile;
