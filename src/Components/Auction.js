
import React from "react";
import { Link, Route, Routes } from "react-router-dom";
import Home from "./Home";
import SignUpForBuyer from "./SingnUpForBuyer"
import SignInForBuyer from "./SingnInForBuyer"
import BuyerPage from "./BuyerPage";

function Auction(){

    return(

        <div>
             <Link to="/home">home</Link>
             <Link to ="/" />
             
            

            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/signUpForBuyer" element={<SignUpForBuyer />}/>
                <Route path="/signInForBuyer" element={<SignInForBuyer />}/>
                <Route path="/pageForBuyer" element={<BuyerPage />} />
            </Routes>
        </div>

    )
}

export default Auction