import React, {useState, useCallback } from "react";
import styles from "../styles/Login2.module.css";
import PortalPopup from "./PortalPopup";
import { signInWithPopup } from "firebase/auth";
import { auth, googleProvider } from "../service/firebase";
import { useUser } from "../UserContext";

const Login2 = ({ onClose }) => {
  const { setUserEmail, setUserDetails } = useUser();
  const [isCheckboxChecked, setCheckboxChecked] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const onRadianceaiClick = useCallback(() => {
    // TODO: MAKE PAGE REFRESH
    window.location.reload();
  }, []);
  const handleCheckboxChange = () => {
    setCheckboxChecked(!isCheckboxChecked);
  };
  const handleSignIn = async (provider) => {
    try {
      
     
      const result = await signInWithPopup(auth, provider);
      console.log(result.user);
      const loggedInEmail = result.user.email;
      setUserEmail(loggedInEmail);
      setUserDetails(result.user); // Set user details in the context
    } catch (error) {
      console.error(error.message);
    }
  };

  return (
    <PortalPopup>
      <div className={styles.login}>
        <div className={styles.closepopup}>
          <button className={styles.buttonclose} onClick={onClose}>
            <div className={styles.buttoncloseChild} />
            <div className={styles.x}>X</div>
          </button>
        </div>

        <button className={styles.radianceai} onClick={onRadianceaiClick}>
          radiance.ai
        </button>

        <div className={styles.title}>
          <div className={styles.heading1}>Welcome!!</div>
        </div>

        <div className={styles.body}>
          <div className={styles.heading3}>
            <p
              className={styles.shopConfidentlyFor}
            >{`Shop confidently for clothes online using our AI to be your own model. Helping you get a sense of the look before you buy. `}</p>
            <p className={styles.shopConfidentlyFor}>&nbsp;</p>
            <p className={styles.shopConfidentlyFor}>
              Please note that our current AI is a research preview and may
              generate imperfections, inaccuracies, and defects. We are actively
              working to improve it and shape the future!
            </p>
          </div>
          {/* <img className={styles.bodyChild} alt="" src="/line-1.svg" /> */}

          <div className={styles.termspp}>
            <input
              className={styles.rectangle}
              required={true}
              type="checkbox"
              onChange={handleCheckboxChange}
            />
            <a
              className={styles.text3}
              href="https://radianceai.notion.site/Terms-of-Use-d9c7d0207bb84fd487d1c6ff1a910880"
              target="_blank"
            >
              I agree to the Terms and Privacy Policy.
            </a>
          </div>
          <h5>{errorMessage}</h5>

          <button
            className={styles.googlebutton}
            onClick={() => isCheckboxChecked && handleSignIn(googleProvider)}
            disabled={!isCheckboxChecked}
          >
            <img className={styles.googleG1} alt="" src="/LogoGoogleG.svg" />
            <div className={styles.buttontext}>Sign in with Google</div>
          </button>

          {/* Uncomment the following block when you want to enable Facebook login */}
          {/* <button className={styles.facebookbutton} onClick={() => handleSignIn(facebookProvider)}>
            <img className={styles.facebookLogo} src="https://img.freepik.com/premium-vector/social-media-icon-illustration-facebook-facebook-icon-vector-illustration_561158-2134.jpg" alt="Facebook Logo" />
            <div className={styles.buttontext}>Sign in with Facebook</div>
          </button> */}
        </div>

        <button
          className={styles.button}
          onClick={() => isCheckboxChecked && handleSignIn(googleProvider)}
          disabled={!isCheckboxChecked}
        >
          <div className={styles.youAreRadiant}>You are radiant.</div>
        </button>
      </div>
    </PortalPopup>
  );
};

export default Login2;
