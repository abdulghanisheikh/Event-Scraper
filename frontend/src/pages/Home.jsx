import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import GoogleAuth from '../components/GoogleAuth';

const Home=()=>{
  const navigate=useNavigate();
  const [events, setEvents]=useState([]);
  const [loading, setLoading]=useState(true);
  const [error, setError]=useState(null);
  const [showAuth, setShowAuth]=useState(false);

  useEffect(() => {
    fetchEvents();
  }, []);

  const fetchEvents=async()=>{
    try {
      setLoading(true);
      const response = await axios.get('http://localhost:3000/api/events');
      setEvents(response.data.events||[]);
      setError(null);
    } 
    catch(err){
      console.error('Failed to fetch events:', err);
      setError('Unable to load events');
      setEvents([]);
    } 
    finally{
      setLoading(false);
    }
  };

  const goToAdmin = () => {
    const token = localStorage.getItem('authToken');
    if (!token) {
      toast.warning('Please sign in first to access the dashboard', {
        position: 'top-center',
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
      });
      setShowAuth(true);
    } else {
      navigate('/admin');
    }
  };

  return (
    <div className="bg-zinc-900 text-white min-h-screen w-full p-8">
      <ToastContainer
        position="top-center"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={true}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex justify-between items-center mb-12">
          <div>
            <h1 className="text-3xl lg:text-5xl font-bold mb-2">Event Scraper</h1>
            <p className="text-zinc-400 text-xs lg:text-lg w-30 lg:w-fit">Discover upcoming events from around the web</p>
          </div>
          <div className="flex gap-2 lg:gap-4">
            <button
              onClick={goToAdmin}
              className="bg-green-600 hover:bg-green-700 text-white px-3 lg:px-6 py-1 lg:py-2 cursor-pointer rounded-md transition text-xs lg:text-lg"
            >
              Dashboard
            </button>
            <button
              onClick={() => setShowAuth(!showAuth)}
              className="bg-blue-600 hover:bg-blue-700 text-white px-3 lg:px-6 py-1 lg:py-2 cursor-pointer rounded-md transition text-xs lg:text-lg"
            >
              {showAuth ? 'Close' : 'Sign In'}
            </button>
          </div>
        </div>

        {/* Auth Modal */}
        {showAuth&&(
          <div 
            className="fixed inset-0 bg-black/5 bg-opacity-30 backdrop-blur-sm flex items-center justify-center z-50"
            onClick={() => setShowAuth(false)}
          >
            <div 
              className="bg-zinc-800 rounded-lg p-8 w-full max-w-md"
              onClick={(e) => e.stopPropagation()}
            >
              <GoogleAuth />
            </div>
          </div>
        )}

        {/* Loading State */}
        {loading && (
          <div className="flex justify-center items-center py-20">
            <p className="text-zinc-400 text-lg">Loading events...</p>
          </div>
        )}

        {/* Events Grid */}
        {!loading&&events.length>0&&(
          <div>
            <h2 className="text-3xl font-bold mb-8">Featured Events ({events.length})</h2>
            <div className="flex flex-wrap gap-6">
              {events.map((event)=>(
                <div
                  key={event._id}
                  className="basis-full md:basis-1/2 lg:basis-1/4 bg-zinc-800 rounded-lg overflow-hidden hover:bg-zinc-700 transition border border-zinc-700"
                >
                  <div className="p-6">
                    {/* Title */}
                    <h3 className="text-xl font-bold text-white mb-2 line-clamp-2">
                      {event.name || 'Untitled Event'}
                    </h3>

                    {/* Date */}
                    {event.date && (
                      <p className="text-zinc-400 text-sm mb-3">
                        📅 {new Date(event.date).toLocaleDateString('en-US',{
                          year: 'numeric',
                          month: 'long',
                          day: 'numeric'
                        })}
                      </p>
                    )}

                    {/* Location */}
                    {event.location && (
                      <p className="text-zinc-400 text-sm mb-3">
                        📍 {event.location}
                      </p>
                    )}

                    {/* Description */}
                    {event.description && (
                      <p className="text-zinc-300 text-sm mb-4 line-clamp-3">
                        {event.description}
                      </p>
                    )}

                    {/* Status Badge */}
                    <div className="flex items-center justify-between mt-4">
                      <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                        event.status === 'active'
                          ? 'bg-green-900 text-green-200'
                          : event.status === 'cancelled'
                          ? 'bg-red-900 text-red-200'
                          : 'bg-yellow-900 text-yellow-200'
                      }`}>
                        {event.status || 'pending'}
                      </span>
                      
                      {event.url && (
                        <a
                          href={event.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-blue-400 hover:text-blue-300 text-sm font-semibold"
                        >
                          View →
                        </a>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Empty State */}
        {!loading&&events.length===0&&(
          <div className="text-center py-1">
            <p className="text-zinc-400 text-lg">Check back soon for new events!</p>
            {error && (
              <p className="text-zinc-500 text-sm mt-2">{error}</p>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default Home;