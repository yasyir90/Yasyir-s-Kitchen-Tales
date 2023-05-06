import { Container, Row, Col } from 'react-bootstrap';

function Footer() {
  return (
    <footer className="bg-dark text-light py-3 bottom">
      <Container>
        <Row>
          <Col md={6}>
            <p>Alamat: Jalan Raya No.123, Jakarta Selatan</p>
            <p>Telepon: 021-1234567</p>
            <p>Email: info@contoh.com</p>
          </Col>
          <Col md={6}>
            <p>Ikuti kami di:</p>
            <ul className="list-inline">
              <li className="list-inline-item">
                <i>facebook</i>              
                </li>
              <li className="list-inline-item">
              <i>facebook</i>    
              </li>
              <li className="list-inline-item">
              <i>facebook</i>    
              </li>
            </ul>
          </Col>
        </Row>
      </Container>
    </footer>
  );
}

export default Footer;
