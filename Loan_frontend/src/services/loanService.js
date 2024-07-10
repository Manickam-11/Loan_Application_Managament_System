import axios from 'axios';

const API_URL = 'http://localhost:8080/api/loans';

export const getAllLoans = () => {
    return axios.get(API_URL);
};

export const getLoanById = (id) => {
    return axios.get(`${API_URL}/${id}`);
};

export const createLoan = (loan) => {
    return axios.post(API_URL, loan);
};

export const updateLoan = (id, loan) => {
    return axios.put(`${API_URL}/${id}`, loan);
};

export const deleteLoan = (id) => {
    return axios.delete(`${API_URL}/${id}`);
};

export const updateLoanStatus = async (id, status) => {
    return axios.patch(`${API_URL}/${id}/${status}`);
};

export const getLoansByStatus = async (status) => {
    return axios.get(`${API_URL}/status/${status}`);
};


export const getLoanStatistics = () => {
    return axios.get(`${API_URL}/statistics`);
};

/*export const getTotalLoanAmounts = () => {
    return axios.get(`${API_URL}/amounts`);
};

export const getCreditScoreDistribution = () => {
    return axios.get(`${API_URL}/credit-score-distribution`);
};

export const getLoanTypeDistribution = () => {
    return axios.get(`${API_URL}/loan-type-distribution`);
};

export const getLoanAmountTenure = () => {
    return axios.get(`${API_URL}/loan-amount-tenure`);
};

export const getPincodeDistribution = () => {
    return axios.get(`${API_URL}/pincode-distribution`);
};
*/
