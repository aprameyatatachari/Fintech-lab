package com.lab3.demo.service;

import com.lab3.demo.entity.CustomerDetail;

import java.util.List;
import java.util.Optional;

public interface CustomerDetailService {

    List<CustomerDetail> getAllCustomers();

    Optional<CustomerDetail> getCustomerById(Long id);

    CustomerDetail createCustomer(CustomerDetail customer);

    CustomerDetail updateCustomer(Long id, CustomerDetail newCustomer);

    void deleteCustomer(Long id);
}