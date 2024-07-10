import React from 'react';
import { BrowserRouter, Routes, Route,  } from 'react-router-dom';
import HomePage from './pages/HomePage';
import Pending from './pages/Pending';
import Accepted from './pages/Accepted';
import Rejected from './pages/Rejected';
import Statistics from './pages/Statistics';
import LoanDetail from './components/LoanDetail';
import LoanUpdate from './components/LoanUpdate';
import GrantLoan from "./components/GrantLoan";
import './App.css';
import LoanForm from "./components/LoanForm";
import Manage from "./pages/Manage";


function App() {
    return (
        <BrowserRouter>
            <div className="App">
                <Routes>
                    <Route path="/" element={<HomePage />} />
                    <Route path="/add-loan" element={<LoanForm />} />
                    <Route path="/manage" element={<Manage />} />
                    <Route path="/Pending" element={<Pending />} />
                    <Route path="/Accepted" element={<Accepted />} />
                    <Route path="/Rejected" element={<Rejected />} />
                    <Route path="/Statistics" element={<Statistics />} />
                    <Route path="/loan/:id" element={<LoanDetail />} />
                    <Route path="/loan/:id/update" element={<LoanUpdate />} />
                    <Route path="/loan/:id/grant" element={<GrantLoan />} />
                </Routes>
            </div>
        </BrowserRouter>
    );
}

export default App;
