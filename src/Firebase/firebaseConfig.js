import { initializeApp } from 'firebase/app'
import { getFirestore } from 'firebase/firestore'

const firebaseConfig = {
  apiKey: "AIzaSyBi6XzwmwExZVw-ko72-qsv1PJcPkK2B1o",
  authDomain: "react-final-project-405ce.firebaseapp.com",
  projectId: "react-final-project-405ce",
  storageBucket: "react-final-project-405ce.appspot.com",
  messagingSenderId: "164815097662",
  appId: "1:164815097662:web:255fb81e3676fc98bca66f"
};


const app = initializeApp(firebaseConfig)
export const db = getFirestore(app)