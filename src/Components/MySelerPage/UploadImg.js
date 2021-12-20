import React, { useState } from "react";
import { getMetadata, getStorage, ref, uploadBytes, } from "firebase/storage";

function UpoadImg(){
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


    getMetadata(storageRef)
    .then((metadata) => {
      console.log(metadata)
    })
 }



    return(
        <div>
            <input type={"file"} onChange={(e)=>changeImg(e)}></input>
            <button onClick={addImg}>Add</button>
        </div>
    )
}

export default UpoadImg