import { initializeApp } from "firebase/app"
import "firebase/auth";
import 'firebase/storage';
import { getFirestore, collection, getDocs } from "firebase/firestore/lite"
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth"
import { doc, setDoc } from "@firebase/firestore/lite"
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyAEK1uK292lxPgvfa23bzkmw-6uzlesHu8",
  authDomain: "auction-44e7c.firebaseapp.com",
  projectId: "auction-44e7c",
  storageBucket: "auction-44e7c.appspot.com",
  messagingSenderId: "601879417252",
  appId: "1:601879417252:web:1a61121bfc5145246c3131"
};


// Initialize Firebase
const app = initializeApp(firebaseConfig)
export const db = getFirestore(app)
export const storage = getStorage()


export async function getUsers(db) {
  const buyersCol = collection(db, "BuyerUsers")
  const buyersSnapshot = await getDocs(buyersCol)
  const buyersList = buyersSnapshot.docs.map((doc) =>({...doc.data(),reference:doc.ref}))
  return buyersList;
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
export const createUserForBuyer = async (email, password) => {

  await createUserWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
      // Signed in
      const user = userCredential.user
      return user
      // ...
    })
    .catch((error) => {
      throw new Error(error.message)
    })
}


