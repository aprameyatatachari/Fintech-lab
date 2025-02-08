package com.lab3.demo.service;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.lab3.demo.entity.User;
import com.lab3.demo.repository.UserRepository;
@Service
public class UserService {
 @Autowired
 private UserRepository userRepository;
 public List<User> getAllUsers() {
 return userRepository.findAll();
 }
 public User saveUser(User user) {
 return userRepository.save(user);
 }
}