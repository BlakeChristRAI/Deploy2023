import React, { useState } from "react";
import axios from "axios";
import "../styles/LoraTextToImage.css";
import { useUser } from '../UserContext';
const config = require('../config'); // Adjust the path accordingly


const LoraTextToImage = () => {
  const instance = axios.create({
    baseURL: config.baseURL,
  });
  const { loggedInEmail } = useUser();
  const [text2ImagePayLoadData, setText2ImagePayLoadData] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [text2ImageServerResponse, setText2ImageServerResponse] = useState("");

  const handleText2ImagePayloadChange = (e) =>
    setText2ImagePayLoadData(e.target.value);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setLoading(true);
      setError("");

      // Basic email validation
      if (!/^\S+@\S+\.\S+$/.test(loggedInEmail)) {
        setError("Invalid email address.");
        return;
      }
      console.log("******************************");
      console.log(loggedInEmail)
      console.log(typeof(loggedInEmail));
      console.log("******************************");

        const response = await instance.post("/api/LoraTextToImage/payLoadData", 
          {
          email: loggedInEmail, // Use user.email directly
          text2ImagePayLoadData,
        }
      );

      console.log("Server Response:", response.data);

      if (response.data && response.data.message) {
        setText2ImageServerResponse(response.data.message);
        // Clear the form upon successful submission
        setText2ImagePayLoadData("");
      } else {
        setError("Unexpected server response. Please try again.");
      }
    } catch (error) {
      console.error("Error processing Lora Text To Image:", error.message);
      setError("Error processing Lora Text To Image. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="LoraTextToImage">
      <form className="form" onSubmit={handleSubmit}>
       
        <p>Logged in email from context API: {loggedInEmail}</p>


        <label>
          Lora Text To Image Payload:
          <textarea
            type="text"
            value={text2ImagePayLoadData}
            onChange={handleText2ImagePayloadChange}
            rows="10"
          />
        </label>

        <button type="submit" disabled={loading}>
          {loading ? "Processing..." : "Submit"}
        </button>
      </form>

      {loading && <p>Loading...</p>}
      {error && <p className="error-message">{error}</p>}

      {text2ImageServerResponse && (
        <div className="img-container">
          <h3>Lora Text To Image Server Response</h3>
          <img
            src={text2ImageServerResponse}
            alt=""
            style={{ width: "512px", height: "512px" }}
          />
        </div>
      )}
    </div>
  );
};



export default LoraTextToImage;
