import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import AuctionCard from "./AuctionCard"
import AuctionPrice from "./AuctionPrice";


export default function ItemAuction({item}){
    const [ourItem,setOurItem] = useState()
    const navigate = useNavigate()
    console.log(item)


    function asd(){
        if(!item){
            console.log(1)
            navigate("/")
    
        }
        
    }
    useEffect(()=>asd())



        

      

    return (
        <div>
            <AuctionCard name={item?.itemName} src={item?.imgUrl} />
            {item?.itemPrice?item.itemPrice:null}
            <AuctionPrice />
        </div>
    )
}