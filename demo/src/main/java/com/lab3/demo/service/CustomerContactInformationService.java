package com.lab3.demo.service;
import com.lab3.demo.entity.CustomerContactInformation;
import com.lab3.demo.repository.CustomerContactInformationRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.util.List;
import java.util.Optional;
@Service
public class CustomerContactInformationService{
 @Autowired
 private CustomerContactInformationRepository CustomerContactInformationRepository;
 public List<CustomerContactInformation> getAllCustomerContactInformations() {
 return CustomerContactInformationRepository.findAll();
 }
 public Optional<CustomerContactInformation> getCustomerContactInformationById(Long id) {
 return CustomerContactInformationRepository.findById(id);
 }
 public CustomerContactInformation createCustomerContactInformation(CustomerContactInformation CustomerContactInformation) {
 return CustomerContactInformationRepository.save(CustomerContactInformation);
 }
 public CustomerContactInformation updateCustomerContactInformation(Long id, CustomerContactInformation CustomerContactInformationDetails) {
 return CustomerContactInformationRepository.findById(id)
 .map(CustomerContactInformation -> {
 CustomerContactInformation.setCustomerIdentifier(CustomerContactInformationDetails.getCustomerIdentifier());
CustomerContactInformation.setCustomerContactType(CustomerContactInformationDetails.getCustomerContactType());
CustomerContactInformation.setCustomerContactValue(CustomerContactInformationDetails.getCustomerContactValue());
CustomerContactInformation.setEffectiveDate(CustomerContactInformationDetails.getEffectiveDate());
return CustomerContactInformationRepository.save(CustomerContactInformation);
 })
 .orElseThrow(() -> new RuntimeException("CustomerContactInformation not found with id: " +
id));
 }
 public void deleteCustomerContactInformation(Long id) {
 CustomerContactInformationRepository.findById(id).ifPresentOrElse(
 CustomerContactInformationRepository::delete,
 () -> {
 throw new RuntimeException("CustomerContactInformation not found with id: " + id);
 }
 );
 }
}
