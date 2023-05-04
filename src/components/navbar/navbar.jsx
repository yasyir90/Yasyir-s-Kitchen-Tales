import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import './navbar.css'
import logo from './logo.png'

function NavbarH() {
  return (
    <Navbar expand="lg" sticky="top" style={{backgroundColor: '#3c4a3e'}} >
    <Container fluid className="px-lg-5">
      <Navbar.Toggle aria-controls="navbarSupportContent" id="togle" />
      <Navbar.Collapse id="navbarSupportContent">
        <Nav className="link"  defaultActiveKey="/">
        <Nav.Link  to="/">
              <img src={logo} alt='logo' style={{ width: '35px',}}/>
            </Nav.Link>
          <Nav.Link  to="/">
            Home
          </Nav.Link>
          <Nav.Link  to="/allfood">
            All Food
          </Nav.Link>
          {localStorage.getItem("token") && (
            <Nav.Link  to="/favorite">
              Favorite
            </Nav.Link>
          )}
          {localStorage.getItem("role") === "admin" && (
            <Nav.Link  to="/add-food">
              Add Food
            </Nav.Link>
          )}
        </Nav>
        <Navbar.Brand  to="/">
          {/* <span className="mx-1 logo fs-1 text-focus-in">Yasyir's Kitchen Tales</span> */}
        </Navbar.Brand>
        <Nav className="link">
          {localStorage.getItem("token") ? (
            <NavDropdown id="basic-nav-dropdown drp">
              <NavDropdown.Item  to={`/profile`}>
                My Profile
              </NavDropdown.Item>
              {localStorage.getItem("role") === "admin" && (
                <NavDropdown.Item  to="/all-users">
                  All User
                </NavDropdown.Item>
              )}
              <NavDropdown.Divider />
              <NavDropdown.Item >
                Logout
              </NavDropdown.Item>
            </NavDropdown>
          ) : (
            <Nav.Link  to="/login" className="log">
              Login
            </Nav.Link>
          )}
        </Nav>
      </Navbar.Collapse>
    </Container>
  </Navbar>
  );
}

export default NavbarH;