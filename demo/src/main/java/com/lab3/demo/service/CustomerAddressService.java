package com.lab3.demo.service;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.lab3.demo.entity.CustomerAddress;
import com.lab3.demo.repository.CustomerAddressRepository;
@Service
public class CustomerAddressService {
 @Autowired
 private CustomerAddressRepository CustomerAddressRepository;
 public List<CustomerAddress> getAllCustomerAddresses() {
 return CustomerAddressRepository.findAll();
 }
 public CustomerAddress saveCustomerAddress(CustomerAddress CustomerAddress) {
 return CustomerAddressRepository.save(CustomerAddress);
 }
}