import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
const firebaseConfig = {
  apiKey: "AIzaSyC--JthoFQPBjfqW4wDuz8jay9nnFfIddU",
  authDomain: "homeease-82174.firebaseapp.com",
  projectId: "homeease-82174",
  storageBucket: "homeease-82174.firebasestorage.app",
  messagingSenderId: "104174455413",
  appId: "1:104174455413:web:f6bdc388d90228081ac63c"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const firebaseAuth =
  getAuth(app);