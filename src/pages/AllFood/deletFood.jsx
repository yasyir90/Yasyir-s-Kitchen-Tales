import React, { useState } from "react";
import { Button, Modal } from "react-bootstrap";
import del from "../assets/delete.png"
import negative from '../assets/cancel-button.png'

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
  const handleClose = () => setShowModal(false);

  return (
    <div className="food-item">
      <div className="header">
        <Button onClick={() => setShowModal(true)} style={{background:"none",border:"none"}}>
         <img src={del} style={{width:"40px" , padding:"5px" , backgroundColor:"#DC3545",borderRadius:"50%"}}  alt="delet"/>
        </Button>
      </div>

      {/* Modal */}
      <Modal show={showModal} onHide={() => setShowModal(false)}>
        <Modal.Header  style={{background:"#222" }}>
          <Modal.Title style={{color:"white",fontFamily:"Righteous"}}>Confirmation</Modal.Title>
          <Button style={{background:"none",border:"none", }} variant="danger" onClick={handleClose} className="mb-2">
              <img src={negative} alt= "upload" style={{width:"40px",height:"40px",backgroundColor:"#dc3545",padding:"5px",borderRadius:"50%"}}/>
              </Button>
        </Modal.Header>
        <Modal.Body style={{background:"#222",color:"white",fontFamily:"Righteous" }}>Are you sure you want to delete this food?</Modal.Body>
        <Modal.Footer style={{background:"#222" }}>
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
