package com.lab3.demo.service;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import com.lab3.demo.entity.CustomerDetail;
import com.lab3.demo.repository.CustomerDetailRepository;
@Service
public class CustomerDetailService {
 @Autowired
 private CustomerDetailRepository CustomerDetailRepository;
 public List<CustomerDetail> getAllCustomerDetails() {
 return CustomerDetailRepository.findAll();
 }
 public CustomerDetail saveCustomerDetail(CustomerDetail CustomerDetail) {
 return CustomerDetailRepository.save(CustomerDetail);
 }
}