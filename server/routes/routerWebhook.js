import { initializeApp } from 'firebase/app';
import { getFirestore, doc, getDoc, updateDoc, setDoc } from 'firebase/firestore';
import express from 'express';
import { config as dotenvConfig } from 'dotenv';

import stripePackage from 'stripe';
const stripe = stripePackage('sk_test_51O5bqCE7FZKJcKAOdOCjAgASW2WNKPSUPQN08KzolPCsjgaXEyMJ8mmU6FEiN9wUOr4YFOW4PGYTJeInKHqexs7d00ft0u8MG7');
const app = express();

dotenvConfig();

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

const routerWebhook = express.Router();
const endpointSecret = 'whsec_uQEUVF12TaIA9AiFnfqyN1Cmmgz3pxKw';

routerWebhook.post('/webhook', express.raw({ type: 'application/json' }), async (request, response) => {
  const sig = request.headers['stripe-signature'];
  let event;
  try {
    event = stripe.webhooks.constructEvent(request.body, sig, endpointSecret);
  } catch (err) {
    response.status(400).send(`Webhook Error: ${err.message}`);
    return;
  }

  // Handle the event
  switch (event.type) {
    case 'charge.succeeded':
      const chargeSucceeded = event.data.object;

      // Extract individual pieces of information
      const email = chargeSucceeded.billing_details ? chargeSucceeded.billing_details.email : null;
      const chargedReceiptURL = chargeSucceeded.receipt_url;
      const paymentIntentID = chargeSucceeded.payment_intent;
      const paymentStatus = chargeSucceeded.status;
      const paymentAmount = chargeSucceeded.amount; // Payment amount in cents
      const paymentAmountInDollars = paymentAmount / 100;

      // Print the values
      console.log("Email:", email);
      console.log("Charged Receipt URL:", chargedReceiptURL);
      console.log("Payment Intent ID:", paymentIntentID);
      console.log("Payment Status:", paymentStatus);
      console.log("Payment Amount:", paymentAmountInDollars);

      const cleanedEmail = email.replace(/[@.]/g, "");

      const db = getFirestore();
      const userRef = doc(db, "Lora_users_model_data", cleanedEmail);

      try {
        const userDoc = await getDoc(userRef);

        if (userDoc.exists()) {
          // Update the paymentIntentID and paymentStatus in the Firestore database
          await updateDoc(userRef, {  paymentIntentID, paymentStatus, });

          // Log the updated values
          console.log("Updated Payment Intent ID:", paymentIntentID);
          console.log("Updated Payment Status:", paymentStatus);

          const existingTokens = userDoc.data().tokens || 0;
          const newTokens = existingTokens + paymentAmountInDollars;

          // Update the tokens value in the Firestore database
          await updateDoc(userRef, { tokens: newTokens });

          // Log the updated tokens value
          console.log("Updated Tokens Value:", newTokens);
        } else {
          console.log("User document does not exist.");
        }
      } catch (error) {
        console.error("Error retrieving user document:", error);
      }

      break;

    case 'payment_intent.succeeded':
      const paymentIntentSucceeded = event.data.object;
      // Then define and call a function to handle the event payment_intent.succeeded
      break;

    default:
      console.log(`Unhandled event type ${event.type}`);
  }

  response.send();
});


export default routerWebhook;
