import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import EventsTable from '../components/EventsTable';

const AdminPage = () => {
  const navigate=useNavigate();
  const [user,setUser]=useState(null);

  useEffect(()=>{
    const token = localStorage.getItem('authToken');
    const userData = localStorage.getItem('user');

    if (!token){
      navigate('/');
    } 
    else if(userData){
      setUser(JSON.parse(userData));
    }
  },[navigate]);

  const handleLogout = () => {
    localStorage.removeItem('authToken');
    localStorage.removeItem('user');
    navigate('/');
  };

  const goToHome = () => {
    navigate('/');
  };

  return (
    <div className="bg-zinc-900 text-white min-h-screen w-full p-4 lg:p-8">
      <div className="max-w-7xl mx-auto">
        <div className="flex justify-between items-start lg:items-center gap-4 mb-5 lg:mb-15">
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
              className="bg-gray-600 hover:bg-gray-700 text-white px-4 lg:px-6 py-2 rounded-lg transition font-semibold text-sm lg:text-base cursor-pointer"
            >
              Home
            </button>
            <button
              onClick={handleLogout}
              className="bg-red-600 hover:bg-red-700 text-white px-4 lg:px-6 py-2 rounded-lg transition font-semibold text-sm lg:text-base cursor-pointer"
            >
              Logout
            </button>
          </div>
        </div>

        {user && (
          <div className="lg:hidden text-left mb-8">
            <p className="text-white font-semibold text-sm">{user.name}</p>
            <p className="text-zinc-400 text-xs truncate">{user.email}</p>
          </div>
        )}
        <EventsTable />
      </div>
    </div>
  );
};

export default AdminPage;