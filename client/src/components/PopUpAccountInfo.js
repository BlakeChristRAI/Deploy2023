import {  useEffect, useState } from "react";

//import { useNavigate } from "react-router-dom";
//import PortalPopup from "./PortalPopup";
import { auth } from '../service/firebase';
import styles from "../styles/PopUpAccountInfo.module.css";
import { useUser } from '../UserContext';
import { getFirestore, doc, getDoc } from 'firebase/firestore';

const PopUpAccountInfo = ({ onClose }) => {
  const { user } = useUser();
  const [tokens, setTokens] = useState(0); // State to hold the tokens

  const fetchTokenData = async () => {
    const cleanedEmail = user.email.replace(/[@.]/g, "");
    const db = getFirestore();
    const userRef = doc(db, "Lora_users_model_data", cleanedEmail);

    try {
      const userDoc = await getDoc(userRef);

      if (userDoc.exists()) {
        const userData = userDoc.data();
        setTokens(userData.tokens); // Set the tokens state with the data from Firestore
      }
    } catch (error) {
      console.error("Error retrieving user document:", error);
    }
  };

  useEffect(() => {
    fetchTokenData(); // Fetch token data when the component mounts
  }, [user]);


 // const navigate = useNavigate();

 const onButtonClick = (event) => {
 const  email = user.email;
  // Open the Stripe buy link in a new tab with the provided email address
  window.open(`https://buy.stripe.com/test_4gwg12aZPb8X6OI9AA?prefilled_email=${encodeURIComponent(email)}`, "_blank");
  event.preventDefault();
  //window.location.href = "/";  

};




  //const onButton1Click = useCallback(() => {
  //  navigate("/");
  // }, [navigate]);

  return (
    <div className={styles.popupaccountinfo}>
      <div className={styles.frameclosepopup}>
        <button className={styles.buttonclose} onClick={onClose}>
          <div className={styles.buttoncloseChild} />
          <div className={styles.x}>X</div>
        </button>
      </div>
      <div className={styles.frameaccountinfo}>
        <div className={styles.frameprofiledetails}>



          <div className={styles.bidData}>{user.displayName}</div>
          <div className={styles.bidData}>{user.email}</div>

          

          <div className={styles.containerjoineddata}>
            <div className={styles.heading1}>{`Joined `}</div>
            <div className={styles.heading11}>{user.metadata.creationTime}</div>
          </div>


          <div className={styles.containerjoineddata}>
            <div className={styles.heading12}>Tokens</div>
            <div className={styles.heading11}>{tokens}</div>
          </div>

        </div>
      </div>
      <div className={styles.containerbuttons}>
        <div className={styles.button} onClick={onButtonClick}>
          <div className={styles.carddetails}>
            <div className={styles.buyTokens}>Buy Tokens</div>
          </div>
        </div>
        <button className={styles.button1} onClick={() => auth.signOut()}>
          <div className={styles.carddetails1}>
            <div className={styles.signOut}>Sign Out</div>
            
            
          </div>
          
          
        </button>
      </div>
    </div>
  );
};

export default PopUpAccountInfo;
