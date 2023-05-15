import { useState } from "react";
import { Modal, Button , Form} from "react-bootstrap";

const EditFoodModal = ({ idFood }) => {
    const [food, setFood] = useState({
        name: "",
        description: "",
        imageUrl: "",
        ingredients: [""],
      });
  const [showModal, setShowModal] = useState(false);
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
          const response = await fetch(`${process.env.REACT_APP_BASE_URL}/api/v1/update-food/${idFood}`, {
            method: "POST",
            headers,
            body: JSON.stringify(food),
          });
      
          if (response.ok) {
            console.log("Food added successfully");
            // tambahkan kode untuk menampilkan pesan sukses atau melakukan navigasi ke halaman lain
    setShowModal(false)
    window.location.reload();
          } else {
            console.log(response);
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
      <Button variant="primary" onClick={handleShow}>
        Edit Food
      </Button>
      <Modal show={showModal} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Edit Food</Modal.Title>
        </Modal.Header>
        <Modal.Body>
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
          <Form.Control type="file" name="imageUrl" onChange={handleFileInputChange} />
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
        </Modal.Body>
      </Modal>
    </>
  );
};

export default EditFoodModal;
