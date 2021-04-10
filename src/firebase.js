import firebase from 'firebase/app';
import 'firebase/storage';
import 'firebase/firestore';

const firebaseConfig = {
  apiKey: 'AIzaSyCwr7Tf3_6--BzehzhtCy1Rsyb0G9VcB8c',
  authDomain: 'firegram-a0277.firebaseapp.com',
  projectId: 'firegram-a0277',
  storageBucket: 'firegram-a0277.appspot.com',
  messagingSenderId: '423059667585',
  appId: '1:423059667585:web:8a9d76b8e5b94d44d5ab80',
};

firebase.initializeApp(firebaseConfig);

export const storage = firebase.storage();
export const firestore = firebase.firestore();
export const timestamp = firebase.firestore.FieldValue.serverTimestamp;
