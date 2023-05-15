import React, { useState } from 'react';
import { Form, Button } from 'react-bootstrap';
import axios from 'axios';

const ImageUpload = () => {
  const [selectedImage, setSelectedImage] = useState(null);
  const [imgUrl, setImgUrl] = useState(null);
  

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
      const url = response.data
      setImgUrl(url)

      console.log('Response:', url.url);
      // Handle the response

    } catch (error) {
      console.log('Error while uploading image:', error);
      // Handle the error
    }
  };

  return (
    <div>
      <Form.Group controlId="formBasicImage">
        <Form.Label>Select an image</Form.Label>
        <Form.Control
          type="file"
          accept="image/*"
          onChange={handleImageChangeImg}
        />
      </Form.Group>

      <Button variant="primary" onClick={handleImageUpload}>
        Upload Image
      </Button>
    </div>
  );
};

export default ImageUpload;
