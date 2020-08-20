import * as firebase from "firebase/app";
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

try {
  firebase.initializeApp(firebaseConfig);
} catch (err) {
  if (!/already exists/.test(err.message)) {
    console.error("Firebase initialization error raised", err.stack);
  }
}

export default firebase;
