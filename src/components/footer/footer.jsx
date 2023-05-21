import { Container, Row, Col } from 'react-bootstrap';
import gitHub from '../../pages/assets/github.png'
import instagram from '../../pages/assets/instagram(2).png'
import linked from '../../pages/assets/linkedin(1).png'
import email from  '../assets/new-email-outlined-envelope-back.png'
import telephon from '../assets/phone-working-indicator.png'
import './footer.css'

function Footer() {
  return (
    <footer className="bg-dark text-light py-0 bottom">
      <Container style={{marginTop:"100px"}}>
        <Row>
          <Col md={6} >
          <h2  style={{color:"white",fontFamily:"Righteous",textAlign:"center"}}>Hubungi kami di:</h2>
          <ul className="list-inline" style={{marginTop:"20px",display:"flex",justifyContent:"center"}}>

              <li className="list-inline-item">
              <div className='containerContact' style={{marginRight:"30px"}}>
              <div className='pContactRed'><p>Telepon: 62+ 8982-2228-178</p></div>
        <img alt="telephon" src={telephon} style={{width:"50px",backgroundColor:"#005b8f",padding:'5px',borderRadius:"50%"}}/>
        </div>           
                </li>

              <li className="list-inline-item">
              <div className='containerContact'>
              <div className='pContactBlue'><p >Email: yasyirmasyal@gmail.com</p></div>
        <img alt="email" src={email} style={{width:"50px",backgroundColor:"#dc3545",padding:'5px',borderRadius:"50%"}}/>
          
        </div>   
              </li>

            </ul>
      

   
          </Col>
          <Col md={6}>
            <h2  style={{color:"white",fontFamily:"Righteous",textAlign:"center"}}>Ikuti kami di:</h2>
            <ul className="list-inline" style={{marginTop:"20px",display:"flex",justifyContent:"center"}}>
              <li className="list-inline-item">
              <div className='containerSosialMedia' >
              <div className='pSosmedGren' >
        <a href="https://github.com/yasyir90">git hub</a> 
        </div>

        <img alt="email" src={gitHub} style={{width:"50px",backgroundColor:"#198754",padding:'5px',borderRadius:"50%"}}/>
       
        </div>           
                </li>

              <li className="list-inline-item">
              <div className='containerSosialMedia'>
                
        <div className='pSosmedGren' >
        <a href="https://www.linkedin.com/in/yasyir-masy-al">yasyir masy'al</a> 
        </div>
        
        <img alt="email" src={linked} style={{width:"50px",backgroundColor:"#005b8f",padding:'5px',borderRadius:"50%"}}/>

        </div>     
              </li>

              <li className="list-inline-item">
              <div className='containerSosialMedia'>
              <div className='pSosmedGren' >
        <a href="https://instagram.com/lauliet_y?igshid=ZDdkNTZiNTM=">lauliet_y</a>  
        </div>
        <img alt="email" src={instagram} style={{width:"50px",backgroundColor:"#ffcc00",padding:'5px',borderRadius:"50%"}}/>

       
      
        </div>    
              </li>
            </ul>
          </Col>
        </Row>
      
      </Container>
        <div style={{width:"100%" ,height:"50px",backgroundColor:"#111"}}><p style={{textAlign:"center",paddingTop:"10px"}}>© Yasyir Masyal 2023</p></div>
    </footer>
  );
}

export default Footer;
