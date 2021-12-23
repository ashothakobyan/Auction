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
        console.log(e.target.files[0],img)
    }

 const addImg = () => {
    const mountainsRef = ref(storage, img.name);
    const mountainImagesRef = ref(storage, `images/${img.name}`);

    const storageRef = ref(storage, `images/${img.name}`);
    uploadBytes(storageRef, img).then((snapshot) => {
    console.log('Uploaded a blob or file!');
    });

    const uploadTask = uploadBytesResumable(storageRef, img)


    uploadTask.on('state_changed',
  (snapshot) => {
    // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
    const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
    console.log('Upload is ' + progress + '% done');
    switch (snapshot.state) {
      case 'paused':
        console.log('Upload is paused');
        break;
      case 'running':
        console.log('Upload is running');
        break;
    }
  }, 
  (error) => {
    // A full list of error codes is available at
    // https://firebase.google.com/docs/storage/web/handle-errors
    switch (error.code) {
      case 'storage/unauthorized':
        // User doesn't have permission to access the object
        break;
      case 'storage/canceled':
        // User canceled the upload
        break;

      // ...

      case 'storage/unknown':
        // Unknown error occurred, inspect error.serverResponse
        break;
    }
  }, 
  () => {
    // Upload completed successfully, now we can get the download URL
    getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
      setUrl(downloadURL)
      setImgUrl(downloadURL)
      console.log(downloadURL)
      
    });
  }
);



 }



    return(
        <div style={{
            display:"flex"
        }}>

            <UploadButton  changeImg={changeImg} />
            <Fab variant="extended" onClick={addImg}>
                <NavigationIcon sx={{ mr: 1 }} />
                Add
            </Fab>

            <img src={url} height="300px" width="300px"></img>
        </div>
    )
}

export default UpoadImg