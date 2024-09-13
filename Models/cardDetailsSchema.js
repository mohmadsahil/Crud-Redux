import mongoose from "mongoose";

const cardDetailsSchema = new mongoose.Schema({
    title:{
        type:String,
        required:true,
    },
    description:{
        type:String,
        required:true,
    },
    image:{
        public_id:String,
        url:String,
    }
}) 

export const cardData = mongoose.model("cardData",cardDetailsSchema);