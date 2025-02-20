package com.lab3.demo.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.lab3.demo.entity.CustomerProofOfId;
public interface CustomerProofOfIdRepository extends JpaRepository<CustomerProofOfId, Long> {
}
