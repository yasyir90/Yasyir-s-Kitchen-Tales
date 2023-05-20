import { useState } from "react";
import { Button, Modal } from "react-bootstrap";
import detail from '../assets/research-work.png'
import negative from '../assets/cancel-button.png'


function FoodDetails({ food }) {
  const [showModal, setShowModal] = useState(false);

  const handleDetail = () => {
    setShowModal(true);
  };

  const handleClose = () => {
    setShowModal(false);
  };

  return (
    <div className="food-item">
      <div className="header">
        <Button onClick={handleDetail} style={{background:'none',border:"none"}}>
         <img src={detail} alt="detail" style={{width:"40px",padding:"5px",backgroundColor:"#ffcc00",borderRadius:"50%"}}/>
        </Button>
      </div>

      <Modal show={showModal} onHide={handleClose}>
        <Modal.Header  style={{background:"#222" }}>
          <Modal.Title  style={{color:"white",fontFamily:"Righteous"}}>{food.name} Details</Modal.Title>
          <Button style={{background:"none",border:"none", }} variant="danger" onClick={handleClose} className="mb-2">
              <img src={negative} alt= "upload" style={{width:"40px",height:"40px",backgroundColor:"#dc3545",padding:"5px",borderRadius:"50%"}}/>
              </Button>
        </Modal.Header>
        <Modal.Body style={{background:"#222" }}>
          <p   style={{color:"white",fontFamily:"Righteous"}}>Ingredients: {food.ingredients.join(", ")}</p>
          <p   style={{color:"white",fontFamily:"Righteous"}}>Description: {food.description}</p>
        </Modal.Body>
        <Modal.Footer style={{background:"#222" }}>
         
        </Modal.Footer>
      </Modal>
    </div>
  );
}

export default FoodDetails;
