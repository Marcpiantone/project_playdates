import React, { createContext, useEffect, useState } from "react";

import withFirebaseAuth from "react-with-firebase-auth";
import * as firebase from "firebase";
import "firebase/auth";

var firebaseConfig = {
  apiKey: "AIzaSyAIQ7gpGxn2IuKqkAT6g2WlYzZd98nVyOE",
  authDomain: "project-playdates.firebaseapp.com",
  databaseURL: "https://project-playdates.firebaseio.com",
  projectId: "project-playdates",
  storageBucket: "project-playdates.appspot.com",
  messagingSenderId: "897500047107",
  appId: "1:897500047107:web:f1495425178f51c40bab36",
  measurementId: "G-LJWLRTP923",
};

const firebaseApp = firebase.initializeApp(firebaseConfig);
const firebaseAppAuth = firebaseApp.auth();

export const AppContext = createContext(null);

const providers = {
  googleProvider: new firebase.auth.GoogleAuthProvider(),
};

const AppProvider = ({ children, signInWithGoogle, user }) => {
  const [appUser, setAppUser] = useState({});
  useEffect(() => {
    if (user) {
      setAppUser({
        displayName: user.displayName,
        email: user.email,
        photoURL: user.photoURL,
      });
    }
  }, [user]);

  return (
    <AppContext.Provider value={{ appUser, signInWithGoogle }}>
      {children}
    </AppContext.Provider>
  );
};

export default withFirebaseAuth({
  providers,
  firebaseAppAuth,
})(AppProvider);
