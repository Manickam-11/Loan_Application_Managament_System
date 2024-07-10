import React, { useState } from 'react';
import { createLoan } from '../services/loanService';
import { useNavigate } from 'react-router-dom';

const LoanForm = () => {
    const [loan, setLoan] = useState({
        applicantIdNumber: '',
        applicantName: '',
        applicantPincode: '',
        applicantEmploymentStatus: 'Full-time employee',
        creditScore: 300,
        loanType: 'Personal loan',
        amount: '',
        tenure: 1,
        interestRate: '',
        status: 'Pending'
    });
    const navigate = useNavigate();

    const handleChange = (e) => {
        const { name, value } = e.target;
        setLoan({
            ...loan,
            [name]: value,
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        createLoan(loan)
            .then((response) => {
                console.log('Loan created:', response.data);
                navigate('/');
            })
            .catch((error) => {
                console.error('There was an error creating the loan!', error);
            });
    };

    return (
        <div className="loan-form-container">
            <h2>Loan Application Form</h2>
            <form onSubmit={handleSubmit}>
                <div className="loan-form">
                    <div className="form-section">
                        <h3>Applicant Details</h3>
                        <div className="form-group">
                            <label>
                                Applicant ID Number:
                                <input type="text" name="applicantIdNumber" value={loan.applicantIdNumber}
                                       onChange={handleChange}
                                       required/>
                            </label>
                        </div>
                        <div className="form-group">
                            <label>
                                Applicant Name:
                                <input type="text" name="applicantName" value={loan.applicantName} onChange={handleChange}
                                       required/>
                            </label>
                        </div>
                        <div className="form-group">
                            <label>
                                Applicant City:
                                <input type="text" name="applicantPincode" value={loan.applicantPincode}
                                       onChange={handleChange}
                                       required/>
                            </label>
                        </div>
                        <div className="form-group">
                            <label>
                                Employment Status:
                                <select name="applicantEmploymentStatus" value={loan.applicantEmploymentStatus}
                                        onChange={handleChange} required>
                                    <option value="full-time employee">Full-time Employee</option>
                                    <option value="freelance">Freelance</option>
                                    <option value="self-employed">Self-employed</option>
                                    <option value="unemployed">Unemployed</option>
                                </select>
                            </label>
                        </div>
                        <div className="form-group">
                            <label>
                                Credit Score:
                                <input type="number" min="300" max="850" name="creditScore" value={loan.creditScore}
                                       onChange={handleChange}
                                       required/>
                            </label>
                        </div>
                    </div>
                    <div className="form-section">
                        <h3>Loan Details</h3>
                        <div className="form-group">
                            <label>
                                Type of Loan:
                                <select name="loanType" value={loan.loanType} onChange={handleChange} required>
                                    <option value="Personal Loan">Personal Loan</option>
                                    <option value="Home Loan">Home Loan</option>
                                    <option value="Education Loan">Education Loan</option>
                                </select>
                            </label>
                        </div>
                        <div className="form-group">
                            <label>
                                Amount:
                                <input type="number" name="amount" value={loan.amount} onChange={handleChange} required/>
                            </label>
                        </div>
                        <div className="form-group">
                            <label>
                                Tenure (years):
                                <input type="number" name="tenure" min="1" max="15" value={loan.tenure}
                                       onChange={handleChange}
                                       required/>
                            </label>
                        </div>
                        <div className="form-group">
                            <label>
                                Interest Rate:
                                <input type="number" name="interestRate" value={loan.interestRate} onChange={handleChange}
                                       required/>
                            </label>
                        </div>

                        <div className="form-group">
                            <label>
                                Status:
                                <select name="status" value={loan.status} onChange={handleChange} required>
                                    <option value="Pending">Pending</option>
                                    <option value="Accepted">Accepted</option>
                                    <option value="Rejected">Rejected</option>
                                </select>
                            </label>
                        </div>
                    </div>
                </div>
                <button type="submit" className="btn-submit">Submit</button>
            </form>
            <button className="btn-back" onClick={() => navigate(-1)}>Back</button>
        </div>
    );
};

export default LoanForm;




