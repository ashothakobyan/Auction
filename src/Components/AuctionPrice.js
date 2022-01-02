import { collection, doc, getDocs, query, setDoc, where } from "firebase/firestore/lite";
import React, { useCallback, useEffect, useState }  from "react";
import { db } from "../firebais/fiarebaisForBuyers";
import { v4 as uuidv4 } from 'uuid';
import { useNavigate } from "react-router-dom";


 function AuctionPrice({item}){
     if(
         new Date()-item?.date.toDate() >= 0
      && 
      new Date()-item?.date.toDate() <= 600000
      ){
        console.log(1)
     }
     
    const navigate = useNavigate()
    let [ourItem,setOurItem] = useState()

     const fetchBlogs = useCallback(async function fetchBlogs(db){
        const response=collection(db,'AuctionItems');
        const q = query(response, where("uid", "==", item?.uid))
        const data = await getDocs(q);
        const auctionAllItems = data.docs.map(item => {
          return{ 
              ...item.data(),
              asd:item.id
            }
        })

        setOurItem(auctionAllItems[0])
      },[])
    
    
      
      useEffect(()=>fetchBlogs(db),[])
      useEffect(()=>{
       const int = setInterval(()=>fetchBlogs(db),100000000)
       return ()=> clearInterval(int)
      },[fetchBlogs])

      async function addPrice(){
        
            // const response=collection(db,'AuctionItems');
            // const q = query(response, where("date", ">=", new Date()-600000))
            // const data = await getDocs(q);
            // console.log(data)
            // let auctionAllItems = data.docs.map(item => {
            //     return{
            //         ...item.data(),
            //         asd:item.id
            //     }
               
            // })
            // let currentItem = auctionAllItems.find((el)=>el.uid === ourItem.uid)
            // console.log(auctionAllItems,ourItem)
            ourItem.itemPrice = Number(ourItem.itemPrice)  + 100
            // data[auctionAllItems.find((el)=>el.uid === ourItem.uid)] = currentItem
            await setDoc(doc(db, "AuctionItems/" + ourItem.asd ),ourItem)
            fetchBlogs(db)

          
      }

    return(
        <div>
            {ourItem?.itemPrice}
            <button onClick={addPrice}>add</button>
        </div>
    )

}

export default AuctionPrice