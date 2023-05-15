import { Container, Row, Col } from 'react-bootstrap';
import gitHub from '../../pages/assets/github.png'
import instagram from '../../pages/assets/instagram(2).png'
import linked from '../../pages/assets/linkedin(1).png'

function Footer() {
  return (
    <footer className="bg-dark text-light py-3 bottom">
      <Container style={{marginTop:"100px"}}>
        <Row>
          <Col md={6}>
            <p>Telepon: 62+ 8982-2228-178</p>
            <p>Email: yasyirmasyal@gmail.com</p>
          </Col>
          <Col md={6}>
            <p>Ikuti kami di:</p>
            <ul className="list-inline">
              <li className="list-inline-item">
               <a href="https://github.com/yasyir90"><img alt="Github" src={gitHub} style={{width:"50px"}}/></a>           
                </li>
              <li className="list-inline-item">
              <a href="https://www.linkedin.com/in/yasyir-masy-al"><img alt="Github" src={linked} style={{width:"50px"}}/></a>    
              </li>
              <li className="list-inline-item">
              <a href="https://instagram.com/lauliet_y?igshid=ZDdkNTZiNTM="><img alt="Github" src={instagram} style={{width:"50px"}}/></a>     
              </li>
            </ul>
          </Col>
        </Row>
      </Container>
    </footer>
  );
}

export default Footer;
