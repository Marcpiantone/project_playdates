import firebase from "../../services/firebase";

// Signing up with Firebase 1. Email
export const signup = (email, password) => async (dispatch) => {
  try {
    firebase
      .auth()
      .createUserWithEmailAndPassword(email, password)
      .then((user) =>
        dispatch({
          type: "SIGNUP_SUCCESS",
          user,
          payload: "Your account was successfully created!",
        })
      )
      .then((data) => console.log(data));
  } catch (err) {
    dispatch({
      type: "SIGNUP_ERROR",
      payload:
        "Something went wrong, we couldn't create your account. Please try again.",
    });
  }
};

// Signing up  with Firebase 2. Google auth

export const googleSignIn = () => async (dispatch) => {
  const googleProvider = new firebase.auth.GoogleAuthProvider();
  firebase.auth().setPersistence(firebase.auth.Auth.Persistence.LOCAL);
  try {
    firebase
      .auth()
      .signInWithPopup(googleProvider)
      .then((user) =>
        dispatch({
          type: "SIGNUP_SUCCESS",
          user,
          payload: "Your account was successfully created using Google auth!",
        })
      );
  } catch (err) {
    dispatch({
      type: "SIGNUP_ERROR",
      payload:
        "Something went wrong, we couldn't create your account. Please try again.",
    });
  }
};

// Signing out  with Firebase

export const signOut = () => async (dispatch) => {
  try {
    firebase
      .auth()
      .signOut()
      .then(() => {
        dispatch({ type: "SIGNOUT_SUCCESS" });
      });
  } catch (err) {
    dispatch({
      type: "SIGNOUT_ERROR",
      payload: `Message : ${err}`,
    });
  }
};
