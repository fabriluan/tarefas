import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";


const firebaseConfig = {
  apiKey: "AIzaSyDkocy4GABs8z0C7oOtX6TWjbiHIP0GaMs",
  authDomain: "tarefas-24e40.firebaseapp.com",
  projectId: "tarefas-24e40",
  storageBucket: "tarefas-24e40.appspot.com",
  messagingSenderId: "1017614643808",
  appId: "1:1017614643808:web:74432a19790be7629a4905",
  measurementId: "G-Y59Y1PQNKL"
};

// Initialize Firebase
const firebaseApp = initializeApp(firebaseConfig);

const db = getFirestore(firebaseApp);
const auth = getAuth(firebaseApp);

export { db , auth };