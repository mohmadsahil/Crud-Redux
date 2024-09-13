import mongoose from "mongoose";

export const DBConnect = ()=>{
    mongoose.connect(process.env.MONGODBURL)
    .then(()=>{
        console.log("DB Connected Successfully")
    })
    .catch(()=>{
        console.log("DB Not Connected! Showing Errors");
        
    })
}