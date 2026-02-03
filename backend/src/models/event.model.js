import mongoose from "mongoose";

const eventSchema=new mongoose.Schema({
    title:String,
    dateTime:String,
    address:String,
    city:{
        type:String,
        default:"Sydney"
    },
    description:String,
    status:{
        type:String,
        default:"updated"
    },
    posterUrl:{
        type:String,
        default:null
    },
    sourceWebsite:{
        type:String,
        default:"https://www.darlingharbour.com/whats-on"
    },
    eventUrl:{
        type:String,
        unique:true
    },
    lastScrapedTime:{
        type:Date,
        default:Date.now
    }
});

const eventModel=mongoose.model("event",eventSchema);
export default eventModel;