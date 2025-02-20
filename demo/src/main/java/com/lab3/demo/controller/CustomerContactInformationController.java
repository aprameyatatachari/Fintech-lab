package com.lab3.demo.controller;

import com.lab3.demo.entity.CustomerContactInformation;
import com.lab3.demo.service.CustomerContactInformationService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.List;
@RestController
@RequestMapping("/api/ccontact")
public class CustomerContactInformationController {
 @Autowired
 private CustomerContactInformationService CustomerContactInformationService;
 @GetMapping
 public List<CustomerContactInformation> getAllCustomerContactInformations() {
 return CustomerContactInformationService.getAllCustomerContactInformations();
 }
 @GetMapping("/{id}")
 public ResponseEntity<CustomerContactInformation> getCustomerContactInformationById(@PathVariable Long id) {
 return CustomerContactInformationService.getCustomerContactInformationById(id)
 .map(CustomerContactInformation -> new ResponseEntity<>(CustomerContactInformation, HttpStatus.OK))
 .orElse(new ResponseEntity<>(HttpStatus.NOT_FOUND));
 }
 @PostMapping
 public ResponseEntity<CustomerContactInformation> createCustomerContactInformation(@RequestBody CustomerContactInformation CustomerContactInformation) {
 CustomerContactInformation savedCustomerContactInformation = CustomerContactInformationService.createCustomerContactInformation(CustomerContactInformation);
 return new ResponseEntity<>(savedCustomerContactInformation, HttpStatus.CREATED);
 }
 @PutMapping("/{id}")
 public ResponseEntity<CustomerContactInformation> updateCustomerContactInformation(@PathVariable Long id, @RequestBody CustomerContactInformation
CustomerContactInformationDetails) {
 try {
 CustomerContactInformation updatedCustomerContactInformation = CustomerContactInformationService.updateCustomerContactInformation(id, CustomerContactInformationDetails);
 return new ResponseEntity<>(updatedCustomerContactInformation, HttpStatus.OK);
 } catch (RuntimeException e) {
 return new ResponseEntity<>(HttpStatus.NOT_FOUND);
 }
 }
 @DeleteMapping("/{id}")
 public ResponseEntity<Void> deleteCustomerContactInformation(@PathVariable Long id) {
 try {
 CustomerContactInformationService.deleteCustomerContactInformation(id);
 return new ResponseEntity<>(HttpStatus.NO_CONTENT);
 } catch (RuntimeException e) {
 return new ResponseEntity<>(HttpStatus.NOT_FOUND);
 }
 }
}

