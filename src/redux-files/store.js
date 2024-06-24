import { configureStore } from "@reduxjs/toolkit";
import productSlice from "./productSlice";
//we need to install redux and react redux and redux toolkit we can get the installation guide from the official site
//I've already installed them
const store=configureStore({
    reducer:{
        //give it any name
        products:productSlice
    }
})
export default store