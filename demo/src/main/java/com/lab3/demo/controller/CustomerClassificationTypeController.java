package com.lab3.demo.controller;

import com.lab3.demo.entity.CustomerClassificationType;
import com.lab3.demo.service.CustomerClassificationTypeService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.List;
@RestController
@RequestMapping("/api/cclassificationtype")
public class CustomerClassificationTypeController {
 @Autowired
 private CustomerClassificationTypeService CustomerClassificationTypeService;
 @GetMapping
 public List<CustomerClassificationType> getAllCustomerClassificationTypes() {
 return CustomerClassificationTypeService.getAllCustomerClassificationTypes();
 }
 @GetMapping("/{id}")
 public ResponseEntity<CustomerClassificationType> getCustomerClassificationTypeById(@PathVariable Long id) {
 return CustomerClassificationTypeService.getCustomerClassificationTypeById(id)
 .map(CustomerClassificationType -> new ResponseEntity<>(CustomerClassificationType, HttpStatus.OK))
 .orElse(new ResponseEntity<>(HttpStatus.NOT_FOUND));
 }
 @PostMapping
 public ResponseEntity<CustomerClassificationType> createCustomerClassificationType(@RequestBody CustomerClassificationType CustomerClassificationType) {
 CustomerClassificationType savedCustomerClassificationType = CustomerClassificationTypeService.createCustomerClassificationType(CustomerClassificationType);
 return new ResponseEntity<>(savedCustomerClassificationType, HttpStatus.CREATED);
 }
 @PutMapping("/{id}")
 public ResponseEntity<CustomerClassificationType> updateCustomerClassificationType(@PathVariable Long id, @RequestBody CustomerClassificationType
CustomerClassificationTypeDetails) {
 try {
 CustomerClassificationType updatedCustomerClassificationType = CustomerClassificationTypeService.updateCustomerClassificationType(id, CustomerClassificationTypeDetails);
 return new ResponseEntity<>(updatedCustomerClassificationType, HttpStatus.OK);
 } catch (RuntimeException e) {
 return new ResponseEntity<>(HttpStatus.NOT_FOUND);
 }
 }
 @DeleteMapping("/{id}")
 public ResponseEntity<Void> deleteCustomerClassificationType(@PathVariable Long id) {
 try {
 CustomerClassificationTypeService.deleteCustomerClassificationType(id);
 return new ResponseEntity<>(HttpStatus.NO_CONTENT);
 } catch (RuntimeException e) {
 return new ResponseEntity<>(HttpStatus.NOT_FOUND);
 }
 }
}

