import React, { useState } from "react";
import { getDownloadURL, getMetadata, getStorage, ref, uploadBytes, uploadBytesResumable, } from "firebase/storage";
import UploadButton from "./UploadeButton";
import { Fab } from "@mui/material";
import NavigationIcon from '@mui/icons-material/Navigation'

function UpoadImg({setImgUrl}){
    const[img,setImg] = useState("")
    const storage = getStorage();
    const[url,setUrl] = useState()

     const changeImg = (e) => {
        setImg(e.target.files[0])
    }

 const addImg = () => {
    const mountainsRef = ref(storage, img.name);
    const mountainImagesRef = ref(storage, `images/${img.name}`);

    const storageRef = ref(storage, `images/${img.name}`);
    
    uploadBytes(storageRef, img).then((snapshot) => {
    
    console.log(url);
    });
    const uploadTask = uploadBytesResumable(storageRef, img)
    
    getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
      setUrl(downloadURL)
      setImgUrl(downloadURL)      
    });
 }



    return(
        <div style={{
            display:"flex"
        }}>

            <UploadButton  changeImg={changeImg} />
            <Fab  variant="extended" onClick={addImg}>
                <NavigationIcon sx={{ mr: 1, }} />
                Add
            </Fab>

            <img src={url} height="300px" width="300px"></img>
        </div>
    )
}

export default UpoadImg