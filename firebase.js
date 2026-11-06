import { initializeApp } from 'https://www.gstatic.com/firebasejs/12.19.0/firebase-app.js';
import { getAuth, GoogleAuthProvider, signInWithPopup, signOut, onAuthStateChanged } from 'https://www.gstatic.com/firebasejs/12.19.0/firebase-auth.js';
import { getFirestore, doc, getDoc, setDoc, collection, query, where, limit, getDocs, addDoc, updateDoc, serverTimestamp, writeBatch, runTransaction } from 'https://www.gstatic.com/firebasejs/12.19.0/firebase-firestore.js';

const app = initializeApp({
  apiKey: 'AIzaSyBHQtFpkXfNDkE3MXiznWMzSxDDptTgGMI',
  authDomain: 'muse-7d4d2.firebaseapp.com',
  projectId: 'muse-7d4d2',
  storageBucket: 'muse-7d4d2.firebasestorage.app',
  messagingSenderId: '812375159899',
  appId: '1:812375159899:web:c5465f22331860727b3b7e',
  measurementId: 'G-VVNL89RN7T'
});
const auth = getAuth(app);
const db = getFirestore(app);
export { auth, db, GoogleAuthProvider, signInWithPopup, signOut, onAuthStateChanged, doc, getDoc, setDoc, collection, query, where, limit, getDocs, addDoc, updateDoc, serverTimestamp, writeBatch, runTransaction };
