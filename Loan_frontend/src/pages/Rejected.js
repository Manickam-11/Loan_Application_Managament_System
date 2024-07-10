import React, { useState, useEffect } from 'react';
import {getLoansByStatus, updateLoanStatus} from '../services/loanService';
import {Link, useNavigate} from 'react-router-dom';

const LoanApprovedList = () => {
    const [loans, setLoans] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        getLoansByStatus('Rejected')
            .then((response) => {
                setLoans(response.data);
                console.log(response.data);
            })
            .catch((error) => {
                console.error('There was an error fetching the loans!', error);
            });
    }, []);

    const updateStatus = async (id, status) => {
        await updateLoanStatus(id, status);
        window.location.reload();
    };


    return (
        <div>
            <h1>Rejected Applications</h1>
            <div className="loan-list">
                {loans.map((loan) => (
                    <div className="loan-card" key={loan.id}>
                        <h3>Application Number: {loan.applicantIdNumber}</h3>
                        <p><strong>Applicant Name: </strong>{loan.applicantName}</p>
                        <p><strong>Loan Amount: </strong>{loan.amount}</p>
                        <p><strong>Tenure:</strong> {loan.tenure}</p>
                        <p><strong>Interest Rate:</strong> {loan.interestRate}% </p>
                        <p><strong>Status: </strong>{loan.status}</p>
                        <div className="btn2-container">
                            <button onClick={() => navigate(`/loan/${loan.id}`)} className="btn2-blue">
                                View Details
                            </button>
                            <button className="btn2-green" onClick={() => updateStatus(loan.id, 'Pending')}>Move to
                                Pending
                            </button>
                        </div>
                    </div>
                ))}
            </div>
            <button className="btn-back" onClick={() => navigate(-1)}>Back</button>
        </div>
    );
};

export default LoanApprovedList;
