import { collection, doc, getDocs, query, setDoc, where } from "firebase/firestore/lite";
import React, { useEffect, useState }  from "react";
import { db } from "../firebais/fiarebaisForBuyers";
import { v4 as uuidv4 } from 'uuid';


 function AuctionPrice({item}){

    const [ourItem,setOurItem] = useState()

    
    async function fetchBlogs(db){
        const response=collection(db,'AuctionItems');
        const q = query(response, where("uid", "==", item?.uid))
        const data = await getDocs(q);
        const auctionAllItems = data.docs.map(item => {
          return item.data()
        })

        setOurItem(auctionAllItems[0])
        console.log(1)
      }
      
      useEffect(()=>fetchBlogs(db),[])
      

      async function addPrice(){
        
            const response=collection(db,'AuctionItems');
            const q = query(response, where("date", ">=", new Date()))
            const data = await getDocs(q);
            console.log(data)
            let auctionAllItems = data.docs.map(item => {
                return{
                    ...item.data(),
                    asd:item.id
                }
               
            })
            let currentItem = auctionAllItems.find((el)=>el.uid === ourItem.uid)
            currentItem.itemPrice = Number(currentItem.itemPrice)  + 100
            data[auctionAllItems.find((el)=>el.uid === ourItem.uid)] = currentItem
            await setDoc(doc(db, "AuctionItems/" + currentItem.asd ),currentItem)
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