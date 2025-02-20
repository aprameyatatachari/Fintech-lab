package com.lab3.demo.service;
import com.lab3.demo.entity.CustomerDetail;
import com.lab3.demo.repository.CustomerDetailRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.util.List;
import java.util.Optional;
@Service
public class CustomerDetailService{
 @Autowired
 private CustomerDetailRepository CustomerDetailRepository;
 public List<CustomerDetail> getAllCustomerDetails() {
 return CustomerDetailRepository.findAll();
 }
 public Optional<CustomerDetail> getCustomerDetailById(Long id) {
 return CustomerDetailRepository.findById(id);
 }
 public CustomerDetail createCustomerDetail(CustomerDetail CustomerDetail) {
 return CustomerDetailRepository.save(CustomerDetail);
 }
 public CustomerDetail updateCustomerDetail(Long id, CustomerDetail CustomerDetailDetails) {
 return CustomerDetailRepository.findById(id)
 .map(CustomerDetail -> {
 CustomerDetail.setCustomerIdentifier(CustomerDetailDetails.getCustomerIdentifier());
CustomerDetail.setCustomerFullName(CustomerDetailDetails.getCustomerFullName());
CustomerDetail.setCustomerGender(CustomerDetailDetails.getCustomerGender());
CustomerDetail.setCustomerType(CustomerDetailDetails.getCustomerType());
CustomerDetail.setCustomerDateOfBirth(CustomerDetailDetails.getCustomerDateOfBirth());
CustomerDetail.setCustomerPreferredLanguage(CustomerDetailDetails.getCustomerPreferredLanguage());
CustomerDetail.setCustomerStatus(CustomerDetailDetails.getCustomerStatus());
CustomerDetail.setCustomerCountryOfOrigin(CustomerDetailDetails.getCustomerCountryOfOrigin());
return CustomerDetailRepository.save(CustomerDetail);
 })
 .orElseThrow(() -> new RuntimeException("CustomerDetail not found with id: " +
id));
 }
 public void deleteCustomerDetail(Long id) {
 CustomerDetailRepository.findById(id).ifPresentOrElse(
 CustomerDetailRepository::delete,
 () -> {
 throw new RuntimeException("CustomerDetail not found with id: " + id);
 }
 );
 }
}
