package com.lab3.demo.controller;

import com.lab3.demo.entity.CustomerDetail;
import com.lab3.demo.service.CustomerDetailService;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@RestController
@RequestMapping("/api/customer")
public class CustomerController {

	@Autowired
	private CustomerDetailService customerService;

	@GetMapping
	public List<CustomerDetail> getAllCustomers() {
		return customerService.getAllCustomers();
	}

	@GetMapping("/{id}")
	public ResponseEntity<CustomerDetail> getCustomerById(@PathVariable Long id) {
		return customerService.getCustomerById(id)
				.map(item -> new ResponseEntity<>(item, HttpStatus.OK))
				.orElse(new ResponseEntity<>(HttpStatus.NOT_FOUND));
	}

	@PostMapping
	public ResponseEntity<CustomerDetail> createCustomer(@RequestBody CustomerDetail newCustomerDetails) {
		CustomerDetail savedCustomerDetails = customerService.createCustomer(newCustomerDetails);
		return new ResponseEntity<>(savedCustomerDetails, HttpStatus.CREATED);
	}

	@PutMapping("/{id}")
	public ResponseEntity<CustomerDetail> updateCustomer(@PathVariable Long id,
			@RequestBody CustomerDetail newCustomerDetails) {
		try {
			CustomerDetail updatedCustomerDetails = customerService.updateCustomer(id, newCustomerDetails);
			return new ResponseEntity<>(updatedCustomerDetails, HttpStatus.OK);
		} catch (RuntimeException e) {
			return new ResponseEntity<>(HttpStatus.NOT_FOUND);
		}
	}

	@DeleteMapping("/{id}")
	public ResponseEntity<Void> deleteCustomer(@PathVariable Long id) {
		try {
			customerService.deleteCustomer(id);
			return new ResponseEntity<>(HttpStatus.NO_CONTENT);
		} catch (RuntimeException e) {
			return new ResponseEntity<>(HttpStatus.NOT_FOUND);
		}
	}
}