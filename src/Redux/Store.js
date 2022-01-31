import { configureStore } from "@reduxjs/toolkit";
import auctionRedused from "./Slicer"

export const store = configureStore({
  reducer: {
    auction:auctionRedused
  },
})