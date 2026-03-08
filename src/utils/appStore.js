import { configureStore } from "@reduxjs/toolkit";
import userReduser from"./userSlice"
import feedReduser from "./feedSlice"
const appStore=configureStore(
    {
        reducer:{
            user:userReduser, 
            feed:feedReduser,  
        }
    }
)
export default appStore