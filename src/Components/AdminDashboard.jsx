import axios from 'axios';
import React, { useState } from 'react';
import { Outlet, useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';

const AdminDashboard = ({ token, setResponseData }) => {
    const [responseMsg, setResponseMsg] = useState('');
    const [showCreatedUrlsButton, setShowCreatedUrlsButton] = useState(true);
    const [showUrlDashboardButton, setShowUrlDashboardButton] = useState(true);
    const navigate = useNavigate();

    const handleView = async () => {
        try {
            
            const res = await axios.get('https://url-shortener-backend-cu3r.onrender.com/api/user/authorized', {
                headers: {
                    Authorization: `${token}` 
    
                }
            });
            setResponseData(res.data.data);
            setResponseMsg(res.data.message);
            toast.success(res.data.message);
            navigate('createdurls'); // for nested routing Don't need to use (/) this
            setShowCreatedUrlsButton(false);
            setShowUrlDashboardButton(true);
        } catch (error) {
            setResponseMsg(error.response.data.message || "Internal Error");
            toast.error(error.response.data.message);
        }
    };

    const handleCheck = async () => {
        try {
            // const res = await axios.get('http://localhost:5000/api/user/authorized', {
            const res = await axios.get('https://url-shortener-backend-cu3r.onrender.com/api/user/authorized', {
                headers: {
                    Authorization: `${token}`
                }
            });
            setResponseData(res.data.data);
            console.log(res)
            setResponseMsg(res.data.message);
            toast.success(res.data.message);
            navigate('urldashboard');
            setShowUrlDashboardButton(false);
            setShowCreatedUrlsButton(true);
        } catch (error) {
            setResponseMsg(error.response.data.message || "Internal Error");
            toast.error(error.response.data.message);
        }

    };

    return (
        <div className='container-lg'>
            <h1 className='text-center'>Admin Dashboard</h1>
            <div className='d-flex justify-content-center'>
                {showCreatedUrlsButton && (
                    <div className='mx-4'>
                        <button className='btn' onClick={handleView}>Created Urls</button>
                    </div>
                )}
                {showUrlDashboardButton && (
                    <div className='mx-4'>
                        <button className='btn' style={{ width: "auto" }} onClick={handleCheck}>URL Dashboard</button>
                    </div>
                )}
            </div>
            <Outlet />
            <ToastContainer />
        </div>
    );
};

export default AdminDashboard;