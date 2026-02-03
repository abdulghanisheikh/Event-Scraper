import mongoose from "mongoose";

const scraperSchema=new mongoose.Schema({
    key:{
        type:String,
        default:"event scraper",
        required:true
    },
    lastScrapedAt:{
        type:Date,
        default:null
    },
    status:{
        type:String,
        default:"idle"
    },
    lastRunResult:{
        type:String,
        enum:["success","failed"],
        default:null
    }
});

const scraperModel=mongoose.model("scraper",scraperSchema);
export default scraperModel;