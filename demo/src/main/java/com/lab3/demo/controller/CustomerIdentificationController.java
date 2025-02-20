package com.lab3.demo.controller;

import com.lab3.demo.entity.CustomerIdentification;
import com.lab3.demo.service.CustomerIdentificationService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.List;
@RestController
@RequestMapping("/api/cident")
public class CustomerIdentificationController {
 @Autowired
 private CustomerIdentificationService CustomerIdentificationService;
 @GetMapping
 public List<CustomerIdentification> getAllCustomerIdentifications() {
 return CustomerIdentificationService.getAllCustomerIdentifications();
 }
 @GetMapping("/{id}")
 public ResponseEntity<CustomerIdentification> getCustomerIdentificationById(@PathVariable Long id) {
 return CustomerIdentificationService.getCustomerIdentificationById(id)
 .map(CustomerIdentification -> new ResponseEntity<>(CustomerIdentification, HttpStatus.OK))
 .orElse(new ResponseEntity<>(HttpStatus.NOT_FOUND));
 }
 @PostMapping
 public ResponseEntity<CustomerIdentification> createCustomerIdentification(@RequestBody CustomerIdentification CustomerIdentification) {
 CustomerIdentification savedCustomerIdentification = CustomerIdentificationService.createCustomerIdentification(CustomerIdentification);
 return new ResponseEntity<>(savedCustomerIdentification, HttpStatus.CREATED);
 }
 @PutMapping("/{id}")
 public ResponseEntity<CustomerIdentification> updateCustomerIdentification(@PathVariable Long id, @RequestBody CustomerIdentification
CustomerIdentificationDetails) {
 try {
 CustomerIdentification updatedCustomerIdentification = CustomerIdentificationService.updateCustomerIdentification(id, CustomerIdentificationDetails);
 return new ResponseEntity<>(updatedCustomerIdentification, HttpStatus.OK);
 } catch (RuntimeException e) {
 return new ResponseEntity<>(HttpStatus.NOT_FOUND);
 }
 }
 @DeleteMapping("/{id}")
 public ResponseEntity<Void> deleteCustomerIdentification(@PathVariable Long id) {
 try {
 CustomerIdentificationService.deleteCustomerIdentification(id);
 return new ResponseEntity<>(HttpStatus.NO_CONTENT);
 } catch (RuntimeException e) {
 return new ResponseEntity<>(HttpStatus.NOT_FOUND);
 }
 }
}

