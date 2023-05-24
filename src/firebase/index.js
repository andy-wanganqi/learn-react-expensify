import config from '../config.js';

// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth, signInWithPopup, signOut, GoogleAuthProvider, onAuthStateChanged } from "firebase/auth";
import { getAnalytics } from "firebase/analytics";
import { getDatabase, ref, set, get, query } from "firebase/database";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

let auth = undefined;
const googleAuthProvider = new GoogleAuthProvider();

const handleAuthStateChanged = (user) => {
  if (user) {
    // User is signed in, see docs for a list of available properties
    // https://firebase.google.com/docs/reference/js/auth.user
    const uid = user.uid;
    console.log('onAuthStateChanged user', user);
    // ...
  } else {
    // User is signed out
    // ...
    console.log('onAuthStateChanged signed out', user);
  }
};

export const initialize = () => {
  // Your web app's Firebase configuration
  // For Firebase JS SDK v7.20.0 and later, measurementId is optional
  const { FIREBASE_PROJECT, FIREBASE_API_KEY } = config;
  const firebaseConfig = {
    apiKey: FIREBASE_API_KEY,
    authDomain: `${FIREBASE_PROJECT}.firebaseapp.com`,
    databaseURL: `https://${FIREBASE_PROJECT}-default-rtdb.asia-southeast1.firebasedatabase.app`,
    projectId: FIREBASE_PROJECT,
    storageBucket: `${FIREBASE_PROJECT}.appspot.com`,
    messagingSenderId: "327851771033",
    appId: "1:327851771033:web:b4b83f524c8ea72dcea408",
    measurementId: "G-X80JLWMH9D"
  };
  // Initialize Firebase
  const app = initializeApp(firebaseConfig);
  // const analytics = getAnalytics(app);
  auth = getAuth(app);

  onAuthStateChanged(auth, (user) => handleAuthStateChanged(user));
};

export const userSignIn = () => {
  signInWithPopup(auth, googleAuthProvider)
  .then((result) => {
    // This gives you a Google Access Token. You can use it to access the Google API.
    const credential = GoogleAuthProvider.credentialFromResult(result);
    const token = credential.accessToken;
    console.log('token', token);
    // The signed-in user info.
    const user = result.user;
    console.log('user', user);
    // IdP data available using getAdditionalUserInfo(result)
    // ...
  }).catch((error) => {
    // Handle Errors here.
    const errorCode = error.code;
    const errorMessage = error.message;
    console.log('error', errorCode, errorMessage);
    // The email of the user's account used.
    const email = error.customData.email;
    // The AuthCredential type that was used.
    const credential = GoogleAuthProvider.credentialFromError(error);
    // ...
  });
};

export const userSignOut = () => {
  signOut(auth).then(() => {
    // Sign-out successful.
  }).catch((error) => {
    // An error happened.
  });
}

export const createExpense = async (expense) => {
  const db = getDatabase();
  return await set(ref(db, 'expenses/' + expense.id), expense);
};

export const readExpenses = async () => {
  const db = getDatabase();
  const dbRef = ref(db, 'expenses');
  const dbQuery = query(dbRef);
  const snapshot = await get(dbQuery);
  
  const expenses = [];
  snapshot.forEach((childSnapshot) => {
    var childData = childSnapshot.val();
    expenses.push(childData);
  });
  return expenses;
};

export const updateExpense = async (expense) => {
  const db = getDatabase();
  return await set(ref(db, 'expenses/' + expense.id), expense);
};

export const deleteExpense = async (id) => {
  const db = getDatabase();
  return await set(ref(db, 'expenses/' + id), null);
};
