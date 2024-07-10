import React, { useEffect, useState } from 'react';
import {getAllLoans, getLoansByStatus, updateLoanStatus} from '../services/loanService';
import { Link } from 'react-router-dom';
import { useNavigate } from "react-router-dom";


const Pending = () => {
    const [loans, setLoans] = useState([]);
    const navigate = useNavigate()

    useEffect(() => {
        getLoansByStatus('Pending')
            .then((response) => {
                setLoans(response.data);
            })
            .catch((error) => {
                console.error('There was an error fetching the loans!', error);
            });
    }, []);

    const updateStatus = async (id, status) => {
        await updateLoanStatus(id, status);
        //navigate(`/${status}`);
        window.location.reload();
    };


    return (
        <div>
            <h2>Pending Applications</h2>
            <div className="loan-list">
            {loans.map((loan) => (
                <div className="loan-card" key={loan.id}>
                    <h3>Application Number {loan.applicantIdNumber}</h3>
                    <p><strong>Applicant Name:</strong> {loan.applicantName}</p>
                    <p><strong>Loan Amount:</strong> {loan.amount}</p>
                    <p><strong>Tenure:</strong> {loan.tenure}</p>
                    <p><strong>Interest Rate:</strong> {loan.interestRate}% </p>
                    <p><strong>Status:</strong> {loan.status}</p>
                    <div className='btn-container'>
                        <button onClick={() => navigate(`/loan/${loan.id}`)} className="btn1 btn1-blue">
                            View Details
                        </button>
                    </div>
                    <div className="btn-approve-reject">
                        <button className="btn1 btn1-green" onClick={() => updateStatus(loan.id, 'Accepted')}>Approve
                        </button>
                        <button className="btn1 btn1-red" onClick={() => updateStatus(loan.id, 'Rejected')}>Reject
                        </button>

                    </div>

                </div>
            ))}
            </div>
            <button className="btn-back" onClick={() => navigate(-1)}>Back</button>
        </div>
    );
};

export default Pending;
