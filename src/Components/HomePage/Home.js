import React from "react"
import NavigationBar from "../NavigationBar"
import CardImg from "./CardImg"

function Home({setItem}) {
  return (
    <div>
      <NavigationBar />
      <CardImg setItem={setItem}  />
    </div>
  )
}

export default Home
