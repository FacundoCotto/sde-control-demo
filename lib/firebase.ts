// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDI4hqeuIl9t1HKQ6BrzJUjxjKq8moFIuw",
  authDomain: "sde-marcas-demo.firebaseapp.com",
  projectId: "sde-marcas-demo",
  storageBucket: "sde-marcas-demo.firebasestorage.app",
  messagingSenderId: "655565411603",
  appId: "1:655565411603:web:8ccd2f15c6604be689b6e6"
};

// Initialize Firebase

export const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
