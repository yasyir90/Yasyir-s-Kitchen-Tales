import { useEffect, useState } from "react";
import { Modal, Button } from "react-bootstrap";

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

  return (
    <>
      <Button variant="primary" onClick={handleShow}>
        View Ratings
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
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default Ratings;
