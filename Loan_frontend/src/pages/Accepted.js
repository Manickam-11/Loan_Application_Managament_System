import React, { useState, useEffect } from 'react';
import {getLoansByStatus} from '../services/loanService';
import {Link, useNavigate} from 'react-router-dom';

const LoanApprovedList = () => {
    const [loans, setLoans] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        getLoansByStatus('Accepted')
            .then((response) => {
                setLoans(response.data);
                console.log(response.data);
            })
            .catch((error) => {
                console.error('There was an error fetching the loans!', error);
            });
    }, []);

    const handleGrantLoan = (id) => {
        navigate(`/loan/${id}/grant`);
    };

    return (
        <div>
            <h1>Approved Applications</h1>
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
                            <Link to={`/loan/${loan.id}`} className="btn2-blue">View Details</Link>
                            <Link to={`/loan/${loan.id}/grant`} className="btn2-green">Grant Loan</Link>
                        </div>
                    </div>
                ))}
            </div>
            <button className="btn-back" onClick={() => navigate(-1)}>Back</button>
        </div>
    );
};

export default LoanApprovedList;
