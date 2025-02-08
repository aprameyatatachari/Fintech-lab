package com.lab3.demo.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.lab3.demo.entity.CustomerAddress;
import com.lab3.demo.service.CustomerAddressService;
@RestController
@RequestMapping("/api/caddress")
public class CustomerAddressController {
 @Autowired
 private CustomerAddressService CustAddressService;
 @GetMapping
 public List<CustomerAddress> getAllCustomerAddresses() {
 return CustAddressService.getAllCustomerAddresses();
 }
 @PostMapping
 public CustomerAddress createCustomerAddress(@RequestBody CustomerAddress CustomerAddress) {
 return CustAddressService.saveCustomerAddress(CustomerAddress);
 }
}
