import React, { useState } from "react";
import { Button, Modal } from "react-bootstrap";

function DeleteFood({ idFood }) {
  const [showModal, setShowModal] = useState(false);

  const handleDelete = async () => {
    try {
      const token = localStorage.getItem("token");
      const headers = {
        apiKey: process.env.REACT_APP_APIKEY,
        Authorization: `Bearer ${token}`,
      };

      await fetch(
        `${process.env.REACT_APP_BASE_URL}/api/v1/delete-food/${idFood}`,
        {
          method: "DELETE",
          headers,
        }
      );

      // Handle the response or perform any necessary actions after deletion

      // Close the modal
      setShowModal(false);
       window.location.reload();
    } catch (error) {
      console.log("Error while deleting food:", error);
      // Handle the error
    }
  };

  return (
    <div className="food-item">
      <div className="header">
        <Button onClick={() => setShowModal(true)} variant="danger">
          Delete
        </Button>
      </div>

      {/* Modal */}
      <Modal show={showModal} onHide={() => setShowModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Confirmation</Modal.Title>
        </Modal.Header>
        <Modal.Body>Are you sure you want to delete this food?</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowModal(false)}>
            Cancel
          </Button>
          <Button variant="danger" onClick={handleDelete}>
            Delete
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}

export default DeleteFood;
