import React from "react";
import './description.css'
import { Container } from "react-bootstrap";
import { Link } from "react-router-dom";

const Description =()=>{
    return(
     <Container>
           <div style={{marginTop: '250px',marginBottom: "250px"}}>
            <span className="mx-1 logo fs-1 text-focus-in">Yasyir's Kitchen Tales</span>
            <p style={{color: 'white'}}>Yasyir's Kitchen Tales adalah sebuah situs yang menyediakan kumpulan resep makanan dari berbagai jenis dan masakan yang dapat diakses secara online. Situs ini berisi berbagai macam resep mulai dari makanan ringan hingga hidangan utama, dari masakan tradisional hingga masakan modern, dan dari resep vegetarian hingga daging.</p>
      
      
      {localStorage.getItem("role") === "admin" && (
                 <Link as={Link} to='/allfood' className="button">
                 view recipe
                 </Link>
            )}

        </div>
     </Container>
    )
}

export default Description ;