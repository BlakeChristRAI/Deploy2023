import React, { useCallback, useState } from 'react';
import { useDropzone } from 'react-dropzone';
import axios from 'axios';
import '../styles/CreateLoraRequest.css';
import { useUser } from '../UserContext';
const config = require('../config'); // Adjust the path accordingly


const CreateLoraRequest = () => {
  const instance = axios.create({
    baseURL: config.baseURL,
  });
  const { loggedInEmail } = useUser();
  const [images, setImages] = useState([]);
  const [gender, setGender] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [statusMessage, setStatusMessage] = useState('');

  const onDrop = useCallback((acceptedFiles) => {
    console.log(acceptedFiles.map(file => file.type));
    setImages(acceptedFiles);
    setError('');
    setStatusMessage('');
  }, []);

  const { getRootProps, getInputProps } = useDropzone({
    onDrop,
    accept: 'image/jpeg, image/png', // Add or remove specific image types as needed
    multiple: true,
  });

  const handleGenderChange = (event) => {
    setGender(event.target.value);
  };

  const handleUpload = async () => {
    try {
      setLoading(true);

      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

      if (!loggedInEmail.trim() || !emailRegex.test(loggedInEmail.trim())) {
        setError('Please enter a valid email address.');
        setStatusMessage('');
        setLoading(false);
        return;
      }

      if (!gender) {
        setError('Please select a gender.');
        setStatusMessage('');
        setLoading(false);
        return;
      }

      if (images.length !== 8) {
        setError('');
        setStatusMessage('Please select exactly 8 images.');
        setLoading(false);
        return;
      }

      // All validations passed, proceed to send POST request

      const formData = new FormData();
      formData.append('email', loggedInEmail.trim());
      formData.append('gender', gender);

      images.forEach((image, index) => {
        formData.append('images', image);
      });

      // Make a POST request to your Node.js server
      await instance.post('/api/CreateLoraRequest/SubmitRequest', formData);

      console.log('Images uploaded successfully');
      setStatusMessage('Images uploaded successfully');

      // Clear the form after successful upload
      setGender('');
      setImages([]);
      setError('');
    } catch (error) {
      setError('Error uploading images. Please try again.');
      setStatusMessage('');
      console.error('Error uploading images:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <p>Logged in email from context API: {loggedInEmail}</p>   
      <div>
        <label>Gender:</label>
        <select value={gender} onChange={handleGenderChange}>
          <option value="">Select</option>
          <option value="men">Male</option>
          <option value="female">Female</option>
        </select>
      </div>

      <div {...getRootProps()} className="dropzone">
        <input {...getInputProps()} />
        <b>Drag & drop exactly 8 images here, or click to select 8 images</b>
      </div>

      {images.length > 0 && (
        <div className="image-preview-container">
          <div className="image-preview-box">
            {images.map((image, index) => (
              <img
                key={index}
                src={URL.createObjectURL(image)}
                alt={`Preview ${index}`}
                className="image-preview"
              />
            ))}
          </div>
        </div>
      )}

      {statusMessage && <p className="success-message">{statusMessage}</p>}
      {error && <p className="error-message">{error}</p>}

      {loading && <p>Loading...</p>}

      {images.length === 8 && (
        <button onClick={handleUpload} disabled={loading}>
          {loading ? 'Uploading...' : 'Upload Images'}
        </button>
      )}
    </div>
  );
};

export default CreateLoraRequest;
