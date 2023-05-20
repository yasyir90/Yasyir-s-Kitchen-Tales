import { useState, useEffect } from "react";
import { Container, Button, Card } from "react-bootstrap";
import axios from "axios";
import "./AllFood.css";
import like from "../assets/heart-shape.png";
import likes from "../assets/hearts.png";
import Ratings from "./ratings";
import FoodDetails from "./details";
import EditFoodModal from "./editFood";
import DeleteFood from "./deletFood";

const AllFood = () => {
  const [dataFood, setDataFood] = useState([]);
  const [likePhoto, setLikePhoto] = useState('');
 
  // console.log(dataFood)


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
  
        idFoods.forEach(async (id) => {
          try {
            const response = await fetch(`${process.env.REACT_APP_BASE_URL}/api/v1/foods/${id}`, {
              method: "GET",
              headers,
            });
            const foodData = await response.json();
            const foodDatas = foodData.data.isLike;
            console.log(foodDatas)
            
           
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
  

 

  const handleLike = async (id, like) => {
    const token = localStorage.getItem("token");
    try {
      const headers = {
        apiKey: process.env.REACT_APP_APIKEY,
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      };
      const data = { foodId: id, like };
      const response = await fetch(
        `${process.env.REACT_APP_BASE_URL}/api/v1/like`,
        {
          method: "POST",
          headers,
          body: JSON.stringify(data),
        }
      );
      const result = await response.json();
      setLikePhoto(result.message)
      console.log(result.message)
    } catch (error) {
      console.log("Error like/unlike:", error);
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
      const result = await response.json();
      setLikePhoto(result.message)
      console.log(result.message)
     
    } catch (error) {
      console.log("Error unlike:", error);
    }
  };
  
  
  const handleLikeToggle = async (id) => {
    await handleLike(id);
    if(likePhoto === 'Food Liked'){
      await handleUnLike(id);
    }
    if(likePhoto === 'Food already liked'){
      await handleUnLike(id);
    }
    window.location.reload();
  };

 

  return (
<Container fluid className="py-5 min-vh-100 ">
  <h1 className="title text-center">All Food</h1>
  <div className="d-flex flex-wrap justify-content-center">
    {dataFood.map((food, index) => (
      <Card
        key={food.id}
        style={{ width: "18rem", marginBottom: "30px", marginRight: "20px", position: "relative",backgroundColor:"#111" }}
      >
        <Card.Img
          variant="top"
          src={food.imageUrl}
          alt="recipe image"
          className="card-img"
        />
        <div style={{ position: "absolute", top: "10px", right: "10px" }}>
          <Button style={{ background: "white", border: "none",borderRadius: "50%" ,width :"45px" , height: "45px"}}>
            <img
              onClick={() => handleLikeToggle(food.id)}
              src={food.isLike ? likes : like}
              alt="like"
              style={{ width: "20px", cursor: "pointer" }}
            />
          </Button>
        </div>
        <Card.Body>
          <Card.Title style={{ textAlign: "center" ,color:"whitesmoke"}}>{food.name}</Card.Title>


         <div style={{display: "flex" , justifyContent: "space-between"}}>
         {localStorage.getItem("role") === "admin" && (
                <DeleteFood idFood={food.id} style={{}}/>
            )}
                {localStorage.getItem("role") === "admin" && (
                 <EditFoodModal idFood={food.id} style={{}}/>
            )}

         <Ratings idFood={food.id} style={{}}/>
            <FoodDetails  food={food} />
     
        </div>
        
        
            <div style={{ marginTop: "10px", display: "flex" , justifyContent: "space-around" }}>
              <p style={{  marginBottom: "0",color:"white" }}>Rating: {food.rating}</p>
              <p style={{  marginBottom: "0" ,color:"white"}}>Total likes: {food.totalLikes}</p>
            </div>"
        </Card.Body>
      </Card>
    ))}
  </div>
</Container>
  );
  
};

export default AllFood;
