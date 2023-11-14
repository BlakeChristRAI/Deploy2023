import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import routerWebhook from './routes/routerWebhook.js';
import routerCreateLoraRequest from './routes/createLoraRequest.js'; // Use a relative path
import routerLoraTextToImage from './routes/loraTextToImage.js';
import { config as dotenvConfig } from 'dotenv';

// Load environment variables from .env file
dotenvConfig();
const app = express();
const port = process.env.PORT || 3001;

// Middleware
app.use(cors());
app.use('/api', routerWebhook);  

app.use(bodyParser.json());

// Routes
//app.use('/api', routerWebhook);  
app.use('/api/CreateLoraRequest', routerCreateLoraRequest);
app.use('/api/LoraTextToImage', routerLoraTextToImage);

// Global error handler
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: 'Something went wrong!' });
});

// Start the server
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
