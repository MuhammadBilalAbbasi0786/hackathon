import { initializeApp } from "firebase/app";
import firebase from "firebase/compat/app";

import "firebase/compat/auth";
import "firebase/compat/storage";
import "firebase/compat/database";
import "firebase/compat/firestore";

const firebaseConfig = {
    apiKey: "AIzaSyBXZ5sJj5CsoZZelcAV7aG0tQMfJt8tk0g",
    authDomain: "react-hathagon.firebaseapp.com",
    databaseURL: "https://react-hathagon-default-rtdb.firebaseio.com",
    projectId: "react-hathagon",
    storageBucket: "react-hathagon.appspot.com",
    messagingSenderId: "866976447929",
    appId: "1:866976447929:web:a1a2eeb5a0e3dd5a9d0a68"
  };

  firebase.initializeApp(firebaseConfig);

  export const  auth = firebase.auth()
  export const  storage = firebase.storage()
  export const  db = firebase.database()
  export const  firestore = firebase.firestore()