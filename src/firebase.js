// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {getDatabase} from "firebase/database";


// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAxSfQwGr_BoHDu4qsHR-6T32rO50asLeU",
  authDomain: "schedulemaster-b3451.firebaseapp.com",
  projectId: "schedulemaster-b3451",
  storageBucket: "schedulemaster-b3451.appspot.com",
  messagingSenderId: "497897274997",
  appId: "1:497897274997:web:642be279934518cd6a023c"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const database = getDatabase(app);
