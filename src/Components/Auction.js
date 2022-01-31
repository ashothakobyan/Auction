import React, { useState } from "react"
import { Link, Route, Routes } from "react-router-dom"
import Home from "./HomePage/Home"
import SignUpForBuyer from "./SingnUpForBuyer"
import SignInForBuyer from "./SingnInForBuyer"
import MySelerPage from "./MySelerPage/MySelerPage"
import MyProfile from "./MyProfile/MyProfile"
import ItemAuction from "./LiveAuction/ItemAuction"
import LiveAuction from "./LiveAuction/LiveAuction"



function Auction() {
  const[item,setItem] = useState()
  return (
    <div>
      <Link to="/" />
      <Routes>
        <Route path="/" element={<Home setItem={setItem} />} />
        <Route path="/mySelerPage" element={ <MySelerPage />} />
        <Route path="/signUpForBuyer" element={<SignUpForBuyer />} />
        <Route path="/signInForBuyer" element={<SignInForBuyer />} />
        <Route path="/myProfile" element={<MyProfile />} />
        <Route path={`/buyPage/:card`} element={<ItemAuction item={item} />} />
        <Route path="/liveAuction" element={<LiveAuction setItem={setItem} />} />
        <Route path="*" element={<Home  setItem={setItem}/>} />
      </Routes>
    </div>
  )
}

export default Auction
