import "./App.css"
import Auction from "./Components/Auction"
import React, { useEffect } from "react"
import { useDispatch } from "react-redux"
import { onAuthStateChanged } from "firebase/auth"
import { auth, db, getUsers } from "./firebais/fiarebaisForBuyers"
import { setUser } from "./Redux/Slicer"

function App() {


  const dispatch = useDispatch()

  useEffect(()=>funcAuth(),[funcAuth])
  function funcAuth(){
    onAuthStateChanged(auth, async(user) => {
     if (user) {
       const users = await getUsers(db)
        const currentUser = users.find((userInfo) => userInfo.email === user.email);
        dispatch(setUser(
          {
            
              email: user.email,
              uid: user.uid,
              name: currentUser?.name,
              surName: currentUser?.surName,
              balance: currentUser?.balance,
              myBougthItems: currentUser?.myBougthItems,
              isAuth:true,
              referance:currentUser?.reference,
              userImg:currentUser?.userImg
          }
        ))

     } 

   }
   );
 }

  return (
    <div>
  
        <Auction />
      

    </div>
  )
}

export default App
