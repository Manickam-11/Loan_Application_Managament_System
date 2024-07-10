package com.example.Loan.service;

import com.example.Loan.model.Loan;
import com.example.Loan.repository.LoanRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;


import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

@Service
public class LoanService {

    @Autowired
    private LoanRepository loanRepository;

    public List<Loan> getAllLoans() {
        return loanRepository.findAll();
    }

    public Loan getLoanById(Long id) {
        return loanRepository.findById(id).orElse(null);
    }

    public List<Loan> getLoansByStatus(String status) {
        return loanRepository.findByStatus(status);
    }

    public Loan createLoan(Loan loan) {
        return loanRepository.save(loan);
    }

    public Loan updateLoan(Long id, Loan loanDetails) {
        Loan loan = loanRepository.findById(id).orElse(null);
        if (loan != null) {
            loan.setApplicantIdNumber(loanDetails.getApplicantIdNumber());
            loan.setApplicantName(loanDetails.getApplicantName());
            loan.setApplicantPincode(loanDetails.getApplicantPincode());
            loan.setApplicantEmploymentStatus(loanDetails.getApplicantEmploymentStatus());
            loan.setCreditScore(loanDetails.getCreditScore());
            loan.setLoanType(loanDetails.getLoanType());
            loan.setAmount(loanDetails.getAmount());
            loan.setTenure(loanDetails.getTenure());
            loan.setInterestRate(loanDetails.getInterestRate());
            loan.setStatus(loanDetails.getStatus());
            return loanRepository.save(loan);
        }
        return null;
    }

    public void deleteLoan(Long id) {
        loanRepository.deleteById(id);
    }

    public Loan updateLoanStatus(Long id, String status) {
        Loan loan = loanRepository.findById(id).orElse(null);
        if (loan != null) {
            loan.setStatus(status);
            return loanRepository.save(loan);
        }
        return null;
    }

    public Map<String, Object> getLoanStatistics() {
        List<Loan> loans = loanRepository.findAll();

        Map<String, Object> statistics = new HashMap<>();
        Map<String, Long> typeOfLoanDistribution = loans.stream().collect(Collectors.groupingBy(Loan::getLoanType, Collectors.counting()));
        Map<String, Long> employmentStatusDistribution = loans.stream().collect(Collectors.groupingBy(Loan::getApplicantEmploymentStatus, Collectors.counting()));
        double totalAppliedAmount = loans.stream().mapToDouble(Loan::getAmount).sum();
        double totalApprovedAmount = loans.stream()
                .filter(loan -> "Accepted".equalsIgnoreCase(loan.getStatus()))
                .mapToDouble(Loan::getAmount).sum();

        Map<String, Long> creditScoreDistribution = loans.stream()
                .collect(Collectors.groupingBy(loan -> {
                    if (loan.getCreditScore() >= 300 && loan.getCreditScore() <= 579) {
                        return "Poor 300-569";
                    } else if (loan.getCreditScore() >= 580 && loan.getCreditScore() <= 669) {
                        return "Fair 580-669";
                    } else if (loan.getCreditScore() >= 670 && loan.getCreditScore() <= 739) {
                        return "Good 670-739";
                    } else if (loan.getCreditScore() >= 740 && loan.getCreditScore() <= 799) {
                        return "Very Good 740-799";
                    } else {
                        return "Excellent 800-850";
                    }
                }, Collectors.counting()));

        statistics.put("totalLoans", loans.size());
        statistics.put("loanStatuses", loans.stream().collect(Collectors.groupingBy(Loan::getStatus, Collectors.counting())));
        statistics.put("averageAmount", loans.stream().mapToDouble(Loan::getAmount).average().orElse(0.0));
        statistics.put("employmentStatusDistribution", loans.stream().collect(Collectors.groupingBy(Loan::getApplicantEmploymentStatus, Collectors.counting())));
        statistics.put("typeOfLoanDistribution", typeOfLoanDistribution);
        statistics.put("employmentStatusDistribution", employmentStatusDistribution);
        statistics.put("totalAppliedAmount", totalAppliedAmount);
        statistics.put("totalApprovedAmount", totalApprovedAmount);
        statistics.put("creditScoreDistribution", creditScoreDistribution);


        return statistics;
    }


}

