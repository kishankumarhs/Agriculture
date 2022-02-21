import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore"
import { getAuth } from 'firebase/auth'
const firebaseConfig = {
    apiKey: "AIzaSyBIwPI25p3CKj4vjl4UXRyNznVjxS_nD7w",
    authDomain: "royalagrihsn-e464c.firebaseapp.com",
    projectId: "royalagrihsn-e464c",
    storageBucket: "royalagrihsn-e464c.appspot.com",
    messagingSenderId: "816021010784",
    appId: "1:816021010784:web:b8061efce93928be29c605",
    measurementId: "G-N9J0425PK5"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const Auth = getAuth(app);
const Db = getFirestore(app);

export { Auth, Db };