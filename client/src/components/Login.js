import '../App.css';
import '../styles/Login.css';
import React from 'react';
import { createPortal } from 'react-dom';
import PortalPopup from "./PortalPopup";
import { signInWithPopup } from 'firebase/auth';
import { auth, googleProvider, facebookProvider } from '../service/firebase'; 
import { useUser } from '../UserContext';

const Login = () => {
  const { setUserEmail } = useUser();

  const handleSignIn = async (provider) => {
    try {
      const result = await signInWithPopup(auth, provider);
      const loggedInEmail = result.user.email;
      setUserEmail(loggedInEmail);
    } catch (error) {
      console.error(error.message);
    }
  };
  return (
    <PortalPopup>
    <div>
      <h1>Welcome to Radiance.AI</h1>
      <p>Unlock the power of AI with Radiance.AI. Sign in with your Google or Facebook account to get started.</p>

      <button className="button" onClick={() => handleSignIn(googleProvider)}>
        <img
          src="https://blog.hubspot.com/hubfs/image8-2.jpg"  
          alt="Google Logo"
          className="google-logo"
        />
        Sign in with Google
      </button>

      {/* <button className="button" onClick={() => handleSignIn(facebookProvider)}>
        <img
          src="https://img.freepik.com/premium-vector/social-media-icon-illustration-facebook-facebook-icon-vector-illustration_561158-2134.jpg"  // Replace with the actual path to your Facebook logo image
          alt="Facebook Logo"
          className="google-logo"
        />
        Sign in with Facebook
      </button> */}
    </div>
    </PortalPopup>
  );
};

export default Login;
