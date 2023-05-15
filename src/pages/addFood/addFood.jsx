import { useState } from "react";
import { Container, Form, Button } from "react-bootstrap";
import ImageUpload from "../../components/upload/uploadImg";
import axios from "axios";

const AddFood = () => {
  const [food, setFood] = useState({
    name: "",
    description: "",
    imageUrl: "",
    ingredients: [""],
  });
  const [selectedImage, setSelectedImage] = useState(null);
  const [imgUrl, setImgUrl] = useState(null);
  console.log(food)

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFood({ ...food, [name]: value });
  };

  const handleFileInputChange = (event) => {
    const file = event.target.files[0];
    setFood({ ...food, imageUrl: URL.createObjectURL(file) });
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
      setImgUrl(null);
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
      setImgUrl(url)
      setFood({ ...food, imageUrl: url });

      console.log('Response:', url.url);
      // Handle the response


    } catch (error) {
      console.log('Error while uploading image:', error);
      // Handle the error
    }
  };


  return (
    <Container className="bg-white p-3" style={{ width: "80vw", margin: "20px" }}>
      <Form onSubmit={handleSubmit}>
        <Form.Group controlId="name">
          <Form.Label>Name</Form.Label>
          <Form.Control type="text" name="name" value={food.name} onChange={handleInputChange} />
        </Form.Group>

        <Form.Group controlId="description">
          <Form.Label>Description</Form.Label>
          <Form.Control
            as="textarea"
            rows={3}
            name="description"
            value={food.description}
            onChange={handleInputChange}
          />
        </Form.Group>

        <Form.Group controlId="imageUrl">
          <Form.Label>Image</Form.Label>
          <Form.Label>Select an image</Form.Label>
        <Form.Control
          type="file"
          accept="image/*"
          onChange={handleImageChangeImg}
        />
         <Button variant="primary" onClick={handleImageUpload} >
        Upload Image
      </Button>

        </Form.Group>
        
     
     
        <Form.Group controlId="ingredients" style={{ marginTop: "10px" }}>
          <Form.Label>Ingredients</Form.Label>
          {food.ingredients.map((ingredient, index) => (
            <div key={index} className="d-flex">
              <Form.Control
                type="text"
                value={ingredient}
                onChange={(e) => handleIngredientsChange(e, index)}
                className="mb-2 me-2"
              />
              <Button variant="danger" onClick={() => handleRemoveIngredient(index)} className="mb-2">
                -
              </Button>
            </div>
          ))}
          <Button variant="success" onClick={handleAddIngredient} style={{ marginTop: "10px", marginLeft: "20px" }}>
            +
          </Button>
        </Form.Group>

        <Button variant="primary" type="submit" style={{ marginTop: "10px" }}>
          Add Food
        </Button>
        </Form>
        </Container>
  )
          };

export default AddFood ;
     
