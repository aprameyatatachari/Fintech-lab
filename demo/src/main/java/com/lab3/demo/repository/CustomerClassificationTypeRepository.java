package com.lab3.demo.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.lab3.demo.entity.CustomerClassificationType;
public interface CustomerClassificationTypeRepository extends JpaRepository<CustomerClassificationType, Long> {
}
