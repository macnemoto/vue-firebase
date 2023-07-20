import { getAuth } from 'firebase/auth'
import { initializeApp } from "firebase/app";
import { getFirestore } from 'firebase/firestore/lite'

const firebaseConfig = {
  apiKey: "AIzaSyA-OIPrzrB511s2VkACzhjyql-JI5eQNMk",
  authDomain: "vue-2023-dfe1b.firebaseapp.com",
  projectId: "vue-2023-dfe1b",
  storageBucket: "vue-2023-dfe1b.appspot.com",
  messagingSenderId: "478422658580",
  appId: "1:478422658580:web:d4f9b7074626e982600101"
};

// Initialize Firebase
initializeApp(firebaseConfig);
const auth = getAuth()
const db = getFirestore()

export { auth, db }