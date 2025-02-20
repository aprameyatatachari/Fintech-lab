package com.lab3.demo.controller;

import com.lab3.demo.entity.CustomerDetail;
import com.lab3.demo.service.CustomerDetailService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.List;
@RestController
@RequestMapping("/api/cdetail")
public class CustomerDetailController {
 @Autowired
 private CustomerDetailService CustomerDetailService;
 @GetMapping
 public List<CustomerDetail> getAllCustomerDetails() {
 return CustomerDetailService.getAllCustomerDetails();
 }
 @GetMapping("/{id}")
 public ResponseEntity<CustomerDetail> getCustomerDetailById(@PathVariable Long id) {
 return CustomerDetailService.getCustomerDetailById(id)
 .map(CustomerDetail -> new ResponseEntity<>(CustomerDetail, HttpStatus.OK))
 .orElse(new ResponseEntity<>(HttpStatus.NOT_FOUND));
 }
 @PostMapping
 public ResponseEntity<CustomerDetail> createCustomerDetail(@RequestBody CustomerDetail CustomerDetail) {
 CustomerDetail savedCustomerDetail = CustomerDetailService.createCustomerDetail(CustomerDetail);
 return new ResponseEntity<>(savedCustomerDetail, HttpStatus.CREATED);
 }
 @PutMapping("/{id}")
 public ResponseEntity<CustomerDetail> updateCustomerDetail(@PathVariable Long id, @RequestBody CustomerDetail
CustomerDetailDetails) {
 try {
 CustomerDetail updatedCustomerDetail = CustomerDetailService.updateCustomerDetail(id, CustomerDetailDetails);
 return new ResponseEntity<>(updatedCustomerDetail, HttpStatus.OK);
 } catch (RuntimeException e) {
 return new ResponseEntity<>(HttpStatus.NOT_FOUND);
 }
 }
 @DeleteMapping("/{id}")
 public ResponseEntity<Void> deleteCustomerDetail(@PathVariable Long id) {
 try {
 CustomerDetailService.deleteCustomerDetail(id);
 return new ResponseEntity<>(HttpStatus.NO_CONTENT);
 } catch (RuntimeException e) {
 return new ResponseEntity<>(HttpStatus.NOT_FOUND);
 }
 }
}

