import React, { useCallback, useEffect } from "react";
import NavigationBar from "../components/NavigationBar";
import ContainerAesthetic from "../components/ContainerAesthetic";
import ContainerPrompt from "../components/ContainerPrompt";
import styles from "../styles/Homepage.module.css";
import { auth } from '../service/firebase';
import { useUser } from "../UserContext";
import { getFirestore, doc, getDoc, setDoc } from 'firebase/firestore';

const Homepage = () => {
  const { generatedUrls, user } = useUser();

  const placeholerImages = [
    '//ImagesPlaceholder/RadianceAIModelPink_Portrait1.jpg',
    '/public/ImagesPlaceholder/RadianceAIFashion_FemaleOrange.jpg',
    '/image3.png',
    '/image4.png',
    '/image5.png',
    '/image6.png',
  ];
  

  const handleUserDoc = async () => {
    console.log("In handleUserDoc for firebase setup");
    const cleanedEmail = user.email.replace(/[@.]/g, "");
    const db = getFirestore();
    const userRef = doc(db, "Lora_users_model_data", cleanedEmail);

    try {
      const userDoc = await getDoc(userRef);

      if (userDoc.exists()) {
        // Document exists, fetch and display data
        const userData = userDoc.data();
        console.log("Existing User Document Data:", userData);
      } else {
        // Document does not exist, create a new one
        const initialUserData = {
          email: user.email,
          model_id: "",
          paymentIntentID: "",
          paymentStatus: "Not paid anything",
          tokens: 0,
        };
        await setDoc(userRef, initialUserData);
        console.log("New User Document Created:", initialUserData);
      }
    } catch (error) {
      console.error("Error retrieving/creating user document:", error);
    }
  };

  const onImageClick = useCallback(() => {}, []);

  useEffect(() => {
    if (user != null) {
      handleUserDoc();
    }

    const handleBeforeUnload = () => auth.signOut();
    window.onbeforeunload = handleBeforeUnload;

    return () => {
      window.onbeforeunload = null;
    };
  }, [user]);

  return (
    <div className={styles.homepage}>
      <NavigationBar />
      <ContainerAesthetic />
      <ContainerPrompt />

      <main className={styles.containerimages}>
        {generatedUrls.reverse().map((url, index) => (
          <div className={styles.cardimg} key={index}>
            <img
              className={styles.imageIcon}
              alt=""
              src={url}
              onClick={() => onImageClick(index)}
            />
          </div>
        ))}
      </main>

      



      <main className={styles.containerimages}>
        <button className={styles.cardimg}>
          <img className={styles.imageIcon}
            alt=""
            src="/ImagesPlaceholder/RadianceAIFashion_MultiColor.jpg"
            
          />
        </button>
        <button className={styles.cardimg}>
          <img
            className={styles.imageIcon}
            alt=""
            src="/ImagesPlaceholder/RadianceAIModelOrange_CloseUp1(med).jpg"
            
          />
        </button>
        <button className={styles.cardimg}>
          <img
            className={styles.imageIcon}
            alt=""
            src="/ImagesPlaceholder/RadianceAIModelPink_Portrait2.png"
            
          />
        </button>
        <button className={styles.cardimg}>
          <img
            className={styles.imageIcon}
            alt=""
            src="/ImagesPlaceholder/RadianceAI_Winter1.png"
            
          />
        </button>
        <button className={styles.cardimg}>
          <img
            className={styles.imageIcon}
            alt=""
            src="/ImagesPlaceholder/RadianceAIFashion_OrangeMale.png"
            
          />
        </button>
        <button className={styles.cardimg}>
          <img
            className={styles.imageIcon}
            alt=""
            src="/ImagesPlaceholder/RadianceAIModelPink_Portrait1.png"
            
          />
        </button>
        
      </main>



    </div>
  );
};

export default Homepage;
