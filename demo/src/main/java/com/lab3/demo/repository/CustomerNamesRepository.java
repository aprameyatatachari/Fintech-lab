package com.lab3.demo.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.lab3.demo.entity.CustomerNames;
public interface CustomerNamesRepository extends JpaRepository<CustomerNames, Long> {
}
