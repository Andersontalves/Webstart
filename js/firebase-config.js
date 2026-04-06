import { initializeApp } from "https://www.gstatic.com/firebasejs/10.9.0/firebase-app.js";
import { getAuth, onAuthStateChanged, signOut } from "https://www.gstatic.com/firebasejs/10.9.0/firebase-auth.js";
import { getFirestore, collection, addDoc, serverTimestamp, query, where, onSnapshot, getDocs, updateDoc, doc, orderBy, deleteDoc, setDoc, getDoc } from "https://www.gstatic.com/firebasejs/10.9.0/firebase-firestore.js";

const firebaseConfig = {
  apiKey: "AIzaSyCxS-Q6l7ttyZv4V0O8M0yFAESIJP39Atg",
  authDomain: "webstart-agency.firebaseapp.com",
  projectId: "webstart-agency",
  storageBucket: "webstart-agency.firebasestorage.app",
  messagingSenderId: "784392163899",
  appId: "1:784392163899:web:ab1b2689796777f879421e"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firebase services
export const auth = getAuth(app);
export const db = getFirestore(app);
export { onAuthStateChanged, signOut, collection, addDoc, serverTimestamp, query, where, onSnapshot, getDocs, updateDoc, doc, orderBy, deleteDoc, setDoc, getDoc };