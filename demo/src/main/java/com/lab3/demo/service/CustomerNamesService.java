package com.lab3.demo.service;
import com.lab3.demo.entity.CustomerNames;
import com.lab3.demo.repository.CustomerNamesRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.util.List;
import java.util.Optional;
@Service
public class CustomerNamesService{
 @Autowired
 private CustomerNamesRepository CustomerNamesRepository;
 public List<CustomerNames> getAllCustomerNamess() {
 return CustomerNamesRepository.findAll();
 }
 public Optional<CustomerNames> getCustomerNamesById(Long id) {
 return CustomerNamesRepository.findById(id);
 }
 public CustomerNames createCustomerNames(CustomerNames CustomerNames) {
 return CustomerNamesRepository.save(CustomerNames);
 }
 public CustomerNames updateCustomerNames(Long id, CustomerNames CustomerNamesDetails) {
 return CustomerNamesRepository.findById(id)
 .map(CustomerNames -> {
 CustomerNames.setCustomerIdentifier(CustomerNamesDetails.getCustomerIdentifier());
CustomerNames.setCustomerNameType(CustomerNamesDetails.getCustomerNameType());
CustomerNames.setCustomerNameValue(CustomerNamesDetails.getCustomerNameValue());
return CustomerNamesRepository.save(CustomerNames);
 })
 .orElseThrow(() -> new RuntimeException("CustomerNames not found with id: " +
id));
 }
 public void deleteCustomerNames(Long id) {
 CustomerNamesRepository.findById(id).ifPresentOrElse(
 CustomerNamesRepository::delete,
 () -> {
 throw new RuntimeException("CustomerNames not found with id: " + id);
 }
 );
 }
}
