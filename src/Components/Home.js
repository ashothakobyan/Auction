import React from "react"

import NavigationBar from "./NavigationBar"
import CardImg from "./CardImg"
import { useSelector } from "react-redux"


function Home() {
  const liveDrow = useSelector((state)=> state.auction.liveDrow)
  return (
    <div>
      <NavigationBar />
      {/* <ButtonGroup variant="contained" aria-label="outlined primary button group">
                <Link to="/signUpForBuyer"><Button>Buyer</Button></Link>
                
                <Button>Seler</Button>
                <Button>Guest</Button>
            </ButtonGroup> */}
                    {
          // liveDrow === "CardImg"?<CardImg  />:null
          <CardImg  />
        }
    </div>
  )
}

export default Home
