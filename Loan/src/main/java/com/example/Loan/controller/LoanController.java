package com.example.Loan.controller;

import com.example.Loan.email.EmailContent;
import com.example.Loan.model.Loan;
import com.example.Loan.service.LoanService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;


@RestController
@RequestMapping("/api/loans")
public class LoanController {

    @Autowired
    private LoanService loanService;

    @GetMapping
    public List<Loan> getAllLoans() {
        return loanService.getAllLoans();
    }

    @GetMapping("/{id}")
    public ResponseEntity<Loan> getLoanById(@PathVariable Long id) {
        Loan loan = loanService.getLoanById(id);
        if (loan != null) {
            return ResponseEntity.ok(loan);
        }
        return ResponseEntity.notFound().build();
    }

    @GetMapping("/status/{status}")
    public List<Loan> getLoansByStatus(@PathVariable String status) {
        return loanService.getLoansByStatus(status);
    }

    @PostMapping
    public Loan createLoan(@RequestBody Loan loan) {
        return loanService.createLoan(loan);
    }

    @PutMapping("/{id}")
    public ResponseEntity<Loan> updateLoan(@PathVariable Long id, @RequestBody Loan loanDetails) {
        Loan updatedLoan = loanService.updateLoan(id, loanDetails);
        if (updatedLoan != null) {
            return ResponseEntity.ok(updatedLoan);
        }
        return ResponseEntity.notFound().build();
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteLoan(@PathVariable Long id) {
        loanService.deleteLoan(id);
        return ResponseEntity.noContent().build();
    }

    @PatchMapping("/{id}/{status}")
    public ResponseEntity<Loan> updateLoanStatus(@PathVariable Long id, @PathVariable String status) {
        Loan loan = loanService.updateLoanStatus(id, status);
        if (loan != null) {
            return ResponseEntity.ok(loan);
        }
        return ResponseEntity.notFound().build();
    }


    @GetMapping("/statistics")
    public Map<String, Object> getLoanStatistics() {
        return loanService.getLoanStatistics();
    }


}











