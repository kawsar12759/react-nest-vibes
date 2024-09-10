// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDHlgtS9hPTNw8CqkYcCi_W1P3x9kIZmLk",
  authDomain: "nest-vibes-b0e09.firebaseapp.com",
  projectId: "nest-vibes-b0e09",
  storageBucket: "nest-vibes-b0e09.appspot.com",
  messagingSenderId: "505275848417",
  appId: "1:505275848417:web:7e4828106b30f137af09a0"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export default app;