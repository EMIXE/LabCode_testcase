import firebase from 'firebase/app';
import 'firebase/firestore';
const cors = require('cors')({origin: true});

const firebaseConfig = {
    apiKey: "AIzaSyDOkNwDgZnR_dDLnwEzpZyX_KZtnDRP4ao",
    authDomain: "evaluation-of-lecture-813bb.firebaseapp.com",
    databaseURL: "https://evaluation-of-lecture-813bb-default-rtdb.firebaseio.com",
    projectId: "evaluation-of-lecture-813bb",
    storageBucket: "evaluation-of-lecture-813bb.appspot.com",
    messagingSenderId: "491294059721",
    appId: "1:491294059721:web:c7e9307446a6fa2ed9f118"
  };

firebase.initializeApp(firebaseConfig);

export const db = firebase.firestore();