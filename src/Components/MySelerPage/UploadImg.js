import React, { useState } from "react";
import { getDownloadURL,  getStorage, ref, uploadBytes, uploadBytesResumable, } from "firebase/storage";
import UploadButton from "./UploadeButton";
import { v4 as uuidv4 } from 'uuid'


function UploadImg({setItem,item}){
    const storage = getStorage();
    const[url,setUrl] = useState()
    const addImg = (img) => {
    if(!img){
        return
    }
    const storageRef = ref(storage, `images/${uuidv4()}`);
    uploadBytes(storageRef, img).then((snapshot) => {
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
          setUrl(downloadURL)
          setItem({
              ...item,
              imgUrl:downloadURL
          })      
        });
    });
    const uploadTask = uploadBytesResumable(storageRef, img)
 }
    return(
        <div style={{
            display:"flex"
        }}>
            <UploadButton addImg={addImg} />
            <img src={url} height="300px" width="300px"></img>
        </div>
    )
}

export default UploadImg