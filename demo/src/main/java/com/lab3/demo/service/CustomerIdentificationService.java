package com.lab3.demo.service;
import com.lab3.demo.entity.CustomerIdentification;
import com.lab3.demo.repository.CustomerIdentificationRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.util.List;
import java.util.Optional;
@Service
public class CustomerIdentificationService{
 @Autowired
 private CustomerIdentificationRepository CustomerIdentificationRepository;
 public List<CustomerIdentification> getAllCustomerIdentifications() {
 return CustomerIdentificationRepository.findAll();
 }
 public Optional<CustomerIdentification> getCustomerIdentificationById(Long id) {
 return CustomerIdentificationRepository.findById(id);
 }
 public CustomerIdentification createCustomerIdentification(CustomerIdentification CustomerIdentification) {
 return CustomerIdentificationRepository.save(CustomerIdentification);
 }
 public CustomerIdentification updateCustomerIdentification(Long id, CustomerIdentification CustomerIdentificationDetails) {
 return CustomerIdentificationRepository.findById(id)
 .map(CustomerIdentification -> {
 CustomerIdentification.setCustomerIdentifier(CustomerIdentificationDetails.getCustomerIdentifier());
CustomerIdentification.setCustomerIdentificationType(CustomerIdentificationDetails.getCustomerIdentificationType());
CustomerIdentification.setCustomerIdentificationValue(CustomerIdentificationDetails.getCustomerIdentificationValue());
CustomerIdentification.setEffectiveDate(CustomerIdentificationDetails.getEffectiveDate());
return CustomerIdentificationRepository.save(CustomerIdentification);
 })
 .orElseThrow(() -> new RuntimeException("CustomerIdentification not found with id: " +
id));
 }
 public void deleteCustomerIdentification(Long id) {
 CustomerIdentificationRepository.findById(id).ifPresentOrElse(
 CustomerIdentificationRepository::delete,
 () -> {
 throw new RuntimeException("CustomerIdentification not found with id: " + id);
 }
 );
 }
}
