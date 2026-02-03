import express from "express";
import dotenv from "dotenv";
import scrapEvents from "./scraper.js";
import eventModel from "./models/event.model.js";

dotenv.config();
const app=express();

async function saveEventsInDB(){
    const events=await scrapEvents();

    for(const event of events){
        const createdEvent=await eventModel.updateOne({
            eventUrl:event.eventUrl
        },{
            $set:{
                title:event.title||null,
                dateTime:event.date||null,
                description:events.description||null,
                sourceWebsite:event.sourceWebsite||null
            },
            $setOnInsert:{
                status:"new",
                eventUrl:event.eventUrl
            }
        },{
            upsert:true
        });
        
        if(createdEvent.upsertedCount===1){
            console.log("New event inserted");
        }
        else if(createdEvent.modifiedCount===1){
            console.log("Event updated");
        }
    }
}
saveEventsInDB();

export default app;