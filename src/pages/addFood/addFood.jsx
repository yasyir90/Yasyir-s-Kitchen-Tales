import { useState } from "react";
import { Container, Form, Button,Modal } from "react-bootstrap";
import upload from '../assets/cloud-storage-uploading-option.png'
import add from '../assets/positive.png'
import positive from "../assets/add-button-with-plus-symbol-in-a-black-circle.png"
import axios from "axios";
import minus from '../assets/minus.png'
import negative from '../assets/cancel-button.png'

const AddFood = () => {
  const [food, setFood] = useState({
    name: "",
    description: "",
    imageUrl: "",
    ingredients: [""],
  });
  const [selectedImage, setSelectedImage] = useState(null);
  const [eror, setEror] = useState('');
  const [succes, setSucces] = useState('');
  const [erorSumbit, setErorSumbit] = useState('');

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

  const handleSubmit = async (event) => {
    event.preventDefault();
  
    const token = localStorage.getItem("token");
  
    const headers = {
      apiKey: process.env.REACT_APP_APIKEY,
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json" // tambahkan header untuk menentukan tipe konten
    };


    if (food.name || food.description || food.imageUrl !=="") {
        try {
        const response = await fetch(`${process.env.REACT_APP_BASE_URL}/api/v1/create-food`, {
          method: "POST",
          headers,
          body: JSON.stringify(food),
        });
    
        if (response.ok) {
           // Setelah food berhasil dibuat, tampilkan pesan konfirmasi
       setShowModal(true);
 
        }
  
     
      } catch (error) {
        setEror('The file has been entered incorrectly or there is a problems')  
       }
     
    }else if(food.name || food.description || food.imageUrl === ""){
      setErorSumbit('make sure the input is loaded and filled properly') 
    }
    
  
  
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

      setSucces('image uploade success')
      setEror('')

    } catch (error) {
      setEror('Make sure the file sent is correct')
      setSucces('')
      // Handle the error
    }
  };

  const [showModal, setShowModal] = useState(false)

  const handleLogout = async () => {
    window.location.href = "/allfood";
  };

  const handleClose = () => {
    setFood({
      name: '',
      description: '',
      imageUrl: '',
      ingredients: [''],
    });
    setSelectedImage(null);
    setShowModal(false);
  }


  return (
    <Container className=" p-3" style={{ width: "80vw", margin: "20px",background:"#222",borderRadius:"20px" }}>
      <Form onSubmit={handleSubmit}>
        <Form.Group controlId="name">
          <Form.Label style={{color:"white",fontFamily:"Righteous"}}>Name</Form.Label>
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
    
      <p className="text-success mt-2">{succes}</p>
      <p className="text-danger mt-2">{eror}</p>
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
        
        <p className="text-danger mt-2">{erorSumbit}</p>

        <Button variant="primary" type="submit" style={{ marginTop: "10px" }}>
        <img src={add} alt= "upload" style={{width:"40px",height:"40px",backgroundColor:"none",padding:"5px",borderRadius:"50%"}}/> Add Food
        </Button>
        </Form>

        <Modal show={showModal} onHide={() => setShowModal(false)}>
        <Modal.Header  style={{background:"#222" }}>
          <Modal.Title style={{color:"white",fontFamily:"Righteous"}}>Confirmation</Modal.Title>
          <Button style={{background:"none",border:"none", }} variant="danger" onClick={handleClose} className="mb-2">
              <img src={negative} alt= "upload" style={{width:"40px",height:"40px",backgroundColor:"#dc3545",padding:"5px",borderRadius:"50%"}}/>
              </Button>
        </Modal.Header>
        <Modal.Body style={{background:"#222",color:"white",fontFamily:"Righteous" }}>Are you sure you want to Logout?</Modal.Body>
        <Modal.Footer style={{background:"#222" }}>
          <Button variant="secondary" onClick={handleClose}>
            Buat lagi
          </Button>
          <Button variant="danger" onClick={handleLogout}>
            Ke Home
          </Button>
        </Modal.Footer>
      </Modal>

        </Container>
  )
          };

export default AddFood ;
     
