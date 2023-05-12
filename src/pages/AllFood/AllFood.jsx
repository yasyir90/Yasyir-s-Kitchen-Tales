import { useState, useEffect } from "react";
import { Container, Button, Card } from "react-bootstrap";
import axios from "axios";
import "./AllFood.css";
import like from "../assets/heart-shape.png";
import likes from "../assets/hearts.png";

const AllFood = () => {
  const [dataFood, setDataFood] = useState([]);
  const [likePhoto, setLikePhoto] = useState([like ]);
 

  useEffect(() => {
    const fetchData = async () => {
      try {
        const token = localStorage.getItem("token");
        const headers = {
          apiKey: process.env.REACT_APP_APIKEY,
          Authorization: `Bearer ${token}`,
        };

        const response = await axios.get(
          `${process.env.REACT_APP_BASE_URL}/api/v1/foods`,
          { headers }
        );
        const dataAllFood = response.data.data;
        setDataFood(dataAllFood);
 
   
        const idFoods = dataAllFood.map((item) => item.id);
        // console.log(idFoods)

           
 

        idFoods.forEach(async (id) => {
          try {
            const response = await fetch(`${process.env.REACT_APP_BASE_URL}/api/v1/foods/${id}`, {
              method: "GET",
              headers,
            });
            const foodData = await response.json();
            const foodDatas = foodData.data;
            if(foodDatas === true){
              setLikePhoto(likes)
            }
            console.log(foodDatas);
          } catch (error) {
            console.log("Error while fetching food data:", error);
          }
        });
        
      
      } catch (error) {
        console.log("Error while fetching data:", error);
      }
    };

    fetchData();
  }, []);

  


  

  const handleLike = async (id) => {
    const token = localStorage.getItem("token");
    try {
      const headers = {
        apiKey: process.env.REACT_APP_APIKEY,
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      };
      const data = { foodId: id };
      const response = await fetch(
        `${process.env.REACT_APP_BASE_URL}/api/v1/like`,
        {
          method: "POST",
          headers,
          body: JSON.stringify(data),
        }
      );
      const like = await response.json();
      console.log(like);
      
     
    } catch (error) {
      console.log("Error like:", error);
    }
  };

  const handleUnLike = async (id) => {
    const token = localStorage.getItem("token");
    try {
      const headers = {
        apiKey: process.env.REACT_APP_APIKEY,
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      };
      const data = { foodId: id };
      const response = await fetch(
        `${process.env.REACT_APP_BASE_URL}/api/v1/unlike`,
        {
          method: "POST",
          headers,
          body: JSON.stringify(data),
        }
      );
      const like = await response.json();
      console.log(like);
      
     
    } catch (error) {
      console.log("Error like:", error);
    }
  };
  
  // console.log(dataFood)

  return (
    <Container fluid className="py-5 min-vh-100 ">
      <h1 className="title text-center">All Food</h1>
      <div className="d-flex flex-wrap justify-content-center">
        {dataFood.map((food, index) => (
          <Card
            key={food.id}
            style={{ width: "18rem", marginBottom: "30px", marginRight: "20px" }}
          >
            <Card.Img
              variant="top"
              src={food.imageUrl}
              alt="recipe image"
              className="card-img"
            />
            <Card.Body>
              <Card.Title style={{ textAlign: "center" }}>{food.name}</Card.Title>
              <div style={{ display: "flex", justifyContent: "center" }}>
                <Button variant="warning">View Recipe</Button>
                <Button style={{ background: "none", border: "none" }}>
                  <img
                    onClick={() => {
                      handleUnLike(food.id);
                      handleLike(food.id);
                    }}
                    src={likePhoto}
                    alt="like"
                    style={{ width: "20px", marginLeft: "10px", cursor: "pointer" }}
                  />
                </Button>
              </div>
            </Card.Body>
          </Card>
        ))}
      </div>
    </Container>
  );
};

export default AllFood;
