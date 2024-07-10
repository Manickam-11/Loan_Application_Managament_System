import React, { useState, useEffect } from 'react';
import { getLoanById } from '../services/loanService';
import { useParams } from 'react-router-dom';
import Chart from 'chart.js/auto';
import { Pie } from 'react-chartjs-2';

const GrantLoan = () => {
    const { id } = useParams();
    const [loan, setLoan] = useState({});
    const [emi, setEmi] = useState(0);
    const [interest, setInterest] = useState(0);
    const [payment, setPayment] = useState(0);
    const [period, setPeriod] = useState(0);
    const canvas = document.getElementById('myCanvas');
    const [chartData, setChartData] = useState(null);


    useEffect(() => {
        getLoanById(id)
            .then((response) => {
                setLoan(response.data);
            })
            .catch((error) => {
                console.error('There was an error fetching the loan!', error);
            });
    }, [id]);

    const calculateEMI = (principal, rate, tenure) => {
        const monthlyRate = rate / (12 * 100);
        const period = tenure * 12;
        setPeriod(period);
        const emi = (principal * monthlyRate * Math.pow((1 + monthlyRate), period)) / (Math.pow((1 + monthlyRate), period) - 1);
        setEmi(emi.toFixed(2));
        const interest = ((emi * period)-principal)
        setInterest(interest.toFixed(2));
        const payment = (emi*period)
        setPayment(payment.toFixed(2));
        setTimeout(() => {
            drawChart(principal, interest);
        }, 0);
    };



    const drawChart = (principal, interest) => {
        const ctx = document.getElementById('emiChart');
        new Chart(ctx, {
            type: 'pie',
            data: {
                labels: ['Principal Loan Amount', 'Total Interest'],
                datasets: [{
                    label: 'Amount',
                    data: [principal, interest],
                    backgroundColor: ['#ff6384', '#36a2eb']
                }]
            },
            options: {
                title: {
                    display: true,
                    text: "Break-up of Total Payment"
                }
            }
        });
    };

    return (
        <div>
            <h1>Grant Loan</h1>
            {loan && (
                <div className="grant">
                    <div className='loan-grant'>
                        <p>Applicant Name: {loan.applicantName}</p>
                        <p>Applicant ID: {loan.id}</p>
                        <p>Amount: {loan.amount}</p>
                        <p>Interest Rate: {loan.interestRate}</p>
                        <p>Tenure: {loan.tenure}</p>
                        <div className="emi-calculator">
                            <h3>EMI Calculator</h3>
                            <button onClick={() => calculateEMI(loan.amount, loan.interestRate, loan.tenure)}>Calculate
                                EMI
                            </button>
                        </div>
                    </div>

                        {emi > 0 && (
                            <div className="emi-details">
                                <div>
                                    <p>Monthly EMI: <strong>₹{emi}</strong></p>
                                    <p>Months: <strong> {period}</strong></p>
                                    <p>Total Payment: <strong>₹{payment}</strong></p>
                                    <p>Total Interest Payable: <strong>₹{interest}</strong></p>
                                </div>
                                <div className="vl"></div>
                                <div>
                                    <canvas id="emiChart"></canvas>
                                </div>
                            </div>
                        )}


                </div>
            )}
        </div>
    );
};

export default GrantLoan;
