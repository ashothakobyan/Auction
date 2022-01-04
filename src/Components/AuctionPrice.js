import { collection, doc, getDocs, query, setDoc, where } from "firebase/firestore/lite";
import React, { useCallback, useEffect, useState }  from "react";
import { db } from "../firebais/fiarebaisForBuyers";
import { v4 as uuidv4 } from 'uuid';
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";



  function AuctionPrice({item}){
     
    const navigate = useNavigate()
    let [ourItem,setOurItem] = useState()
    const email = useSelector((state) => state.auction.user.email)

    if(!item){
      navigate("/")
    }
    const setItem = async () =>{
      const response=collection(db,'BuyerUsers');
      console.log()
      const q =  query(response, where("email", "==", ourItem?.liveOwner))
      const data =  await getDocs(q);
      console.log(data.docs)
      const auctionAllItems = data.docs.map(item => {
        return{ 
            ...item.data(),
            asd:item.id
          }
      })
      let myUser = auctionAllItems[0]
      myUser.myBougthItems.push(ourItem)
      setDoc(doc(db, "BuyerUsers/" + ourItem.liveOwner ),myUser)
      navigate("/")
    }
    console.log(new Date (item?.date.toDate().getTime() + 600000))
    if(new Date (item?.date.toDate().getTime() + 600000) <= new Date()){
      setItem()
      
      
    }

    let live = (item)=> (new Date()-item?.date.toDate() >= 0 && new Date()-item?.date.toDate() <= 600000)

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
       const int = setInterval(()=>fetchBlogs(db),2000)
       return ()=> clearInterval(int)
      },[fetchBlogs])

      async function addPrice(){
            ourItem.itemPrice = Number(ourItem.itemPrice)  + 100
            ourItem.liveOwner = email
            await setDoc(doc(db, "AuctionItems/" + ourItem.asd ),ourItem)


          
      }

    return(
        <div style={{
          border:"solid 2px green"
        }}>
          {live(ourItem) && <div>
            {ourItem?.itemPrice}
            <button onClick={addPrice}>add</button>
            </div>}
            
        </div>
    )

}

export default AuctionPrice