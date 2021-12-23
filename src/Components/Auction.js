import React from "react"
import { Link, Route, Routes } from "react-router-dom"
import Home from "./Home"
import SignUpForBuyer from "./SingnUpForBuyer"
import SignInForBuyer from "./SingnInForBuyer"
import BuyerPage from "./BuyerPage"




import MySelerPage from "./MySelerPage/MySelerPage"
import { db, getCities } from "../firebais/fiarebaisForBuyers"
import { doc, getDoc } from "firebase/firestore";
import MyProfile from "./MyProfile"






function Auction() {


  return (
    <div>

      <Link to="/" />

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/mySelerPage" element={<Home />, <MySelerPage />} />
        <Route path="/signUpForBuyer" element={<SignUpForBuyer />} />
        <Route path="/signInForBuyer" element={<SignInForBuyer />} />
        <Route path="/pageForBuyer" element={<BuyerPage />} />
        <Route path="*" element={<Home />} />
        <Route path="myProfile" element={<MyProfile />} />
      </Routes>
    </div>
  )
}

export default Auction
