package com.lab3.demo.service;
import com.lab3.demo.entity.User;
import com.lab3.demo.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.util.List;
import java.util.Optional;
@Service
public class UserService{
 @Autowired
 private UserRepository UserRepository;
 public List<User> getAllUsers() {
 return UserRepository.findAll();
 }
 public Optional<User> getUserById(Long id) {
 return UserRepository.findById(id);
 }
 public User createUser(User User) {
 return UserRepository.save(User);
 }
 public User updateUser(Long id, User UserDetails) {
 return UserRepository.findById(id)
 .map(User -> {
 User.setId(UserDetails.getId());
User.setName(UserDetails.getName());
User.setEmail(UserDetails.getEmail());
return UserRepository.save(User);
 })
 .orElseThrow(() -> new RuntimeException("User not found with id: " +
id));
 }
 public void deleteUser(Long id) {
 UserRepository.findById(id).ifPresentOrElse(
 UserRepository::delete,
 () -> {
 throw new RuntimeException("User not found with id: " + id);
 }
 );
 }
}
