import { initializeApp } from "firebase/app"
import { getFirestore } from "firebase/firestore"
import { getAuth } from "firebase/auth"

const firebaseConfig = {
    apiKey: "AIzaSyC6qCTbgIWmp9CdE9XVjyYFAYSVhuohOn4",
    authDomain: "flowty-14109.firebaseapp.com",
    projectId: "flowty-14109",
    storageBucket: "flowty-14109.appspot.com",
    messagingSenderId: "491176230281",
    appId: "1:491176230281:web:3b1c212dae088bd326f558",
    measurementId: "G-6DPHB29VGF"
  };


const app = initializeApp(firebaseConfig)
const db = getFirestore(app)
const auth = getAuth(app)

export {db, auth}