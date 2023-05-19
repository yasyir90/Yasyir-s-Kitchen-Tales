import { useEffect, useState } from "react";
import { Form, Modal, Button } from "react-bootstrap";
import axios from "axios";
import ratingImg from "../assets/starred-list-on-paper.png"

const Ratings = ({ idFood }) => {
  const [ratings, setRatings] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const starPhoto =
    "https://img.icons8.com/plasticine/100/000000/star--v1.png";

  useEffect(() => {
    const fetchData = async () => {
      try {
        const token = localStorage.getItem("token");
        const headers = {
          apiKey: process.env.REACT_APP_APIKEY,
          Authorization: `Bearer ${token}`,
        };

        const response = await fetch(
          `${process.env.REACT_APP_BASE_URL}/api/v1/food-rating/${idFood}`,
          {
            method: "GET",
            headers,
          }
        );
        const foodRating = await response.json();
        const foodRatings = foodRating.data;
        setRatings(foodRatings);
      } catch (error) {
        console.log("Error while fetching food data:", error);
      }
    };

    fetchData();
  }, [idFood]);

  const handleClose = () => setShowModal(false);
  const handleShow = () => setShowModal(true);

  const [showModalRating, setShowModalRating] = useState(false);
  const [rating, setRating] = useState(0);
  const [review, setReview] = useState('');

  const handleRateFood = async () => {
    try {
      const requestBody = {
        rating: rating,
        review: review,
      };

      const headers = {
        apiKey: process.env.REACT_APP_APIKEY,
        Authorization: `Bearer ${localStorage.getItem('token')}`,
        'Content-Type': 'application/json',
      };


      const response = await axios.post(
        `${process.env.REACT_APP_BASE_URL}/api/v1/rate-food/${idFood}`,
        requestBody,
        { headers }
      );

      console.log('Response:', response);
      // Handle the response
    } catch (error) {
      console.log('Error while rating food:', error);
      // Handle the error
    }
  };

  const handleCloseModalRating = () => {
    setShowModalRating(false);
  };

  const handleOpenModalRating = () => {
    setShowModalRating(true);
  };

  const handleRatingChange = (event) => {
    setRating(Number(event.target.value));
  };

  const handleReviewChange = (event) => {
    setReview(event.target.value);
  };

  const handleSubmitRating = (event) => {
    event.preventDefault();
    handleRateFood();
    handleCloseModalRating();
  };

  return (
    <>
      <Button variant="primary" onClick={handleShow} style={{background:"none" , border:"none"}}>
       <img src={ratingImg} alt="ratings" style={{width:"40px",backgroundColor:"#005b8f",padding:"5px",borderRadius:"50%"}}/>
      </Button>

      <Modal show={showModal} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Ratings for {ratings.name}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {ratings.map((review) => (
            <div key={review.id} style={{ marginBottom: "20px" }}>
              <h5
                style={{ fontSize: "18px", fontWeight: "bold", color: "#333" }}
              >
                {review.user.name}
              </h5>
              <p style={{ fontSize: "16px", color: "#666" }}>{review.review}</p>
              <div>
                {[...Array(review.rating)].map((e, i) => (
                  <img
                    key={i}
                    src={starPhoto}
                    alt="star"
                    style={{ width: "20px", marginRight: "5px" }}
                  />
                ))}
              </div>
            </div>
          ))}
        </Modal.Body>

        <Modal.Footer>
        <Button onClick={handleOpenModalRating}>Rate Food</Button>
      <Modal show={showModalRating} onHide={handleCloseModalRating}>
        <Modal.Header closeButton>
          <Modal.Title>Rate Food</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={handleSubmitRating}>
            <Form.Group controlId="formRating">
              <Form.Label>Rating</Form.Label>
              <Form.Control
                as="select"
                value={rating}
                onChange={handleRatingChange}
              >
                <option value={1}>1</option>
                <option value={2}>2</option>
                <option value={3}>3</option>
                <option value={4}>4</option>
                <option value={5}>5</option>
              </Form.Control>
            </Form.Group>
            <Form.Group controlId="formReview">
              <Form.Label>Review</Form.Label>
              <Form.Control
                as="textarea"
                rows={3}
                value={review}
                onChange={handleReviewChange}
              />
            </Form.Group>
            <Button variant="primary" type="submit">
              Submit
            </Button>
          </Form>
        </Modal.Body>
      </Modal>

          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
        </Modal.Footer>

      </Modal>
    </>
  );
};

export default Ratings;
