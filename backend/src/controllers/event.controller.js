export async function getEvents(req,res){
  try {
    const events = await eventModel.find({
        isApproved:true
    }).limit(100).sort({ createdAt: -1 });
    
    res.json({
      success: true,
      events: events.map(event => ({
        _id: event._id,
        name: event.title,
        date: event.dateTime,
        location: event.sourceWebsite,
        description: event.description,
        status: event.status,
        url: event.eventUrl
      }))
    });
  } catch (error) {
    console.error('Error fetching events:', error);
    res.status(500).json({ 
      success: false, 
      message: 'Failed to fetch events' 
    });
  }
}

export async function getEvent(req,res){
  try {
    const event = await eventModel.findById(req.params.id);
    
    if (!event) {
      return res.status(404).json({ 
        success: false, 
        message: 'Event not found' 
      });
    }

    res.json({
      success: true,
      event: {
        _id: event._id,
        name: event.title,
        date: event.dateTime,
        location: event.sourceWebsite,
        description: event.description,
        status: event.status,
        url: event.eventUrl
      }
    });
  } catch (error) {
    console.error('Error fetching event:', error);
    res.status(500).json({ 
      success: false, 
      message: 'Failed to fetch event' 
    });
  }
}