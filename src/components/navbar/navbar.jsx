import { Container, Nav, Navbar, NavDropdown,Modal,Button } from 'react-bootstrap';
import './navbar.css';
import React, { useState } from "react";
import logo from './logo.png';
import { Link } from 'react-router-dom';
import negative from '../assets/cancel-button.png'
// import { useState , useEffect} from 'react';
// import axios from 'axios';


function NavbarH() {

  // const [userData, setUserData] = useState({});
  // useEffect(() => {
  //   const fetchUserData = async () => {
     
      
  //     try {
  //       const response = await axios.get(`https://api-bootcamp.do.dibimbing.id/api/v1/user`,{
  //         headers: {
  //           Authorization:  `Bearer ${localStorage.getItem('token')}`,
  //           apiKey: 'w05KkI9AWhKxzvPFtXotUva-',
  //         },
  //       });

  //       setUserData(response.data.user);
  //     } catch (error) {
  //       console.error(error);
  //     }
  //   };

  //   if (localStorage.getItem("token")) {
  //     fetchUserData();
  //   }
  // }, []);
  const [showModal, setShowModal] = useState(false)

  const handleLogout = async () => {
    localStorage.clear();
    window.location.href = "/";
  };

  const handleClose = () => setShowModal(false);

  
  return (
    <Navbar expand="lg" sticky="top" style={{ backgroundColor: '#222' }}>
      <Container fluid className="px-lg-5">
        <Navbar.Toggle aria-controls="navbarSupportContent" id="togle" />
        <Navbar.Collapse id="navbarSupportContent">
          <Nav className="me-auto" defaultActiveKey="/" >
            <Nav.Link to="/">
              <img src={logo} alt='logo' style={{ width: '35px',}}/>
            </Nav.Link>
            <Nav.Link as={Link} to="/">
              Home
            </Nav.Link>
          
            <Nav.Link as={Link} to="/about">
              About
            </Nav.Link>
         

         
             {localStorage.getItem("role") === "admin" && (
                 <Nav.Link as={Link} to="/allfood">
                 All Food
               </Nav.Link>
            )}
         
           
           
            {localStorage.getItem("role") === "admin" && (
              <Nav.Link as={Link} to="/addfood">
                Add Food
              </Nav.Link>
            )}
          </Nav>
          <Navbar.Brand to="/">
            {/* <span className="mx-1 logo fs-1 text-focus-in">Yasyir's Kitchen Tales</span> */}
          </Navbar.Brand>
          <Nav className="ms-auto">
            {localStorage.getItem("token") ? (
              <NavDropdown title="Account" id="basic-nav-dropdown drp">
                <NavDropdown.Item as={Link} to={`/profile`}>
                  My Profile
                </NavDropdown.Item>
                <NavDropdown.Item  as={Link} to="/all-users">
                    All User
                 </NavDropdown.Item>
                <NavDropdown.Divider />
                <NavDropdown.Item onClick={() => setShowModal(true)}>
  Logout
</NavDropdown.Item>
              </NavDropdown>
            ) : (
              <div className='d-flex'>
              <Nav.Link as={Link} to="/login" className="log" style={{marginRight:"20px"}}>
               Login
             </Nav.Link>
              <Nav.Link as={Link} to="/Signin" className="log">
              Create Account
             </Nav.Link>
             </div>
            )}
          </Nav>
        </Navbar.Collapse>
      </Container>

      <Modal show={showModal} onHide={() => setShowModal(false)}>
        <Modal.Header  style={{background:"#222" }}>
          <Modal.Title style={{color:"white",fontFamily:"Righteous"}}>Confirmation</Modal.Title>
          <Button style={{background:"none",border:"none", }} variant="danger" onClick={handleClose} className="mb-2">
              <img src={negative} alt= "upload" style={{width:"40px",height:"40px",backgroundColor:"#dc3545",padding:"5px",borderRadius:"50%"}}/>
              </Button>
        </Modal.Header>
        <Modal.Body style={{background:"#222",color:"white",fontFamily:"Righteous" }}>Are you sure you want to Logout?</Modal.Body>
        <Modal.Footer style={{background:"#222" }}>
          <Button variant="secondary" onClick={() => setShowModal(false)}>
            Cancel
          </Button>
          <Button variant="danger" onClick={handleLogout}>
            Logout
          </Button>
        </Modal.Footer>
      </Modal>


    </Navbar>
  );
}

export default NavbarH;
