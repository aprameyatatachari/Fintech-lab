package com.lab3.demo.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.lab3.demo.entity.CustomerIdentification;
public interface CustomerIdentificationRepository extends JpaRepository<CustomerIdentification, Long> {
}
