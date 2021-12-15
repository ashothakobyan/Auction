
import React from "react";
import { Link, Route, Routes } from "react-router-dom";
import Home from "./Home";
import SignUpForBuyer from "./SingnUpForBuyer"
import SignInForBuyer from "./SingnInForBuyer"

function Auction(){

    return(

        <div>
             <Link to="/home">home</Link>
             
            

            <Routes>
                <Route path="/home" element={ <Home />} />
                <Route path="/signUpForBuyer" element={<SignUpForBuyer />}/>
                <Route path="/signInForBuyer" element={<SignInForBuyer />}/>
            </Routes>
        </div>

    )
}

export default Auction