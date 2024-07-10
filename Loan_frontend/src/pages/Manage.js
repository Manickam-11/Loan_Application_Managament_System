import React from 'react';
import { Link } from 'react-router-dom';
import { useNavigate } from "react-router-dom";

const Manage = () => {
    const navigate = useNavigate();
    return (
        <div className="home">
            <div className="top-bar">
                <h1 className="title">Manage Records</h1>
            </div>
            <div className="home-sections">
                <Link to="/Pending" className="home-section">Pending Applications</Link>
                <Link to="/Accepted" className="home-section">Approved Applications</Link>
                <Link to="/Rejected" className="home-section">Rejected Applications</Link>
            </div>
            <button className="btn-back" onClick={() => navigate(-1)}>Back</button>
        </div>
    );
};

export default Manage;