package com.lab3.demo.controller;

import com.lab3.demo.entity.CustomerAddress;
import com.lab3.demo.service.CustomerAddressService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.List;
@RestController
@RequestMapping("/api/caddress")
public class CustomerAddressController {
 @Autowired
 private CustomerAddressService CustomerAddressService;
 @GetMapping
 public List<CustomerAddress> getAllCustomerAddresss() {
 return CustomerAddressService.getAllCustomerAddresss();
 }
 @GetMapping("/{id}")
 public ResponseEntity<CustomerAddress> getCustomerAddressById(@PathVariable Long id) {
 return CustomerAddressService.getCustomerAddressById(id)
 .map(CustomerAddress -> new ResponseEntity<>(CustomerAddress, HttpStatus.OK))
 .orElse(new ResponseEntity<>(HttpStatus.NOT_FOUND));
 }
 @PostMapping
 public ResponseEntity<CustomerAddress> createCustomerAddress(@RequestBody CustomerAddress CustomerAddress) {
 CustomerAddress savedCustomerAddress = CustomerAddressService.createCustomerAddress(CustomerAddress);
 return new ResponseEntity<>(savedCustomerAddress, HttpStatus.CREATED);
 }
 @PutMapping("/{id}")
 public ResponseEntity<CustomerAddress> updateCustomerAddress(@PathVariable Long id, @RequestBody CustomerAddress
CustomerAddressDetails) {
 try {
 CustomerAddress updatedCustomerAddress = CustomerAddressService.updateCustomerAddress(id, CustomerAddressDetails);
 return new ResponseEntity<>(updatedCustomerAddress, HttpStatus.OK);
 } catch (RuntimeException e) {
 return new ResponseEntity<>(HttpStatus.NOT_FOUND);
 }
 }
 @DeleteMapping("/{id}")
 public ResponseEntity<Void> deleteCustomerAddress(@PathVariable Long id) {
 try {
 CustomerAddressService.deleteCustomerAddress(id);
 return new ResponseEntity<>(HttpStatus.NO_CONTENT);
 } catch (RuntimeException e) {
 return new ResponseEntity<>(HttpStatus.NOT_FOUND);
 }
 }
}

