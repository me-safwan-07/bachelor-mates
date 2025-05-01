// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";
// import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAvHdKYo39WIrliT_dMAThc0ILPt4UMXMQ",
  authDomain: "baheloremate.firebaseapp.com",
  projectId: "baheloremate",
  storageBucket: "baheloremate.firebasestorage.app",
  messagingSenderId: "585434171353",
  appId: "1:585434171353:web:d9e0c3b59dd46afed43bc8",
  measurementId: "G-2EH2B8RM1G"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
// const analytics = getAnalytics(app);
export const storage = getStorage(app);