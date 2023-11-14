import express from 'express';
import multer from 'multer';
import sharp from 'sharp';
import axios from 'axios';
import { config as dotenvConfig } from 'dotenv';
import { initializeApp } from 'firebase/app';
import { getStorage, ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { getFirestore, doc, getDoc, setDoc } from 'firebase/firestore';

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
const storage = getStorage(firebaseApp);
const noOfFilesCount = 8;
const multerStorage = multer.memoryStorage();
const upload = multer({ storage: multerStorage, limits: { files: noOfFilesCount }, });

const routerCreateLoraRequest = express.Router();

routerCreateLoraRequest.post('/SubmitRequest', upload.array('images', noOfFilesCount), async (req, res) => {

  try {
    let currentTokens; // Declare currentTokens here
    const files = req.files;
    const email = req.body.email;
    const gender = req.body.gender;

    if (!files || files.length === 0) {
      return res.status(400).json({
        status: 'error',
        message: 'No files uploaded or field name is incorrect',
      });
    }

    if (!email) {  return res.status(400).json({ status: 'error', message: 'No Email Received' });    }
    if (!gender) {  return res.status(400).json({ status: 'error', message: 'No gender value Received' });  }

    const cleanedEmail = email.replace(/[@.]/g, '');

    const uploadedPaths = [];
    const userDirectoryRef = ref(storage, cleanedEmail);

    for (let i = 0; i < files.length; i++) {
      const file = files[i];
      const status = { index: i, success: false, error: null };

      try {
        const convertedBuffer = await sharp(file.buffer)
          .toFormat('png')
          .toBuffer();

        const imageName = `${i}`;
        const imageRef = ref(userDirectoryRef, imageName);
        const metatype = { contentType: 'image/png', name: imageName };

        await uploadBytes(imageRef, convertedBuffer, metatype);

        const downloadURL = await getDownloadURL(imageRef);
        uploadedPaths.push({ link: downloadURL });

        status.success = true;
      }
       catch (error) 
       {
        console.error(`Error uploading picture ${i}:`, error.message);
        status.error = error.message;
      }

      uploadedPaths.push({ log: status });
    }

    const db = getFirestore();
    const userRef = doc(db, 'Lora_users_model_data', cleanedEmail);

    try {
      const userDoc = await getDoc(userRef);

      if (userDoc.exists()) {
         currentTokens = userDoc.data().tokens || 0;

        if (currentTokens >= 1) {
          // User has enough tokens, proceed with model creation
          console.log('User has enough tokens:', currentTokens);
        } else {
          // Not enough tokens, inform the user
          console.log('Not enough tokens');
          return res.status(403).json({
            status: 'error',
            message: 'Not enough tokens',
          });
        }
      } else {
        // Document does not exist, handle accordingly
        console.log('User document does not exist');
        return res.status(404).json({
          status: 'error',
          message: 'User document not found',
        });
      }
    } catch (error) {
      console.error('Error retrieving user document:', error.message);
      return res.status(500).json({
        status: 'error',
        message: 'Internal Server Error',
        error: error.message,
      });
    }

    const instance_prompt_payload = 'photo of ' + gender;
    const class_prompt_payload = 'photo of a ' + gender;
    const training_type_payload = gender;

    const loraModeltrainingData = {
      key: loraApiKey,
      instance_prompt: instance_prompt_payload,
      class_prompt: class_prompt_payload,
      base_model_type: 'sdxl',
      negative_prompt: ' lowres, bad anatomy, bad hands, text, error, missing fingers, extra digit, fewer digits, cropped, worst quality, low quality, normal quality, jpeg artifacts, signature, watermark, username, blurry',
      images: uploadedPaths.filter((item, index) => index % 2 === 0).map((item) => item.link),
      seed: '0',
      training_type: training_type_payload,
      max_train_steps: '2',
      lora_type: 'lora',
      webhook: null,
    };

    try { const loraModelTrainingResponse = await axios.post('https://stablediffusionapi.com/api/v3/lora_fine_tune', loraModeltrainingData);

      console.log('Lora Training Response:', loraModelTrainingResponse.data);

      if (loraModelTrainingResponse.data.status === 'success') 
      {

        console.log('Lora model training successful');

        const { messege, data, training_id, model_id } = loraModelTrainingResponse.data;
        console.log('Message:', messege);
        console.log('Data:', data);
        console.log('Training ID:', training_id);
        console.log('Model ID:', model_id);

        // Adding to Firebase Firestore
        const userRef = doc(db, 'Lora_users_model_data', cleanedEmail);

        console.log('Before Firestore set operation');
        await setDoc(userRef, { email: email, model_id: model_id });
        console.log('After set operation');

        // Decrement token value by 1
        const updatedTokens = currentTokens - 1;

        // Update the token value in Firestore
        await setDoc(userRef, { tokens: updatedTokens }, { merge: true });
        

        // Send acknowledgment to the client
        res.status(200).json({
          status: 'success',
          message: 'Server side processing OK',
          acknowledgment: 'Data uploaded to Firestore successfully',
          error: '',
        });
      } else {
        console.error('Lora model training failed:', loraModelTrainingResponse.data);

        // Send an error response to the client
        res.status(500).json({
          status: 'error',
          message: 'Lora model training failed',
          error: loraModelTrainingResponse.data.error,
        });
      }
    } catch (error) {
      console.error('Error during Lora model training request:', error.message);

      // Send an error response to the client
      res.status(500).json({
        status: 'error',
        message: 'Error during Lora model training request',
        error: error.message,
      });
    }
  } catch (error) {
    console.error('Error processing request:', error.message);
    res.status(500).json({
      status: 'error',
      message: 'Internal Server Error',
      error: error.message,
    });
  }
});

export default routerCreateLoraRequest;
