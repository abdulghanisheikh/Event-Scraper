const EventsTable=({events,error,loading,fetchEvents})=>{
  
  if(loading){
    return (
      <div className="flex justify-center items-center p-8">
        <p className="text-zinc-400">Loading events...</p>
      </div>
    );
  }

  if (error){
    return(
        <div className="flex flex-col justify-center items-center py-5 mt-10">
          <p className='self-center'>{error}</p>
          <button
            onClick={fetchEvents}
            className="mt-2 bg-red-700 hover:bg-red-600 px-6 py-1 w-fit rounded transition cursor-pointer"
          >
            Retry
          </button>
        </div>
    );
  }

  return (
    <div className="bg-zinc-800 p-4 lg:p-6 rounded-lg">
      <div className="flex justify-between items-center mb-4 lg:mb-4">
        <h2 className="text-white text-xl lg:text-2xl font-bold">Events Table</h2>
        <button
          onClick={()=>fetchEvents()}
          className="bg-blue-600 hover:bg-blue-700 text-white px-3 lg:px-4 py-2 rounded transition text-sm lg:text-base"
        >
          Refresh
        </button>
      </div>

      {events.length === 0 ? (
        <p className="text-zinc-400 text-center py-8">No events found</p>
      ) : (
        <>
          <div className="hidden lg:block overflow-x-auto">
            <table className="w-full text-left">
              <thead>
                <tr className="border-b border-zinc-700">
                  <th className="text-white font-semibold py-3 px-4">Event Name</th>
                  <th className="text-white font-semibold py-3 px-4">Date</th>
                  <th className="text-white font-semibold py-3 px-4">Location</th>
                  <th className="text-white font-semibold py-3 px-4">Description</th>
                  <th className="text-white font-semibold py-3 px-4">Status</th>
                </tr>
              </thead>
              <tbody>
                {events.map((event) => (
                  <tr key={event._id} className="border-b border-zinc-700 hover:bg-zinc-700 transition">
                    <td className="text-zinc-100 py-3 px-4 font-medium">{event.name}</td>
                    <td className="text-zinc-300 py-3 px-4">
                      {event.date ? new Date(event.date).toLocaleDateString() : 'N/A'}
                    </td>
                    <td className="text-zinc-300 py-3 px-4">{event.location || 'N/A'}</td>
                    <td className="text-zinc-400 py-3 px-4 truncate max-w-xs">{event.description || 'N/A'}</td>
                    <td className="py-3 px-4">
                      <span className={`px-3 py-1 rounded-full text-sm font-medium ${
                        event.status === 'active' 
                          ? 'bg-green-900 text-green-200' 
                          : event.status === 'cancelled'
                          ? 'bg-red-900 text-red-200'
                          : 'bg-yellow-900 text-yellow-200'
                      }`}>
                        {event.status || 'pending'}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="lg:hidden space-y-4">
            {events.map((event) => (
              <div key={event._id} className="bg-zinc-700 rounded-lg p-4 border border-zinc-600">
                <div className="mb-3">
                  <h3 className="text-white font-semibold text-lg mb-1">{event.name}</h3>
                  <span className={`inline-block px-2 py-1 rounded text-xs font-medium ${
                    event.status === 'active' 
                      ? 'bg-green-900 text-green-200' 
                      : event.status === 'cancelled'
                      ? 'bg-red-900 text-red-200'
                      : 'bg-yellow-900 text-yellow-200'
                  }`}>
                    {event.status || 'pending'}
                  </span>
                </div>

                <div className="space-y-2 text-sm">
                  {event.date && (
                    <div>
                      <p className="text-zinc-400">Date</p>
                      <p className="text-zinc-200">{new Date(event.date).toLocaleDateString()}</p>
                    </div>
                  )}
                  
                  {event.location && (
                    <div>
                      <p className="text-zinc-400">Location</p>
                      <p className="text-zinc-200">{event.location}</p>
                    </div>
                  )}
                  
                  {event.description && (
                    <div>
                      <p className="text-zinc-400">Description</p>
                      <p className="text-zinc-200 line-clamp-3">{event.description}</p>
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        </>
      )}
    </div>
  );
};

export default EventsTable;
