import { useState } from "react";
import { Container, Form, Button } from "react-bootstrap";
import upload from '../assets/cloud-storage-uploading-option.png'
import add from '../assets/positive.png'
import positive from "../assets/add-button-with-plus-symbol-in-a-black-circle.png"
import axios from "axios";
import minus from '../assets/minus.png'

const AddFood = () => {
  const [food, setFood] = useState({
    name: "",
    description: "",
    imageUrl: "",
    ingredients: [""],
  });
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

  const handleSubmit = async (event) => {
    event.preventDefault();
  
    const token = localStorage.getItem("token");
  
    const headers = {
      apiKey: process.env.REACT_APP_APIKEY,
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json" // tambahkan header untuk menentukan tipe konten
    };
  
    try {
      const response = await fetch(`${process.env.REACT_APP_BASE_URL}/api/v1/create-food`, {
        method: "POST",
        headers,
        body: JSON.stringify(food),
      });
  
      if (response.ok) {
         // Setelah food berhasil dibuat, tampilkan pesan konfirmasi
    const confirmCreateAgain = window.confirm('Food berhasil dibuat! Apakah Anda ingin membuat lagi?');
    if (confirmCreateAgain) {
      // Jika pengguna ingin membuat lagi, reset form atau lakukan tindakan lainnya
      setFood({
        name: '',
        description: '',
        imageUrl: '',
        ingredients: [''],
      });
      setSelectedImage(null);
    } else {
      window.location.href = "/allfood";
    }
      }
    } catch (error) {
      console.log(error);
      // tambahkan kode untuk menampilkan pesan kesalahan atau melakukan tindakan lain yang sesuai
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

      // Handle the response


    } catch (error) {
      console.log('Error while uploading image:', error);
      // Handle the error
    }
  };


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
        <img src={add} alt= "upload" style={{width:"40px",height:"40px",backgroundColor:"none",padding:"5px",borderRadius:"50%"}}/> Add Food
        </Button>
        </Form>
        </Container>
  )
          };

export default AddFood ;
     
