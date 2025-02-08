package com.lab3.demo.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.lab3.demo.entity.User;
public interface UserRepository extends JpaRepository<User, Long> {
}
