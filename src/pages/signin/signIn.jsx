import React, { useState } from 'react';
import { Form, Button } from 'react-bootstrap';
import axios from 'axios';
import { Link } from 'react-router-dom';
import upload from '../assets/cloud-storage-uploading-option.png'
import negative from '../assets/cancel-button.png'
import hide from './blind.png'
import show from './vision.png'


const Signin = () => {

  const [userData, setUserData] = useState({
    name: '',
    email: '',
    password: '',
    passwordRepeat: '',
    role: '',
    profilePictureUrl: '',
    phoneNumber: '',
  });
  const [selectedImage, setSelectedImage] = useState ('https://img.freepik.com/free-vector/illustration-businessman_53876-5856.jpg?w=740&t=st=1683341675~exp=1683342275~hmac=d0f680af5e04b5034a756e6ebb404db85608e2226d6c18d4dc85bae2c5b93da3');
  const [eror, setEror] = useState('');
  const [succes, setSucces] = useState('');
  const [erorSumbit, setErorSumbit] = useState('');
  const [showPassword, setShowPassword] = useState(false);




  const handleChange = (event) => {
    const { name, value } = event.target;

    setUserData((prevUserData) => ({
      ...prevUserData,
      [name]: value,
    }));

   

  };




  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const headers = {
        apiKey: process.env.REACT_APP_APIKEY,
      };
       await axios.post(
        `${process.env.REACT_APP_BASE_URL}/api/v1/register`,
        userData,
        { headers }
      );
      // Clear the form fields
      setUserData({
        name: '',
        email: '',
        password: '',
        passwordRepeat: '',
        role: '',
        profilePictureUrl: '',
        phoneNumber: '',
      });
      window.location.href = "/login";
    } catch (error) {
      setErorSumbit('Make sure the input is filled in correctly')
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
      setUserData({ ...userData, profilePictureUrl: url });
      setSelectedImage(url)
      setSucces('image uploade success')
      setEror('')


    } catch (error) {
      setEror('Make sure the file sent is correct')
      setSucces('')
    }
  };

  const handleClose = () => {
    window.location.href = "/";
  }
 

  const togglePasswordVisibility = () => {
    setShowPassword((prevShowPassword) => !prevShowPassword);
  };


  return (
    <div className="d-flex justify-content-center align-items-center" style={{ width: '100%', minHeight: '100vh' ,marginTop:"20px",marginBottom:"20px"}}>
     
      <Form className="background p-4" onSubmit={handleSubmit} style={{background:"#222" }}>

       <div style={{display:"flex" , justifyContent:"space-between"}}>
       <h3 className="mb-4" style={{color:"white",fontFamily:"Righteous"}}> Create Account</h3>
        <Button style={{background:"none",border:"none", }} variant="danger" onClick={handleClose} className="mb-2">
              <img src={negative} alt= "upload" style={{width:"40px",height:"40px",backgroundColor:"#dc3545",padding:"5px",borderRadius:"50%"}}/>
              </Button>
       </div>
       

        <div style={{width:"100%" , height: "200px"}} className='d-flex justify-content-center'>
        <img style={{width:"200px",height: "200px", borderRadius: "50%"}} onChange={handleImageChangeImg} src={selectedImage} alt='gambar'/>
      </div>

      <Form.Group className="mb-3" controlId="formBasicName" >
        <Form.Label style={{color:"white",fontFamily:"Righteous"}}>Name</Form.Label>
        <Form.Control
          type="text"
          placeholder="Enter name"
          name="name"
          value={userData.name}
          onChange={handleChange}
          pattern="[A-Za-z\s]+"
          maxLength={30}
          required
        />
        <Form.Control.Feedback type="invalid" style={{color:"white",fontFamily:"Righteous"}}>
          Name is required and should contain only letters.
        </Form.Control.Feedback>
      </Form.Group>

        <Form.Group className="mb-3" controlId="formBasicEmail">
          <Form.Label style={{color:"white",fontFamily:"Righteous"}}>Email address</Form.Label>
          <Form.Control type="email" placeholder="Enter email" name="email" value={userData.email} onChange={handleChange} />
        </Form.Group>

        <Form.Group className="mb-3" controlId="formBasicPassword">
          <Form.Label style={{color:"white",fontFamily:"Righteous"}}>Password</Form.Label>
          <Form.Control  type={showPassword ? 'text' : 'password'} placeholder="Enter password" name="password" value={userData.password} onChange={handleChange} />
        </Form.Group>

        <button
              type="button"
              className="toggle-password"
              onClick={togglePasswordVisibility}
              style={{background:"none", border:"none"}}
            >
              {showPassword ? 
             <img src={hide} alt= "upload" style={{width:"40px",height:"40px",backgroundColor:"#005b8f",padding:"5px",borderRadius:"50%"}}/> :    <img src={show} alt= "upload" style={{width:"40px",height:"40px",backgroundColor:"#dc3545",padding:"5px",borderRadius:"50%"}}/>
              }
            </button>
        

        <Form.Group className="mb-3" controlId="formBasicPasswordRepeat">
          <Form.Label style={{color:"white",fontFamily:"Righteous"}}>Repeat Password</Form.Label>
          <Form.Control type={showPassword ? 'text' : 'password'}  placeholder="Enter password again" name="passwordRepeat" value={userData.passwordRepeat} onChange={handleChange} />
        </Form.Group>

        <Form.Group className="mb-3" controlId="formBasicRole">
        <Form.Label style={{color:"white",fontFamily:"Righteous"}}>Role</Form.Label>
        <div>
          <Form.Check
            type="radio"
            label="Admin"
            name="role"
            value="admin"
            checked={userData.role === 'admin'}
            onChange={handleChange}
            style={{color:"white",fontFamily:"Righteous"}}
          />
          <Form.Check
            type="radio"
            label="User"
            name="role"
            value="user"
            checked={userData.role === 'user'}
            onChange={handleChange}
            style={{color:"white",fontFamily:"Righteous"}}
          />
        </div>
      </Form.Group>

        <Form.Group className="mb-3" controlId="formBasicProfilePictureUrl">
          <Form.Label style={{color:"white",fontFamily:"Righteous"}}>Profile Picture URL</Form.Label>
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

        <Form.Group className="mb-3" controlId="formBasicPhoneNumber">
          <Form.Label style={{color:"white",fontFamily:"Righteous"}}>Phone Number</Form.Label>
          <Form.Control type="text" placeholder="Enter phone number" name="phoneNumber" value={userData.phoneNumber} onChange={handleChange} />
        </Form.Group>
        <p className="text-danger mt-2">{erorSumbit}</p>
        <Button variant="primary" type="submit" className="w-100">
          Submit
        </Button>

        <Link as={Link} style={{textDecoration:"none",marginTop:"10px" ,marginBottom:"10px"}} to="/login" className="forgot-password text-right mt-2">
            Sudah punya akun
          </Link>
      </Form>
    </div>
  );
};

export default Signin;
