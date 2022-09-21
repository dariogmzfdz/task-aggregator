
import { initializeApp } from "firebase/app";
import { getAuth } from 'firebase/auth' ;



const firebaseConfig = {
  apiKey: "AIzaSyCvKnQkVJqBqgCRWURJBzhabkUF_zTNQRU",
  authDomain: "agenda-5ea82.firebaseapp.com",
  projectId: "agenda-5ea82",
  storageBucket: "agenda-5ea82.appspot.com",
  messagingSenderId: "263282657707",
  appId: "1:263282657707:web:eb8e90f4efc22ea6de6aee"
};


const app = initializeApp(firebaseConfig);

export const auth = getAuth(app)
