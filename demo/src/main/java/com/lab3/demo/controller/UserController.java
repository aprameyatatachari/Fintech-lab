package com.lab3.demo.controller;

import com.lab3.demo.entity.User;
import com.lab3.demo.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.List;
@RestController
@RequestMapping("/api/users")
public class UserController {
 @Autowired
 private UserService UserService;
 @GetMapping
 public List<User> getAllUsers() {
 return UserService.getAllUsers();
 }
 @GetMapping("/{id}")
 public ResponseEntity<User> getUserById(@PathVariable Long id) {
 return UserService.getUserById(id)
 .map(User -> new ResponseEntity<>(User, HttpStatus.OK))
 .orElse(new ResponseEntity<>(HttpStatus.NOT_FOUND));
 }
 @PostMapping
 public ResponseEntity<User> createUser(@RequestBody User User) {
 User savedUser = UserService.createUser(User);
 return new ResponseEntity<>(savedUser, HttpStatus.CREATED);
 }
 @PutMapping("/{id}")
 public ResponseEntity<User> updateUser(@PathVariable Long id, @RequestBody User
UserDetails) {
 try {
 User updatedUser = UserService.updateUser(id, UserDetails);
 return new ResponseEntity<>(updatedUser, HttpStatus.OK);
 } catch (RuntimeException e) {
 return new ResponseEntity<>(HttpStatus.NOT_FOUND);
 }
 }
 @DeleteMapping("/{id}")
 public ResponseEntity<Void> deleteUser(@PathVariable Long id) {
 try {
 UserService.deleteUser(id);
 return new ResponseEntity<>(HttpStatus.NO_CONTENT);
 } catch (RuntimeException e) {
 return new ResponseEntity<>(HttpStatus.NOT_FOUND);
 }
 }
}

