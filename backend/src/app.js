import express from "express";
import dotenv from "dotenv";
import scrapEvents from "./scraper.js";
import eventModel from "./models/event.model.js";
import scrapModel from "./models/scraper.model.js";
import eventRouter from "./routes/events.routes.js";
import authRouter from "./routes/auth.routes.js";
import cors from "cors";

dotenv.config();
const app=express();
app.use(express.json());
app.use(cors({
    origin:process.env.FRONTEND_URL||"http://localhost:5173"
}));

app.use("/api/auth",authRouter);
app.use("/api/events",eventRouter);

async function saveEventsInDB(){
    const events=await scrapEvents();

    if(!events||events.length===0){
        console.log("No events scraped");
        return;
    }

    for(const event of events){
        const createdEvent=await eventModel.updateOne({
            eventUrl:event.eventUrl
        },{
            $set:{
                title:event.title||null,
                dateTime:event.date||null,
                description:event.description||null,
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
        else if(createdEvent.matchedCount===1){
            console.log("Event already exists (no update required)");
        }
        else{
            console.log("Event updated");
        }
    }
}

export async function runScraping(req,res,next){
    const scraper=await scrapModel.findOne({
        key:"event-scraper"
    });

    if(!scraper){
        await scrapModel.create({
            key:"event-scraper",
            status:"running",
        });

        try{
            await saveEventsInDB();

            await scrapModel.updateOne({
                key:"event-scraper"
            },{
                $set:{
                    status:"idle",
                    lastScrapedAt:new Date(),
                    lastRunResult:"success"
                }
            });
        }
        catch(err){
            console.log("Scraping failed:",err);

            await scrapModel.updateOne({
                key:"event-scraper"
            },{
                status:"idle",
                lastRunResult:"failed"
            });
        }
        finally{
            return;
        }
    }

    if(scraper.status==="running") return;

    if(!scraper.lastScrapedAt){
        await scrapModel.updateOne({
            key:"event-scraper"
        },{
            $set:{
                status:"running"
            }
        },{upsert:true});

        try{
            await saveEventsInDB();

            await scrapModel.updateOne({
                key:"event-scraper"
            },{
                $set:{
                    status:"idle",
                    lastScrapedAt:new Date(),
                    lastRunResult:"success"
                }
            });
        }
        catch(err){
            console.log("Scraping failed:",err);

            await scrapModel.updateOne({
                key:"event-scraper"
            },{
                status:"idle",
                lastRunResult:"failed"
            });
        }
        finally{
            return;
        }
    }

    const SIX_HOURS=6*60*60*1000;
    const now=new Date();
    if((now-scraper.lastScrapedAt)>=SIX_HOURS){
        await scrapModel.updateOne({
            key:"event-scraper"
        },{
            $set:{
                status:"running"
            }
        },{upsert:true});

        try{
            await saveEventsInDB();

            await scrapModel.updateOne({
                key:"event-scraper"
            },{
                $set:{
                    status:"idle",
                    lastScrapedAt:new Date(),
                    lastRunResult:"success"
                }
            });
        }
        catch(err){
            console.log("Scraping failed:",err);

            await scrapModel.updateOne({
                key:"event-scraper"
            },{
                status:"idle",
                lastRunResult:"failed"
            });
        }
        finally{
            return;
        }
    }
    next();
}

export default app;