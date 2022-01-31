import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import AuctionCard from "./AuctionCard"
import AuctionPrice from "./AuctionPrice";
import NavigationBar from "../NavigationBar"


export default function ItemAuction({item}){
    
    const navigate = useNavigate()
    function isEmpty(){
        if(!item){
            navigate("/")
        }
    }
    useEffect(()=>isEmpty())

    return (
        <div>
            <NavigationBar/>
            <div className="live-auction-container">
                <AuctionCard  about={item?.aboutItem} name={item?.itemName} src={item?.imgUrl} owner={item?.owner} />
                <AuctionPrice  item={item} />   
            </div>

        </div>
    )
}