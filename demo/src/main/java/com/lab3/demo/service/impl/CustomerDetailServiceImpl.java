package com.lab3.demo.service.impl;

import com.lab3.demo.service.CustomerDetailService;
import com.lab3.demo.entity.CustomerDetail;
import com.lab3.demo.repository.CustomerDetailRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class CustomerDetailServiceImpl implements CustomerDetailService {

	@Autowired
	private CustomerDetailRepository customerDetailsRepository;

	@Override
	public List<CustomerDetail> getAllCustomers() {
		return customerDetailsRepository.findAll();
	}

	@Override
	public Optional<CustomerDetail> getCustomerById(Long id) {
		return customerDetailsRepository.findById(id);
	}

	@Override
	public CustomerDetail createCustomer(CustomerDetail customerDetails) {
		return customerDetailsRepository.save(customerDetails);
	}

	@Override
	public CustomerDetail updateCustomer(Long id, CustomerDetail newCustomerDetails) {
		return customerDetailsRepository.findById(id).map(customerDetails -> {
			customerDetails.setName(newCustomerDetails.getName());
			customerDetails.setDateOfBirth(newCustomerDetails.getDateOfBirth());
			customerDetails.setContactDetails(newCustomerDetails.getContactDetails());
			customerDetails.setAddress(newCustomerDetails.getAddress());
			customerDetails.setIdentityProofs(newCustomerDetails.getIdentityProofs());
			customerDetails.setLanguage(newCustomerDetails.getLanguage());
			customerDetails.setGender(newCustomerDetails.getGender());
			return customerDetailsRepository.save(customerDetails);
		}).orElseThrow(() -> new RuntimeException("Customer details not found with id: " + id));
	}

	@Override
	public void deleteCustomer(Long id) {
		customerDetailsRepository.findById(id).ifPresentOrElse(
				customerDetailsRepository::delete,
				() -> {
					throw new RuntimeException("Customer details not found with id: " + id);
				});
	}
}