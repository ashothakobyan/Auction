import { initializeApp } from "firebase/app"
import { getFirestore, getDocs,collection } from "firebase/firestore/lite"
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth"
import { doc, setDoc, getDoc } from "@firebase/firestore/lite"
import { useNavigate } from "react-router-dom"
import { useState } from "react"

const firebaseConfig = {
  apiKey: "AIzaSyCcu2OOK2f6r6reLHvPJ82E9lozwUJ7-BY",
  authDomain: "my-app-8e6b1.firebaseapp.com",
  projectId: "my-app-8e6b1",
  storageBucket: "my-app-8e6b1.appspot.com",
  messagingSenderId: "641212395427",
  appId: "1:641212395427:web:6b6eea9321aa7f7c313416",
  measurementId: "G-QDZNQFK34N",
}

// Initialize Firebase
const app = initializeApp(firebaseConfig)
export const db = getFirestore(app)


export async function getCities(db) {
  const citiesCol = collection(db, "User")
  const citySnapshot = await getDocs(citiesCol)
  const cityList = citySnapshot.docs.map((doc) => doc.data())
  console.log(cityList)
}
export const auth = getAuth()
export const addBuyer = async (name, surName, email) => {
  const data = {
    name: name,
    surName: surName,
    email: email,
    balans: 1000000,
    myItems: [],
  }
  await setDoc(doc(db, "BuyerUsers", email), data)
}



export const addSeler = async (name, surName, email) => {
  const data = {
    name: name,
    surName: surName,
    email: email,
    itemsForSell: [],
  }
  await setDoc(doc(db, "SelerUsers", email), data)
}


export const createUserForBuyer = (email, password) => {
  
  createUserWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
      // Signed in
      const user = userCredential.user
      // ...
    })
    .catch((error) => {
      alert("error")
      const errorCode = error.code
      const errorMessage = error.message
      // ..
    })
}
