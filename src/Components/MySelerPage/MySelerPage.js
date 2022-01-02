import React, { useState } from "react";
import NavigationBar from "../NavigationBar"
import UploadImg from "./UploadImg"
import ChuseTypes from "./ChuseTypes"
import ChuseNumber from "./ChuseNumber"
import { Alert, TextField } from "@mui/material";
import Time from "./Time"
import { db, getUsers } from "../../firebais/fiarebaisForBuyers";
import { useSelector } from "react-redux";
import { doc, setDoc, addDoc, collection } from "firebase/firestore/lite";
import { v4 as uuidv4 } from 'uuid';
import ItemAbout from"./ItemAbout"



function MySelerPage() {
    const [itemName, setItemName] = useState()
    const [type, setType] = useState()
    const [itemPrice, setItemPrice] = useState()
    const [date, setDate] = useState()
    const [imgUrl, setImgUrl] = useState()
    const [about,setAbout] = useState()
    const email = useSelector((state) => state.auction.user.email)
    const referance = useSelector((state) => state.auction.user.referance)


    const addInfo = () => {

        addDoc(collection(db, "AuctionItems"), {
            itemName: itemName,
            type: type,
            owner: email,
            itemPrice: itemPrice,
            date: date,
            imgUrl: imgUrl,
            buyerUser: referance,
            uid: uuidv4(),
            aboutItem:about
        })
  

    }
    const changeItemName = (e) => {
        setItemName(e.target.value)
        console.log(e.target.value)
    }
    const changeItemPrice = (e) => {
        setItemPrice(e.target.value)
        console.log(e.target.value)
    }
    return (
        <div>

            <NavigationBar />
            <TextField onChange={(e) => changeItemName(e)} id="outlined-basic" label="ItemName" variant="outlined" style={{
                marginBottom: "20px"
            }} />
            <ChuseTypes setType={setType} />
            <TextField
                onChange={(e) => changeItemPrice(e)}
                id="outlined-number"
                label="Item Price($)"
                type="number"
                InputLabelProps={{
                    shrink: true,
                }}
            />
            <Time setDate={setDate} />

            <UploadImg setImgUrl={setImgUrl} />
            <ItemAbout setAbout={setAbout} />
            <button onClick={() => addInfo()}>addddddd</button>
            <Alert variant="filled" severity="success">
            This is a success alert — check it out!
         </Alert>
        </div>
    )
}

export default MySelerPage