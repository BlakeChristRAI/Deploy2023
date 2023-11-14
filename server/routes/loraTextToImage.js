import express from 'express';
import axios from 'axios';

import { initializeApp } from "firebase/app";
import { getFirestore, doc, getDoc } from "firebase/firestore";
import { config as dotenvConfig } from 'dotenv';
dotenvConfig();
const loraApiKey = process.env.LORA_API_KEY;
const firebaseConfig = {
  apiKey: process.env.REACT_APP_API_KEY,
  authDomain: process.env.REACT_APP_AUTH_DOMAIN,
  projectId: process.env.REACT_APP_PROJECT_ID,
  storageBucket: process.env.REACT_APP_STORAGE_BUCKET,
  messagingSenderId: process.env.REACT_APP_MESSAGING_SENDER_ID,
  appId: process.env.REACT_APP_APP_ID,
  measurementId: process.env.REACT_APP_MEASUREMENT_ID,
  databaseURL: process.env.REACT_APP_DATABASE_URL,
};


const firebaseApp = initializeApp(firebaseConfig);
const routerLoraTextToImage = express.Router();

// Function to check if a URL is accessible
async function isUrlAccessible(url) {
  try {
      const response = await axios.head(url);
      return response.status === 200;
  } catch (error) {
      return false;
  }
}

routerLoraTextToImage.post('/payLoadData', async (req, res) => {
  console.log(" in api/LoraTextToImage/payLoadData");
  try {
    const { email, text2ImagePayLoadData } = req.body;
    console.log(`Received payload data from client: ${text2ImagePayLoadData}`);
    console.log(`Received email from client: ${email}`);

    const cleanedEmail = email.replace(/[@.]/g, "");
    let fbModel_id; 
    let fbEmai ;

    // Fetch data from Firebase Realtime Database
    const db = getFirestore();
    const userRef = doc(db, "Lora_users_model_data", cleanedEmail);
    const userDoc = await getDoc(userRef);

    if (userDoc.exists()) {
      const userData = userDoc.data();
      console.log("User Data from Firestore:", userData);

      // Extract required information
      fbModel_id = userData.model_id;
      fbEmai = userData.email;    
      console.log("Firebase Model Id response is ", fbModel_id);
      console.log("Firebase Email Id response is ", fbEmai);      
    } else {
      res.status(404).json({ error: "User not found in the database" });
      return; // Exit early if user not found
    }

    const loraModelTextTOImageData = 
    {
      key: loraApiKey,
      "model_id": "sdxl",
      "prompt": text2ImagePayLoadData,
      "negative_prompt": "",
      "width": "512",
      "height": "512",
      "samples": "1",
      "num_inference_steps": "30",
      "safety_checker": "no",
      "enhance_prompt": "yes",
      "seed": null,
      "guidance_scale": 7.5,
      "multi_lingual": "no",
      "panorama": "no",
      "self_attention": "no",
      "upscale": "no",
      "embeddings_model": null,
      "lora_model": fbModel_id,
      "tomesd": "yes",
      "clip_skip": "2",
      "use_karras_sigmas": "yes",
      "vae": null,
      "lora_strength": null,
      "scheduler": "DDPMScheduler",
      "webhook": null,
      "track_id": null
    };
    
    console.log("Before calling the lora API");
    
    try {
      const loraModelTextTOImageResponse = await axios.post(
        "https://stablediffusionapi.com/api/v4/dreambooth",
        loraModelTextTOImageData
      );

      console.log("After calling the lora API");
      console.log("***************API Response*************");
      console.log(loraModelTextTOImageResponse);
      console.log("************************************");

      if (loraModelTextTOImageResponse.data.status === 'processing' && loraModelTextTOImageResponse.data.eta) {
        let delayInSeconds = loraModelTextTOImageResponse.data.eta;
        delayInSeconds = delayInSeconds + 10;
        console.log(`Waiting for ${delayInSeconds} seconds for processing to complete...`);
        
        // Wait for the specified duration
        await new Promise(resolve => setTimeout(resolve, delayInSeconds * 1000));
        console.log("completed : ", delayInSeconds);
    
        // Process the response data
        let text2ImageServerResponse;
    
        // Check if the URL is accessible
        while (true) {
            const res_data = loraModelTextTOImageResponse.data;
            const ret_url = JSON.stringify(res_data.future_links[0]);
            const cleanedUrl = ret_url.replace(/"/g, '');
            
            // Check if the URL is accessible
            if (await isUrlAccessible(cleanedUrl)) {
                text2ImageServerResponse = cleanedUrl;
                console.log("URL is accessible:", text2ImageServerResponse);
                break;
            }
    
            // If the URL is not accessible, wait for a short duration before retrying
            await new Promise(resolve => setTimeout(resolve, 5000)); // Wait for 5 seconds before retrying
        }
        
        // Send the processed response to the client
        res.json({ message: text2ImageServerResponse });
    }
    
    else if (loraModelTextTOImageResponse.data.status === 'success') {
        const res_data = loraModelTextTOImageResponse.data;
        const ret_url = JSON.stringify(res_data.output[0]);
        const cleanedUrl = ret_url.replace(/"/g, '');
        const text2ImageServerResponse = `${cleanedUrl}`;
        console.log("output", text2ImageServerResponse);
        res.json({ message: text2ImageServerResponse });
      } else {
        console.error("Lora model failed with status:", loraModelTextTOImageResponse.data.status);
        res.status(500).json({ error: "Lora model failed" });
      }
    } catch (axiosError) {
      console.error("Axios request failed:", axiosError.message);
      res.status(500).json({ error: "Internal Server Error" });
    }

  } catch (error) {
    console.error("Request failed:", error.message);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

// Error handler middleware
routerLoraTextToImage.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: 'Something went wrong!' });
});

export default routerLoraTextToImage;
