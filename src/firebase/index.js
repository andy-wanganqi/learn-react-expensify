import { Observable } from 'rxjs';
import config from '../config';

// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth, signInWithPopup, signOut, GoogleAuthProvider, onAuthStateChanged } from "firebase/auth";
import { getAnalytics } from "firebase/analytics";
import { getDatabase, ref, set, get, query } from "firebase/database";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

let auth = undefined;
const googleAuthProvider = new GoogleAuthProvider();
let _authObservable = undefined;
let _user = undefined;

const reduceUser = (user) => {
  const { uid, accessToken, email, displayName, photoUrl } = user;
  return { uid, accessToken, email, displayName, photoUrl };
};

const handleAuthStateChanged = async (user, subscriber) => {
  if (user) {
    // User is signed in, see docs for a list of available properties
    // https://firebase.google.com/docs/reference/js/auth.user
    // ...
    _user = user;
    subscriber.next(reduceUser(user));
  } else {
    // User is signed out
    // ...
    subscriber.next(user);
    _user = undefined;
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

  _authObservable = new Observable((subscriber) => {
    onAuthStateChanged(auth, (user) => handleAuthStateChanged(user, subscriber));
  });
};

export const userSignIn = () => {
  signInWithPopup(auth, googleAuthProvider)
    .then((result) => {
      // This gives you a Google Access Token. You can use it to access the Google API.
      const credential = GoogleAuthProvider.credentialFromResult(result);
      // _token = credential.accessToken;
      // The signed-in user info.
      _user = result.user;
      // IdP data available using getAdditionalUserInfo(result)
      // ...
    }).catch((error) => {
      // Handle Errors here.
      const errorCode = error.code;
      const errorMessage = error.message;
      console.log('userSignIn', errorCode, errorMessage);
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
    _user = undefined;
  }).catch((error) => {
    // Handle Errors here.
    const errorCode = error.code;
    const errorMessage = error.message;
    console.log('userSignOut', errorCode, errorMessage);
    _user = undefined;
  });
}

export const getAuthObservable = () => _authObservable;

export const getUser = () => _user;

export const isAuthenticatedUser = (user) => {
  return (user && user.uid) ? true : false;
};

export const createExpense = async (uid, expense) => {
  const { description, amount, createdAt, note } = expense;
  return await set(ref(getDatabase(), `users/${uid}/expenses/${expense.id}`), {
    description, 
    amount,
    createdAt,
    note,
  });
};

export const readExpenses = async (uid) => {
  const db = getDatabase();
  const dbRef = ref(db, `users/${uid}/expenses`);
  const dbQuery = query(dbRef);
  const snapshot = await get(dbQuery);

  const expenses = [];
  snapshot.forEach((childSnapshot) => {
    var childData = childSnapshot.val();
    expenses.push({
      ...childData,
      id: childSnapshot.key,
    });
  });
  return expenses;
};

export const updateExpense = async (uid, expense) => {
  const { description, amount, createdAt, note } = expense;
  return await set(ref(getDatabase(), `users/${uid}/expenses/${expense.id}`), {
    description, 
    amount,
    createdAt,
    note,
  });
};

export const deleteExpense = async (uid, expenseId) => {
  return await set(ref(getDatabase(), `users/${uid}/expenses/${expenseId}`), null);
};
