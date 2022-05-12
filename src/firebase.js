// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app';
import { getStorage } from 'firebase/storage';

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: 'AIzaSyCZAHyOh-0-YR9kcXM2rOsRBfbX6NhRtbI',
  authDomain: 'online-whiteboard-boodo.firebaseapp.com',
  projectId: 'online-whiteboard-boodo',
  storageBucket: 'online-whiteboard-boodo.appspot.com',
  messagingSenderId: '374912129921',
  appId: '1:374912129921:web:a5bd9b68a38f7d4b0e6680',
  measurementId: 'G-0PQ77P2MQ8',
};

// Initialize Firebase
const firebaseApp = initializeApp(firebaseConfig);
export const storage = getStorage(firebaseApp);
