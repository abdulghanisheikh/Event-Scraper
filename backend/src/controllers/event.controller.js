import eventModel from "../models/event.model.js";

export async function getEvents(req,res){
  try {
    const events=await eventModel.find();
  
    if(!events||events.length===0){
      return res.status(404).json({
        success:false,
        message:"No events found"
      });
    }

    return res.status(200).json({
      success:true,
      message:"Events fetched successfully",
      events
    });

  } 
  catch(error){
    return res.json({
      success:false,
      message:"Server error",
      error
    });
  }
}