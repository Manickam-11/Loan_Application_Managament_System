import React, { useState, useEffect } from 'react';
import { getLoanById, deleteLoan} from '../services/loanService';
import { Link, useParams, useNavigate } from 'react-router-dom';


const LoanDetail = () => {
    const { id } = useParams();
    const [loan, setLoan] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        getLoanById(id)
            .then((response) => {
                setLoan(response.data);
            })
            .catch((error) => {
                console.error('There was an error fetching the loan!', error);
            });
    }, [id]);

    const handleUpdate = () => {
        navigate(`/loan/${id}/update`);
    };

    const handleDelete = async () => {
        try {
            await deleteLoan(id);
            navigate(-1);
        } catch (error) {
            console.error('Error deleting loan:', error);
        }
    };


    if (!loan) return <div>Loading...</div>;

    return (
        <div className="container">
            <h2>Loan Application Form {loan.applicantIdNumber}</h2>

            <div className="loan-details-box">
                <div className="loan-details-item">
                    <div className="details-label">Applicant Name:</div>
                    <div className="details-value">{loan.applicantName}</div>
                </div>

                <div className="loan-details-item">
                    <div className="details-label">Pincode:</div>
                    <div className="details-value">{loan.applicantPincode}</div>
                </div>
                <div className="loan-details-item">
                    <div className="details-label">Employment Status:</div>
                    <div className="details-value">{loan.applicantEmploymentStatus}</div>
                </div>
                <div className="loan-details-item">
                    <div className="details-label">Credit Score:</div>
                    <div className="details-value">{loan.creditScore}</div>
                </div>
                <div className="loan-details-item">
                    <div className="details-label">Loan Type:</div>
                    <div className="details-value">{loan.loanType}</div>
                </div>
                <div className="loan-details-item">
                    <div className="details-label">Amount:</div>
                    <div className="details-value">${loan.amount}</div>
                </div>
                <div className="loan-details-item">
                    <div className="details-label">Tenure:</div>
                    <div className="details-value">{loan.tenure} years</div>
                </div>
                <div className="loan-details-item">
                    <div className="details-label">Interest Rate:</div>
                    <div className="details-value">{loan.interestRate}%</div>
                </div>
                <div className="loan-details-item">
                    <div className="details-label">Status:</div>
                    <div className="details-value">{loan.status}</div>
                </div>
            </div>
            <div className="loan-actions">
                <button className="btn btn-primary" onClick={handleUpdate}>
                    Update
                </button>
                <button className="btn btn-danger delete-btn" onClick={handleDelete}>
                    Delete
                </button>
            </div>
            <button className="btn-back" onClick={() => navigate(-3)}>Back</button>
        </div>
    );
};

export default LoanDetail;
