import { useState } from "react";
import { Modal, Button , Form} from "react-bootstrap";
import edit from "../assets/edit-list.png"
import positive from "../assets/add-button-with-plus-symbol-in-a-black-circle.png"
import negative from '../assets/cancel-button.png'
import minus from '../assets/minus.png'
import upload from '../assets/cloud-storage-uploading-option.png'
import axios from "axios";


const EditFoodModal = ({ idFood }) => {
    const [food, setFood] = useState({
        name: "",
        description: "",
        imageUrl: "",
        ingredients: [""],
      });
  const [showModal, setShowModal] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null);
    
      const handleInputChange = (event) => {
        const { name, value } = event.target;
        setFood({ ...food, [name]: value });
      };
    
     
    
      const handleIngredientsChange = (event, index) => {
        const newIngredients = [...food.ingredients];
        newIngredients[index] = event.target.value;
        setFood({ ...food, ingredients: newIngredients });
      };
    
      const handleAddIngredient = () => {
        const newIngredients = [...food.ingredients, ""];
        setFood({ ...food, ingredients: newIngredients });
      };
    
      const handleRemoveIngredient = (index) => {
        const newIngredients = [...food.ingredients];
        newIngredients.splice(index, 1);
        setFood({ ...food, ingredients: newIngredients });
      };

      const handleImageChangeImg = (event) => {
        setSelectedImage(event.target.files[0]);
      };
    
      const handleImageUpload = async () => {
        try {
          const formData = new FormData();
          formData.append('image', selectedImage);
    
          const headers = {
            apiKey: process.env.REACT_APP_APIKEY,
            Authorization: `Bearer ${localStorage.getItem('token')}`,
            'Content-Type': 'multipart/form-data',
          };
    
          const response = await axios.post(
            `${process.env.REACT_APP_BASE_URL}/api/v1/upload-image`,
            formData,
            { headers }
          );
          const url = response.data.url
          setFood({ ...food, imageUrl: url });
    
          // Handle the response
    
    
        } catch (error) {
          console.log('Error while uploading image:', error);
          // Handle the error
        }
      };
    

      const handleSubmit = async (event) => {
        event.preventDefault();
      
        const token = localStorage.getItem("token");
      
        const headers = {
          apiKey: process.env.REACT_APP_APIKEY,
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json" // tambahkan header untuk menentukan tipe konten
        };
      
        try {
          const response = await fetch(`${process.env.REACT_APP_BASE_URL}/api/v1/update-food/${idFood}`, {
            method: "POST",
            headers,
            body: JSON.stringify(food),
          });
      
          if (response.ok) {
            // tambahkan kode untuk menampilkan pesan sukses atau melakukan navigasi ke halaman lain
    setShowModal(false)
    window.location.reload();
          } else {
            // tambahkan kode untuk menampilkan pesan kesalahan atau melakukan tindakan lain yang sesuai
          }
        } catch (error) {
          console.log(error);
          // tambahkan kode untuk menampilkan pesan kesalahan atau melakukan tindakan lain yang sesuai
        }
      };

  const handleClose = () => setShowModal(false);
  const handleShow = () => setShowModal(true);

  return (
    <>
      <Button variant="primary" onClick={handleShow} style={{background:"none",border:"none"}}>
       <img src={edit} alt="edit" style={{width:"40px",backgroundColor:"#005b8f",padding:'5px',borderRadius:"50%"}}/>
      </Button>
      <Modal show={showModal} onHide={handleClose} >
        <Modal.Header  style={{background:"#222" }}>
        <Modal.Title  style={{color:"white",fontFamily:"Righteous"}}>Edit Food</Modal.Title>
        <Button style={{background:"none",border:"none", }} variant="danger" onClick={handleClose} className="mb-2">
              <img src={negative} alt= "upload" style={{width:"40px",height:"40px",backgroundColor:"#dc3545",padding:"5px",borderRadius:"50%"}}/>
              </Button>
        </Modal.Header>
        <Modal.Body style={{background:"#222" }}>
        <Form onSubmit={handleSubmit}>
        <Form.Group controlId="name">
          <Form.Label  style={{color:"white",fontFamily:"Righteous"}}>Name</Form.Label>
          <Form.Control type="text" name="name" value={food.name} onChange={handleInputChange} />
        </Form.Group>

        <Form.Group controlId="description">
          <Form.Label  style={{color:"white",fontFamily:"Righteous"}}>Description</Form.Label>
          <Form.Control
            as="textarea"
            rows={3}
            name="description"
            value={food.description}
            onChange={handleInputChange}
          />
        </Form.Group>

        <Form.Group controlId="imageUrl">
          <Form.Label  style={{color:"white",fontFamily:"Righteous"}}>Select an image</Form.Label>
        <Form.Control
          type="file"
          accept="image/*"
          onChange={handleImageChangeImg}
        />
         <Button style={{background:"none",border:"none",marginTop:"20px" }} onClick={handleImageUpload} >
         <img src={upload} alt= "upload" style={{width:"40px",height:"40px",backgroundColor:"#005b8f",padding:"5px",borderRadius:"50%"}}/>
      </Button>
    
        </Form.Group>

        <Form.Group controlId="ingredients" style={{ marginTop: "10px" }}>
          <Form.Label  style={{color:"white",fontFamily:"Righteous"}}>Ingredients</Form.Label>
          {food.ingredients.map((ingredient, index) => (
            <div key={index} className="d-flex">
              <Form.Control
                type="text"
                value={ingredient}
                onChange={(e) => handleIngredientsChange(e, index)}
                className="mb-2 me-2"
              />
             <Button style={{background:"none",border:"none", }} variant="danger" onClick={() => handleRemoveIngredient(index)} className="mb-2">
              <img src={minus} alt= "upload" style={{width:"40px",height:"40px",backgroundColor:"#dc3545",padding:"5px",borderRadius:"50%"}}/>
              </Button>
            </div>
          ))}
           <Button  variant="success" onClick={handleAddIngredient} style={{ marginTop: "5px",background:"none",border:"none", }}>
          <img src={positive} alt= "upload" style={{width:"40px",height:"40px",backgroundColor:"#198754",padding:"5px",borderRadius:"50%"}}/>
          </Button>
        </Form.Group>

        <Button variant="primary" type="submit" style={{ marginTop: "10px" }}>
          Edit Food
        </Button>
        </Form>
        </Modal.Body>
      </Modal>
    </>
  );
};

export default EditFoodModal;
