package com.lab3.demo.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.lab3.demo.entity.CustomerDetail;
import com.lab3.demo.service.CustomerDetailService;
@RestController
@RequestMapping("/api/cdetail")
public class CustomerDetailController {
 @Autowired
 private CustomerDetailService CustDetailService;
 @GetMapping
 public List<CustomerDetail> getAllCustomerDetails() {
 return CustDetailService.getAllCustomerDetails();
 }
 @PostMapping
 public CustomerDetail createCustomerDetail(@RequestBody CustomerDetail CustomerDetail) {
 return CustDetailService.saveCustomerDetail(CustomerDetail);
 }
}
