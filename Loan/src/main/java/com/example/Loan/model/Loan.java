
package com.example.Loan.model;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;

@Entity
public class Loan {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String applicantIdNumber;
    private String applicantName;
    private String applicantPincode;
    private String applicantEmploymentStatus;
    private Integer creditScore;
    private String loanType;
    private Double amount;
    private Integer tenure;
    private Double interestRate;
    private String status;

    // Constructors
    public Loan() {
    }

    public Loan(String applicantIdNumber, String applicantName, String applicantPincode, String applicantEmploymentStatus, Integer creditScore, String loanType, Double amount, Integer tenure, Double interestRate, Double downPayment, String status) {
        this.applicantIdNumber = applicantIdNumber;
        this.applicantName = applicantName;
        this.applicantPincode = applicantPincode;
        this.applicantEmploymentStatus = applicantEmploymentStatus;
        this.creditScore = creditScore;
        this.loanType = loanType;
        this.amount = amount;
        this.tenure = tenure;
        this.interestRate = interestRate;
        this.status = status;
    }

    // Getters and Setters

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getApplicantIdNumber() {
        return applicantIdNumber;
    }

    public void setApplicantIdNumber(String applicantIdNumber) {
        this.applicantIdNumber = applicantIdNumber;
    }

    public String getApplicantName() {
        return applicantName;
    }

    public void setApplicantName(String applicantName) {
        this.applicantName = applicantName;
    }

    public String getApplicantPincode() {
        return applicantPincode;
    }

    public void setApplicantPincode(String applicantPincode) {
        this.applicantPincode = applicantPincode;
    }

    public String getApplicantEmploymentStatus() {
        return applicantEmploymentStatus;
    }

    public void setApplicantEmploymentStatus(String applicantEmploymentStatus) {
        this.applicantEmploymentStatus = applicantEmploymentStatus;
    }

    public Integer getCreditScore() {
        return creditScore;
    }

    public void setCreditScore(Integer creditScore) {
        this.creditScore = creditScore;
    }

    public String getLoanType() {
        return loanType;
    }

    public void setLoanType(String loanType) {
        this.loanType = loanType;
    }

    public Double getAmount() {
        return amount;
    }

    public void setAmount(Double amount) {
        this.amount = amount;
    }

    public Integer getTenure() {
        return tenure;
    }

    public void setTenure(Integer tenure) {
        this.tenure = tenure;
    }

    public Double getInterestRate() {
        return interestRate;
    }

    public void setInterestRate(Double interestRate) {
        this.interestRate = interestRate;
    }


    public String getStatus() {
        return status;
    }

    public void setStatus(String status) {
        this.status = status;
    }
}

