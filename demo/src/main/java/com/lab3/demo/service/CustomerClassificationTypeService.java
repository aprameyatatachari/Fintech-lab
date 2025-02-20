package com.lab3.demo.service;
import com.lab3.demo.entity.CustomerClassificationType;
import com.lab3.demo.repository.CustomerClassificationTypeRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.util.List;
import java.util.Optional;
@Service
public class CustomerClassificationTypeService{
 @Autowired
 private CustomerClassificationTypeRepository CustomerClassificationTypeRepository;
 public List<CustomerClassificationType> getAllCustomerClassificationTypes() {
 return CustomerClassificationTypeRepository.findAll();
 }
 public Optional<CustomerClassificationType> getCustomerClassificationTypeById(Long id) {
 return CustomerClassificationTypeRepository.findById(id);
 }
 public CustomerClassificationType createCustomerClassificationType(CustomerClassificationType CustomerClassificationType) {
 return CustomerClassificationTypeRepository.save(CustomerClassificationType);
 }
 public CustomerClassificationType updateCustomerClassificationType(Long id, CustomerClassificationType CustomerClassificationTypeDetails) {
 return CustomerClassificationTypeRepository.findById(id)
 .map(CustomerClassificationType -> {
 CustomerClassificationType.setCustomerClassificationID(CustomerClassificationTypeDetails.getCustomerClassificationID());
CustomerClassificationType.setCustomerClassificationType(CustomerClassificationTypeDetails.getCustomerClassificationType());
CustomerClassificationType.setCustomerClassificationValue(CustomerClassificationTypeDetails.getCustomerClassificationValue());
CustomerClassificationType.setEffectiveDate(CustomerClassificationTypeDetails.getEffectiveDate());

return CustomerClassificationTypeRepository.save(CustomerClassificationType);
 })
 .orElseThrow(() -> new RuntimeException("CustomerClassificationType not found with id: " +
id));
 }
 public void deleteCustomerClassificationType(Long id) {
 CustomerClassificationTypeRepository.findById(id).ifPresentOrElse(
 CustomerClassificationTypeRepository::delete,
 () -> {
 throw new RuntimeException("CustomerClassificationType not found with id: " + id);
 }
 );
 }
}
