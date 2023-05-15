import { Container, Nav, Navbar, NavDropdown } from 'react-bootstrap';
import './navbar.css';
import logo from './logo.png';
import { Link } from 'react-router-dom';
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


  
  return (
    <Navbar expand="lg" sticky="top" style={{ backgroundColor: '#3c4a3e' }}>
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
                {localStorage.getItem("role") === "admin" && (
                  <NavDropdown.Item  as={Link} to="/all-users">
                    All User
                  </NavDropdown.Item>
                )}
                <NavDropdown.Divider />
                <NavDropdown.Item onClick={() => {
  localStorage.clear();
  window.location.reload();
}}>
  Logout
</NavDropdown.Item>
              </NavDropdown>
            ) : (
              <div className='d-flex'>
              <Nav.Link as={Link} to="/login" className="log">
               Login
             </Nav.Link>
              <Nav.Link as={Link} to="/Signin" className="log">
               Signin
             </Nav.Link>
             </div>
            )}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default NavbarH;
