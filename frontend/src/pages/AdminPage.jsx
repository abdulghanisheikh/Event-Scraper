import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import EventsTable from '../components/EventsTable';
import EventFilters from '../components/EventFilters';
import axios from 'axios';

const AdminPage = () => {
  const navigate=useNavigate();
  const [user,setUser]=useState(null);  
  const [loading,setLoading]=useState(true);
  const [events,setEvents]=useState([]);
  const [error,setError]=useState(null);


  const fetchEvents=async()=>{
    try{
      setLoading(true);
      const token = localStorage.getItem('authToken');
      
      const response = await axios.get('http://localhost:3000/api/events',{
        headers:{
          Authorization:`Bearer ${token}`
        }
      });

      setEvents(response.data.events||[]);
      setError(null);
    } catch(err){
      console.error('Failed to fetch events:', err);
      setError('Failed to load events');
    } finally {
      setLoading(false);
    }
  };

  useEffect(()=>{
    fetchEvents();
    const token = localStorage.getItem('authToken');
    const userData = localStorage.getItem('user');

    if(!token) navigate("/");
    else{
      if(userData){
        setUser(JSON.parse(userData));
      }
    }
  },[navigate]);

  const handleLogout=()=>{
    localStorage.removeItem('authToken');
    localStorage.removeItem('user');
    navigate('/');
  };

  const goToHome=()=>{
    navigate('/');
  };

  return (
    <div className="bg-zinc-900 text-white min-h-screen w-full p-4 lg:p-8 lg:px-15">
      <div className="w-full mx-auto flex flex-col">
        <div className="flex justify-between items-start lg:items-center mb-5 gap-4 lg:mb-8">
          <h1 className="text-3xl lg:text-5xl font-bold">Dashboard</h1>
          <div className="flex lg:flex-row items-start lg:items-center gap-2 lg:gap-3">
            {user && (
              <div className="hidden lg:block text-right">
                <p className="text-white font-semibold text-sm lg:text-base">{user.name}</p>
                <p className="text-zinc-400 text-xs lg:text-sm truncate">{user.email}</p>
              </div>
            )}
            <button
              onClick={goToHome}
              className="bg-gray-600 hover:bg-gray-700 text-white px-2 lg:px-6 py-1 lg:py-2 rounded-lg transition font-semibold text-sm lg:text-base cursor-pointer"
            >
              Home
            </button>
            <button
              onClick={handleLogout}
              className="bg-red-600 hover:bg-red-700 text-white px-2 lg:px-6 py-1 lg:py-2 rounded-lg transition font-semibold text-sm lg:text-base cursor-pointer"
            >
              Logout
            </button>
          </div>
        </div>
        <div className='py-5 w-fit border border-white self-center'>
          <p>events filter will come here</p>
        </div>
        <EventsTable error={error} events={events} loading={loading} fetchEvents={fetchEvents} />
      </div>
    </div>
  );
};

export default AdminPage;