import { GoogleOAuthProvider, GoogleLogin } from '@react-oauth/google';
import { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const GoogleAuth = ({ onLoginSuccess }) => {
  const navigate=useNavigate();
  const [loading,setLoading]=useState(false);

  const handleLoginSuccess=async(credentialResponse)=>{
    setLoading(true);
    try {
      // Send token to backend for verification
      const response = await axios.post('http://localhost:3000/api/auth/google',{
        token:credentialResponse.credential
      });

      const userData = response.data.user;
      
      // Store token in localStorage
      localStorage.setItem('authToken',response.data.token);
      localStorage.setItem('user',JSON.stringify(userData));
      
      if (onLoginSuccess){
        onLoginSuccess(userData);
      }

      // Redirect to AdminPage
      navigate('/admin');
    } 
    catch (error){
      console.error('Login failed:', error);
      console.error('Error response:', error.response?.data);
      alert('Login failed: ' + (error.response?.data?.error || error.message || 'Please try again.'));
    }
    finally{
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col justify-center items-center gap-4 px-5 py-8 bg-zinc-800 rounded-md w-fit">
      <h2 className="text-white text-2xl font-bold">Sign In</h2>
      <p className="text-zinc-400">Sign in with your Google account to access the dashboard</p>
      <GoogleOAuthProvider clientId={import.meta.env.VITE_GOOGLE_CLIENT_ID}>
        <GoogleLogin
          onSuccess={handleLoginSuccess}
          onError={() => console.log('Login Failed')}
          text="signin_with"
          theme="dark"
          size="large"
        />
      </GoogleOAuthProvider>
      {loading && <p className="text-zinc-400">Signing in...</p>}
    </div>
  );
};

export default GoogleAuth;
