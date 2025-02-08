package com.lab3.demo.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.lab3.demo.entity.CustomerAddress;
import com.lab3.demo.entity.CustomerDetail;
import com.lab3.demo.entity.User;
public interface CustomerDetailRepository extends JpaRepository<CustomerDetail, Long> {
}
