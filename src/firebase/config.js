import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';
import 'firebase/storage';

const firebaseConfig = {
  apiKey: process.env.VUE_APP_API,
  authDomain: 'shop-74e97.firebaseapp.com',
  projectId: 'shop-74e97',
  storageBucket: 'shop-74e97.appspot.com',
  messagingSenderId: '427340251793',
  appId: '1:427340251793:web:6f04c6979154f740327530',
};

const fb = firebase.initializeApp(firebaseConfig);

const db = firebase.firestore();
const auth = firebase.auth();

export {
  db, auth, fb,
};
