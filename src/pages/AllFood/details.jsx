import { useState } from "react";
import { Button, Modal } from "react-bootstrap";


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
        <Button onClick={handleDetail} variant="warning">
          Detail
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
