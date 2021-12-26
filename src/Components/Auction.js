import React, { useEffect, useState } from "react"
import { Link, Route, Routes } from "react-router-dom"
import Home from "./Home"
import SignUpForBuyer from "./SingnUpForBuyer"
import SignInForBuyer from "./SingnInForBuyer"
import BuyerPage from "./BuyerPage"




import MySelerPage from "./MySelerPage/MySelerPage"
import { db, getUsers } from "../firebais/fiarebaisForBuyers"
import MyProfile from "./MyProfile"
import { useDispatch, useSelector } from "react-redux"
import { setUser } from "../Redux/Slicder"
import { getAuth, onAuthStateChanged } from "firebase/auth"
import ItemAuction from "./ItemAuction"






function Auction() {

  const[item,setItem] = useState()

const dispatch = useDispatch()
const auth = getAuth()
const isAuth = useSelector((state)=>state.auction.isAuth)
useEffect(()=>funcAuth(),[])
async function funcAuth(){
  await onAuthStateChanged(auth, (user) => {
    if (user) {
      if(!isAuth){
        const ourusersInfo = () => getUsers(db);
        const asd = ourusersInfo();
        asd.then(function (resolve) {
          const usersInfo = resolve;
          
          const currentUser = usersInfo.find((userInfo) => userInfo.email === user.email);

        console.log(currentUser)
          dispatch(setUser(
            {
              email: user.email,
              uid: user.uid,
              name: currentUser.name,
              surName: currentUser.surName,
              balance: currentUser.balance,
              items: currentUser.myItems,
              isAuth:true,
              referance:currentUser.reference
            }
          ))
        })
      }


        
        
      
    } 
    // else {
    //   // User is signed out
    //   // ...
    // }
  }
  );
}

  return (
    <div>

      <Link to="/" />

      <Routes>
        <Route path="/" element={<Home setItem={setItem} />} />
        <Route path="/mySelerPage" element={ <MySelerPage />} />
        <Route path="/signUpForBuyer" element={<SignUpForBuyer />} />
        <Route path="/signInForBuyer" element={<SignInForBuyer />} />
        <Route path="/pageForBuyer" element={<BuyerPage />} />
        <Route path="*" element={<Home  setItem={setItem}/>} />
        <Route path="myProfile" element={<MyProfile />} />
        <Route path={`/buyPage/:card`} element={<ItemAuction item={item} />} />
      </Routes>
    </div>
  )
}

export default Auction
