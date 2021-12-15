import React from "react";
import { Button, ButtonGroup } from "@mui/material";
import { Link } from "react-router-dom";
import SignIn from "./SingnInForBuyer";
import NavigationBar from "./NavigationBar"

 function Home(){


    return(
        <div>
            <NavigationBar />
            {/* <ButtonGroup variant="contained" aria-label="outlined primary button group">
                <Link to="/signUpForBuyer"><Button>Buyer</Button></Link>
                
                <Button>Seler</Button>
                <Button>Guest</Button>
            </ButtonGroup> */}
        </div>
    )
}

export default Home
