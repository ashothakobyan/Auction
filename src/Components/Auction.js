import React from "react"
import { Link, Route, Routes } from "react-router-dom"
import Home from "./Home"
import SignUpForBuyer from "./SingnUpForBuyer"
import SignInForBuyer from "./SingnInForBuyer"
import BuyerPage from "./BuyerPage"
import MySelerPage from "./MySelerPage/MySelerPage"
import { db, getCities } from "../firebais/fiarebaisForBuyers"
import { doc, getDoc } from "firebase/firestore";





function Auction() {




// async function asd(db){
//   console.log(db)
//   const docRef = doc(db, "AuctionItems",);
//   const docSnap = await getDoc(docRef);
// if (docSnap.exists()) {
//   console.log("Document data:", docSnap.data());
// } else {
//   // doc.data() will be undefined in this case
//   console.log("No such document!");
// }
// }

  return (
    <div>
      <button onClick={()=>getCities(db)}>asdasd</button>
      
      <Link to="/" />

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/mySelerPage" element={<Home />,<MySelerPage />} />
        <Route path="/signUpForBuyer" element={<SignUpForBuyer />} />
        <Route path="/signInForBuyer" element={<SignInForBuyer />} />
        <Route path="/pageForBuyer" element={<BuyerPage />} />
        <Route path="*" element={<Home />} />
      </Routes>
    </div>
  )
}

export default Auction
