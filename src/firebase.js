// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app'
import { getAuth } from 'firebase/auth'
import { getFirestore } from 'firebase/firestore'

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: 'AIzaSyBCVyUVtHUrWgcjiUFuZ5SjY781INLVpOM',
  authDomain: 'art-auction-qr.firebaseapp.com',
  projectId: 'art-auction-qr',
  storageBucket: 'art-auction-qr.appspot.com',
  messagingSenderId: '190967533734',
  appId: '1:190967533734:web:581b06fbe0d9acca4f2467',
}

// Initialize Firebase
const app = initializeApp(firebaseConfig)
export const auth = getAuth(app)
export const db = getFirestore(app)
