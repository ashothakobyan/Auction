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
    const [item,setItem] = useState({})
    const referance = useSelector((state) => state.auction.user.referance)
    const email = useSelector((state) => state.auction.user.email)
    const [success, setSuccess] = useState()
    const [errorItems,setErrorItems] = useState({})


    const addInfo = () => {
        if(item.itemName && item.type && item.itemPrice && item.date && item.imgUrl && item.about) {
            console.log(item)
            addDoc(collection(db, "AuctionItems"), {
                itemName: item.itemName,
                type: item.type,
                LiveOwner: "",
                itemPrice: item.itemPrice,
                date: item.date,
                imgUrl: item.imgUrl,
                buyerUser: referance,
                uid: uuidv4(),
                owner:email,
                aboutItem:item.about,
            })

            setSuccess(true)
        } else {
            setErrorItems({
                name:item.itemName?false:true,
                type:item.type?false:true,
                price:item.itemPrice?false:true,
                date:item.date?false:true,
                img:item.imgUrl?false:true,
                aboutItem:item.about?false:true
            })
            setSuccess(false)
        }
    }
    const changeItemName = (e) => {
        setItem({
            ...item,
            itemName:e.target.value
        })
    }
    const changeItemPrice = (e) => {
        setItem({
            ...item,
            itemPrice:e.target.value
        })
    }
    return (
        <div>

            <NavigationBar />

            <div className="my-seler-page-container">
            
                        <div className="my-seler-page-container_item">
                            <TextField error = {errorItems.name?true:false} onChange={(e) => changeItemName(e)} id="outlined-basic" label="ItemName" variant="outlined" className="" />
                            <ChuseTypes item={item} errorItems={errorItems}  setItem={setItem} />
                        </div>
                        <div className="my-seler-page-container_item">
                            <TextField
                                error = {errorItems.price?true:false}
                                onChange={(e) => changeItemPrice(e)}
                                id="outlined-number"
                                label="Item Price($)"
                                type="number"
                            />
                            <Time errorItems={errorItems}  setItem={setItem} item={item} />
                        </div>
                        <div className="uploade-img_field">
                            <UploadImg errorItems={errorItems} setItem={setItem} item ={item} />
                        </div>
                        <div className="auction-description">
                        <ItemAbout errorItems={errorItems}  setItem={setItem} item ={item} />
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