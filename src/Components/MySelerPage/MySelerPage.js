import React, { useState } from "react";
import NavigationBar from "../NavigationBar"
import  UploadImg from "./UploadImg"
import ChuseTypes from "./ChuseTypes"
import ChuseNumber from "./ChuseNumber"
import { TextField } from "@mui/material";
import Time from "./Time"
import { db, getUsers } from "../../firebais/fiarebaisForBuyers";
import { useSelector } from "react-redux";
import { doc, setDoc } from "firebase/firestore/lite";


function MySelerPage(){
    const[itemName,setItemName] = useState()
    const[type,setType] = useState()
    const[itemPrice,setItemPrice] = useState()
    const[date,setDate] = useState()
    const[imgUrl,setImgUrl] = useState()
    const email = useSelector((state)=>state.auction.user.email)

    const addInfo = () => {
        const users = getUsers(db)
        users.then((usersInfo)=>{
            const currentUser = usersInfo.find((userInfo)=>userInfo.email === email)
            currentUser.mySelsItems.push({
                itemName:itemName,
                type:type,
                itemPrice:itemPrice,
                date:date,
                imgUrl:imgUrl
            })
            setDoc(doc(db, "BuyerUsers", email), currentUser)
        })

    }
    const changeItemName = (e)=>{
        setItemName(e.target.value)
        console.log(e.target.value)
    }
    const changeItemPrice = (e)=>{
        setItemPrice(e.target.value)
        console.log(e.target.value)
    }
    return(
        <div>
            
            <NavigationBar  />
            <TextField onChange={(e)=>changeItemName(e)} id="outlined-basic" label="ItemName" variant="outlined" style={{
                marginBottom:"20px"
                }} />
            <ChuseTypes setType={setType}  />
            <TextField
            onChange={(e)=>changeItemPrice(e)}
                id="outlined-number"
                label="Item Price($)"
                type="number"
                InputLabelProps={{
                    shrink: true,
          }}
        />
        <Time setDate={setDate} />

            <UploadImg setImgUrl={setImgUrl}/>
            <button onClick={()=>addInfo()}>addddddd</button>
        </div>
    )
}

export default MySelerPage