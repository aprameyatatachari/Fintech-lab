package com.lab3.demo.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.lab3.demo.entity.CustomerDetail;
public interface CustomerDetailRepository extends JpaRepository<CustomerDetail, Long> {
}
