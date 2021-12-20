import React from "react";
import NavigationBar from "../NavigationBar"
import  UploadImg from "./UploadImg"
import ChuseTypes from "./ChuseTypes"
import ChuseNumber from "./ChuseNumber"
import { TextField } from "@mui/material";

function MySelerPage(){
    return(
        <div>
            
            <NavigationBar  />
            <TextField id="outlined-basic" label="ItemName" variant="outlined" style={{
                marginBottom:"20px"
                }} />
            <ChuseTypes />
            <ChuseNumber />
            {/* <DateTimePicker
                label="Date&Time picker"
                value={value}
                
                renderInput={(params) => <TextField {...params} />}
            /> */}
            <UploadImg />
            
        </div>
    )
}

export default MySelerPage