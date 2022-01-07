import React, { useState } from "react";
import NavigationBar from "../NavigationBar"
import UploadImg from "./UploadImg"
import ChuseTypes from "./ChuseTypes"
import { Alert, Button, TextField } from "@mui/material";
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
    const [success, setSuccess] = useState()
    const [errorItems,setErrorItems] = useState({})


    const addInfo = () => {
        if(itemName && type && itemPrice && date && imgUrl && about) {
            addDoc(collection(db, "AuctionItems"), {
                itemName: itemName,
                type: type,
                LiveOwner: "",
                itemPrice: itemPrice,
                date: date,
                imgUrl: imgUrl,
                buyerUser: referance,
                uid: uuidv4(),
                aboutItem:about
            })

            setSuccess(true)
        } else {
            setErrorItems({
                name:itemName?false:true,
                type:type?false:true,
                price:itemPrice?false:true,
                date:date?false:true,
                img:imgUrl?false:true,
                aboutItem:about?false:true
            })
            setSuccess(false)
        }
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

            <div className="my-seler-page-container">
            
                        <div className="my-seler-page-container_item">
                            <TextField error = {errorItems.name?true:false} onChange={(e) => changeItemName(e)} id="outlined-basic" label="ItemName" variant="outlined" className="" />
                            <ChuseTypes errorItems={errorItems}  setType={setType} />
                        </div>
                        <div className="my-seler-page-container_item">
                            <TextField
                                error = {errorItems.price?true:false}
                                onChange={(e) => changeItemPrice(e)}
                                id="outlined-number"
                                label="Item Price($)"
                                type="number"
                            />
                            <Time errorItems={errorItems}  setDate={setDate} />
                        </div>
                        <div className="uploade-img_field">
                            <UploadImg errorItems={errorItems} setImgUrl={setImgUrl} />
                        </div>
                        <div className="auction-description">
                        <ItemAbout errorItems={errorItems}  setAbout={setAbout} />
                        </div>
                    {/* <button onClick={() => addInfo()}>addddddd</button> */}
                    <Button variant="contained" onClick={() => addInfo()} className="add-btn">Add</Button>
                    {success &&     <Alert variant="filled" severity="success" className='alert success-alert'>
                    This is a success alert — check it out!
                </Alert> 
                // : <Alert variant="filled" severity="error" className='alert error-alert'>
                // please fill in all the fields
                // </Alert>
                }
                
            </div>
        </div>
    )
}

export default MySelerPage