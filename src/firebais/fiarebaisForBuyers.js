import { initializeApp } from "firebase/app"
import "firebase/auth";
import 'firebase/storage';
import { getFirestore, collection, getDocs } from "firebase/firestore/lite"
import { getAuth, createUserWithEmailAndPassword, onAuthStateChanged } from "firebase/auth"
import { doc, setDoc } from "@firebase/firestore/lite"
import { useNavigate } from "react-router-dom"
import { getStorage } from "firebase/storage";

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
export const storage = getStorage()


export async function getUsers(db) {
  const citiesCol = collection(db, "BuyerUsers")
  const citySnapshot = await getDocs(citiesCol)
  const cityList = citySnapshot.docs.map((doc) =>({...doc.data(),reference:doc.ref}))
  return cityList;
}
export const auth = getAuth()
export const addBuyer = async (name, surName, email) => {
  const data = {
    name: name,
    surName: surName,
    email: email,
    balans: 1000000,
    mySelsItems: [],
    myBougthItems:[]
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


export const createUserForBuyer = async (email, password) => {

  await createUserWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
      // Signed in
      const user = userCredential.user
      return user
      // ...
    })
    .catch((error) => {
      alert("error")
      const errorCode = error.code
      const errorMessage = error.message
      // ..
    })
}


