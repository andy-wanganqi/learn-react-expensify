import config from '../config.js';

// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getDatabase, ref, set } from "firebase/database";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

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

import { v4 as uuid } from 'uuid';
export const writeUser = (userId, name) => {
  const db = getDatabase();
  set(ref(db, 'users/' + userId), {
    name,
    lastName: uuid(),
  });
};

export const createExpense = (expense) => {
  const db = getDatabase();
  return set(ref(db, 'expenses/' + expense.id), expense);
};
