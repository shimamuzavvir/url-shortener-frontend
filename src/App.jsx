import React, { useState, useEffect } from 'react';
import { BrowserRouter, Route, Routes, useNavigate } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import "react-toastify/dist/ReactToastify.css";
import LoginPage from './Components/LoginPage';
import Home from './Components/Home';
import ForgetPassword from './Components/ForgetPassword';
import ResetPassword from './Components/ResetPassword';
import UrlShortener from './Components/UrlShortener';
import NavBar from './Components/NavBar';
import AdminDashboard from './Components/AdminDashboard';
import CreatedUrls from './Components/CreatedUrls';
import UrlDashboard from './Components/UrlDashboard';
import RegisterPage from './Components/RegisterPage';

const App = () => {

  // Initialize state from localStorage if available, otherwise use empty strings
  const [token, setToken] = useState(localStorage.getItem('token') || '');
  const [username, setUsername] = useState(localStorage.getItem('username') || '');
  const [email, setEmail] = useState(localStorage.getItem('email') || '');
  const [responseData, setResponseData] = useState([]);

  // Save state to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem('token', token);
    localStorage.setItem('username', username);
    localStorage.setItem('email', email);
  }, [token, username, email]);
  
  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<RegisterPage />} />
          <Route path='/login' element={<LoginPage setUsername={setUsername} setEmail={setEmail} setToken={setToken} />} />
          <Route path='/home/:email' element={<Home username={username} />} />
          <Route path='/forget' element={<ForgetPassword />} />
          <Route path='/resetpassword' element={<ResetPassword />} />
          <Route path='/urlshortener/:email' element={<><NavBar /><UrlShortener email={email} /> </>} />
           <Route path='/dashboard' element={<><NavBar /><AdminDashboard token={token} setResponseData={setResponseData} /></>}>
            <Route path='createdurls' element={<CreatedUrls responseData={responseData} />} /> 
            <Route path='urldashboard' element={<UrlDashboard />} /> 
  </Route> 
        </Routes>
      </BrowserRouter>
      <ToastContainer />
    </div>
  );
};

export default App;
