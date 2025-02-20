package com.lab3.demo.controller;

import com.lab3.demo.entity.CustomerProofOfId;
import com.lab3.demo.service.CustomerProofOfIdService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.List;
@RestController
@RequestMapping("/api/cproofofid")
public class CustomerProofOfIdController {
 @Autowired
 private CustomerProofOfIdService CustomerProofOfIdService;
 @GetMapping
 public List<CustomerProofOfId> getAllCustomerProofOfIds() {
 return CustomerProofOfIdService.getAllCustomerProofOfIds();
 }
 @GetMapping("/{id}")
 public ResponseEntity<CustomerProofOfId> getCustomerProofOfIdById(@PathVariable Long id) {
 return CustomerProofOfIdService.getCustomerProofOfIdById(id)
 .map(CustomerProofOfId -> new ResponseEntity<>(CustomerProofOfId, HttpStatus.OK))
 .orElse(new ResponseEntity<>(HttpStatus.NOT_FOUND));
 }
 @PostMapping
 public ResponseEntity<CustomerProofOfId> createCustomerProofOfId(@RequestBody CustomerProofOfId CustomerProofOfId) {
 CustomerProofOfId savedCustomerProofOfId = CustomerProofOfIdService.createCustomerProofOfId(CustomerProofOfId);
 return new ResponseEntity<>(savedCustomerProofOfId, HttpStatus.CREATED);
 }
 @PutMapping("/{id}")
 public ResponseEntity<CustomerProofOfId> updateCustomerProofOfId(@PathVariable Long id, @RequestBody CustomerProofOfId
CustomerProofOfIdDetails) {
 try {
 CustomerProofOfId updatedCustomerProofOfId = CustomerProofOfIdService.updateCustomerProofOfId(id, CustomerProofOfIdDetails);
 return new ResponseEntity<>(updatedCustomerProofOfId, HttpStatus.OK);
 } catch (RuntimeException e) {
 return new ResponseEntity<>(HttpStatus.NOT_FOUND);
 }
 }
 @DeleteMapping("/{id}")
 public ResponseEntity<Void> deleteCustomerProofOfId(@PathVariable Long id) {
 try {
 CustomerProofOfIdService.deleteCustomerProofOfId(id);
 return new ResponseEntity<>(HttpStatus.NO_CONTENT);
 } catch (RuntimeException e) {
 return new ResponseEntity<>(HttpStatus.NOT_FOUND);
 }
 }
}

