import React from "react"
import NavigationBar from "../NavigationBar"
import LiveCardImg from "./LiveCardImg"


function Home({setItem}) {
  return (
    <div>
      <NavigationBar />
      <LiveCardImg setItem={setItem}/>
    </div>
  )
}

export default Home
