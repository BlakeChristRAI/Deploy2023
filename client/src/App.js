import { useEffect, useState } from 'react';
import firebaseApp from './service/firebase';
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import Login2 from './components/Login2';
import Homepage from './components/Homepage';
import './App.css';

const auth = getAuth(firebaseApp);

function App() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user !== null && user !== undefined) {
        setUser(user);
      } else {
        // If the user is not signed in, set user to null
        setUser(null);
      }
    });

    // Cleanup the subscription to avoid memory leaks
    return () => unsubscribe();
  }, []);

  const signOut = async () => {
    try {
      await auth.signOut();
    } catch (error) {
      console.error(error.message);
    }
  };

  return (
    <div className="app-container">
      {/* Always render Homepage, but control visibility with CSS */}
      <Homepage  signOut={signOut} />

      {/* Conditionally render Login2 based on user state */}
      {!user && <Login2 />}
    </div>
  );
}

export default App;
