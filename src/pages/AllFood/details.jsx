import { useState } from "react";
import { Button, Modal } from "react-bootstrap";
import detail from '../assets/research-work.png'


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
        <Modal.Header closeButton>
          <Modal.Title>{food.name} Details</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <p>Ingredients: {food.ingredients.join(", ")}</p>
          <p>Detail: {food.detail}</p>
          <p>Description: {food.description}</p>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}

export default FoodDetails;
