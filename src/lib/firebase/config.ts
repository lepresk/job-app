import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: "AIzaSyD6B2YqvuAD2wgJfXAPiN_CBkU-99vyip0",
  authDomain: "job-app-b75fc.firebaseapp.com",
  projectId: "job-app-b75fc",
  storageBucket: "job-app-b75fc.firebasestorage.app",
  messagingSenderId: "254913726438",
  appId: "1:254913726438:web:0d2be41b82473e16d57827"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);