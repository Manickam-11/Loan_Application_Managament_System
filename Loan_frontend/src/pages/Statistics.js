import React, { useEffect, useState } from 'react';
import { Bar, Pie, Line } from 'react-chartjs-2';
import { getLoanStatistics } from '../services/loanService';
import { useNavigate} from "react-router-dom";

const Statistics = () => {
    const [statistics, setStatistics] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        getLoanStatistics().then(response => {
            setStatistics(response.data);
        });
    }, []);

    if (!statistics) {
        return <div>Loading...</div>;
    }

    const loanStatuses = {
        labels: Object.keys(statistics.loanStatuses),
        datasets: [
            {
                label: 'Loan Statuses',
                data: Object.values(statistics.loanStatuses),
                backgroundColor: ['#FF6384', '#4BC0C0', '#FFCE56'],
            },
        ],
    };

    const totalLoanAmount = {
        labels: ['Total Applied Amount', 'Total Approved Amount'],
        datasets: [
            {
                label: 'Total Loan Amount',
                data: [statistics.totalAppliedAmount, statistics.totalApprovedAmount],
                backgroundColor: ['#FF6384', '#36A2EB'],
            },
        ],
    };

    const employmentStatusDistribution = {
        labels: Object.keys(statistics.employmentStatusDistribution),
        datasets: [
            {
                label: 'Employment Status Distribution',
                data: Object.values(statistics.employmentStatusDistribution),
                backgroundColor: ['#FF6384', '#36A2EB', '#FFCE56', '#4BC0C0'],
            },
        ],
    };

    const typeOfLoanDistribution = {
        labels: Object.keys(statistics.typeOfLoanDistribution),
        datasets: [
            {
                label: 'Type of Loan Distribution',
                data: Object.values(statistics.typeOfLoanDistribution),
                backgroundColor: ['#FF6384', '#36A2EB', '#FFCE56'],
            },
        ],
    };

    const creditScoreDistribution = {
        labels: Object.keys(statistics.creditScoreDistribution),
        datasets: [
            {
                label: 'Credit Score Distribution',
                data: Object.values(statistics.creditScoreDistribution),
                backgroundColor: ['darkred', 'orange', 'gold', 'lightgreen', 'green'],
            },
        ],
    };

    return (
        <div>
            <h1>Loan Application Statistics</h1>

            <div>
                <h2>Total Loans: {statistics.totalLoans}</h2>
                <h2>Average Loan Amount: {statistics.averageAmount.toFixed(2)}</h2>
            </div>
            <div className="stats">
                <div>
                    <h2>Loan Statuses</h2>
                    <Pie data={loanStatuses}/>
                </div>
                <div>
                    <h2>Type of Loan Distribution</h2>
                    <Bar data={typeOfLoanDistribution}/>
                </div>
                <div>
                    <h2>Total Loan Amount</h2>
                    <Pie data={totalLoanAmount}/>
                </div>
                <div>
                    <h2>Credit Score Distribution</h2>
                    <Bar data={creditScoreDistribution}/>
                </div>
                <div>
                    <h2>Employment Status Distribution</h2>
                    <Bar data={employmentStatusDistribution}/>
                </div>
            </div>
            <button className="btn-back" onClick={() => navigate(-1)}>Back</button>
        </div>
    );
};

export default Statistics;
