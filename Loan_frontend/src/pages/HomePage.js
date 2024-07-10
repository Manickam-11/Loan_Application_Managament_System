import React from 'react';
import { Link } from 'react-router-dom';

const HomePage = () => {
    return (
        <div className="home">
            <nav className="top-bar">
                <h1 className="title">Loan Application Management</h1>
                <div className="top-links">
                    <Link to="/add-loan" className="top-link">Add Records</Link>
                    <Link to="/manage" className="top-link">Manage Records</Link>
                    <Link to="/statistics" className="top-link">Records Analysis</Link>
                </div>
            </nav>
        </div>
    );
};

export default HomePage;
