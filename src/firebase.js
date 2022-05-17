// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app';
import { getStorage } from 'firebase/storage';
import {
  getAuth,
  GoogleAuthProvider,
  connectAuthEmulator,
} from 'firebase/auth';
import { getDatabase, connectDatabaseEmulator } from 'firebase/database';

const firebaseConfig = {
  apiKey: 'AIzaSyCZAHyOh-0-YR9kcXM2rOsRBfbX6NhRtbI',
  authDomain: 'online-whiteboard-boodo.firebaseapp.com',
  databaseURL: 'https://online-whiteboard-boodo-default-rtdb.firebaseio.com/',
  projectId: 'online-whiteboard-boodo',
  storageBucket: 'online-whiteboard-boodo.appspot.com',
  messagingSenderId: '374912129921',
  appId: '1:374912129921:web:a5bd9b68a38f7d4b0e6680',
  measurementId: 'G-0PQ77P2MQ8',
};

// Initialize Firebase
const firebaseApp = initializeApp(firebaseConfig);
export const storage = getStorage(firebaseApp);
export const db = getDatabase(firebaseApp);
export const auth = getAuth(firebaseApp);
export const googleAuthProvider = new GoogleAuthProvider();

if (location.hostname === 'localhost') {
  connectDatabaseEmulator(db, 'localhost', 9000);
}
