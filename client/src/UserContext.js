// UserContext.js
import { createContext, useContext, useState } from 'react';

const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [loggedInEmail, setLoggedInEmail] = useState(null);
  const [generatedUrls, setGeneratedUrls] = useState([]);
  const [user, setUser] = useState(null); // Add user state
  const [currentPrompt, setCurrentPrompt] = useState(""); // Add currentPrompt state



  const setUserEmail = (email) => {
    setLoggedInEmail(email);
  };

  const addGeneratedUrl = (url) => {
    setGeneratedUrls((prevUrls) => [...prevUrls, url]);
  };

  const setUserDetails = (userData) => {
    setUser(userData);
  };
  
  const setCurrentActivityPrompt = (prompt) => {
    setCurrentPrompt(prompt);
  };

  return (
    <UserContext.Provider value={{ loggedInEmail, setUserEmail, generatedUrls, addGeneratedUrl,user, setUserDetails ,currentPrompt, setCurrentActivityPrompt, }}>
      {children}
    </UserContext.Provider>
  );
};

export const useUser = () => {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error('useUser must be used within a UserProvider');
  }
  return context;
};
