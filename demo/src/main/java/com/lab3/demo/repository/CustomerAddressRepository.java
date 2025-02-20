package com.lab3.demo.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.lab3.demo.entity.CustomerAddress;
public interface CustomerAddressRepository extends JpaRepository<CustomerAddress, Long> {
}
