package com.lab3.demo.controller;

import com.lab3.demo.entity.CustomerNames;
import com.lab3.demo.service.CustomerNamesService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.List;
@RestController
@RequestMapping("/api/cnames")
public class CustomerNamesController {
 @Autowired
 private CustomerNamesService CustomerNamesService;
 @GetMapping
 public List<CustomerNames> getAllCustomerNamess() {
 return CustomerNamesService.getAllCustomerNamess();
 }
 @GetMapping("/{id}")
 public ResponseEntity<CustomerNames> getCustomerNamesById(@PathVariable Long id) {
 return CustomerNamesService.getCustomerNamesById(id)
 .map(CustomerNames -> new ResponseEntity<>(CustomerNames, HttpStatus.OK))
 .orElse(new ResponseEntity<>(HttpStatus.NOT_FOUND));
 }
 @PostMapping
 public ResponseEntity<CustomerNames> createCustomerNames(@RequestBody CustomerNames CustomerNames) {
 CustomerNames savedCustomerNames = CustomerNamesService.createCustomerNames(CustomerNames);
 return new ResponseEntity<>(savedCustomerNames, HttpStatus.CREATED);
 }
 @PutMapping("/{id}")
 public ResponseEntity<CustomerNames> updateCustomerNames(@PathVariable Long id, @RequestBody CustomerNames
CustomerNamesDetails) {
 try {
 CustomerNames updatedCustomerNames = CustomerNamesService.updateCustomerNames(id, CustomerNamesDetails);
 return new ResponseEntity<>(updatedCustomerNames, HttpStatus.OK);
 } catch (RuntimeException e) {
 return new ResponseEntity<>(HttpStatus.NOT_FOUND);
 }
 }
 @DeleteMapping("/{id}")
 public ResponseEntity<Void> deleteCustomerNames(@PathVariable Long id) {
 try {
 CustomerNamesService.deleteCustomerNames(id);
 return new ResponseEntity<>(HttpStatus.NO_CONTENT);
 } catch (RuntimeException e) {
 return new ResponseEntity<>(HttpStatus.NOT_FOUND);
 }
 }
}

