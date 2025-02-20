package com.lab3.demo.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.lab3.demo.entity.CustomerContactInformation;
public interface CustomerContactInformationRepository extends JpaRepository<CustomerContactInformation, Long> {
}
