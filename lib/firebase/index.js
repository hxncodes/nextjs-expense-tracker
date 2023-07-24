// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDSD5LhepUKysJOVOUyWHMvXU_343DzyoI",
  authDomain: "nextjs-expense-tracker-355fc.firebaseapp.com",
  projectId: "nextjs-expense-tracker-355fc",
  storageBucket: "nextjs-expense-tracker-355fc.appspot.com",
  messagingSenderId: "870677039189",
  appId: "1:870677039189:web:0e2612aff26b07520d6cdc",
  measurementId: "G-6B0MREHY0C",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const db = getFirestore(app);

export { app, db };
