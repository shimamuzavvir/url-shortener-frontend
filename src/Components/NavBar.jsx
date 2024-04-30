import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

const NavBar = () => {
    const [showAdminButton, setShowAdminButton] = useState(true);
    const navigate = useNavigate();

    const handleView = () => {
        navigate('/dashboard');
        setShowAdminButton(false);
    };

    const handleNavigate = () => {
        navigate('/home');
        setShowAdminButton(true);
    };

    const handleLogout = () =>{
        // Clear LocalStorage items related to authentication
        localStorage.removeItem('token')
        localStorage.removeItem('username')
        localStorage.removeItem('email')

        navigate('/login')
    
    }
    return (
        <nav className="navbar navbar-expand-lg bg-body-tertiary">
            <div className="container-fluid">
                {/* <a className="navbar-brand">URL-SHORTENER</a> */}
                <Link to="/home" className="navbar-brand">URL-SHORTENER</Link>
                <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNavDropdown" aria-controls="navbarNavDropdown" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse nav-btns" id="navbarNavDropdown" >
                    <div className="navbar-nav ms-auto" >
                        {showAdminButton && <button className='btn btn-primary mx-5 ' style={{ width: "auto" }} onClick={handleView}>Admin Dashboard</button>}
                        {!showAdminButton && <button className='btn btn-primary mx-5' onClick={handleNavigate}>Home</button>}
                    </div>
                    <button className='btn text-center logout-button' style={{ backgroundColor: "rgb(237, 57, 57)" }} onClick={handleLogout}><i className="fa-solid fa-power-off"></i></button>
                </div>
            </div>
        </nav> 
    );
};

export default NavBar;