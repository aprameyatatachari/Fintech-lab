package com.lab3.demo.service;
import com.lab3.demo.entity.CustomerProofOfId;
import com.lab3.demo.repository.CustomerProofOfIdRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.util.List;
import java.util.Optional;
@Service
public class CustomerProofOfIdService{
 @Autowired
 private CustomerProofOfIdRepository CustomerProofOfIdRepository;
 public List<CustomerProofOfId> getAllCustomerProofOfIds() {
 return CustomerProofOfIdRepository.findAll();
 }
 public Optional<CustomerProofOfId> getCustomerProofOfIdById(Long id) {
 return CustomerProofOfIdRepository.findById(id);
 }
 public CustomerProofOfId createCustomerProofOfId(CustomerProofOfId CustomerProofOfId) {
 return CustomerProofOfIdRepository.save(CustomerProofOfId);
 }
 public CustomerProofOfId updateCustomerProofOfId(Long id, CustomerProofOfId CustomerProofOfIdDetails) {
 return CustomerProofOfIdRepository.findById(id)
 .map(CustomerProofOfId -> {
 CustomerProofOfId.setCustomerIdentifier(CustomerProofOfIdDetails.getCustomerIdentifier());
CustomerProofOfId.setCustomerProofOfIDType(CustomerProofOfIdDetails.getCustomerProofOfIDType());
CustomerProofOfId.setCustomerProofOfIDValue(CustomerProofOfIdDetails.getCustomerProofOfIDValue());
CustomerProofOfId.setEffectiveDate(CustomerProofOfIdDetails.getEffectiveDate());
CustomerProofOfId.setStartDate(CustomerProofOfIdDetails.getStartDate());
CustomerProofOfId.setEndDate(CustomerProofOfIdDetails.getEndDate());
return CustomerProofOfIdRepository.save(CustomerProofOfId);
 })
 .orElseThrow(() -> new RuntimeException("CustomerProofOfId not found with id: " +
id));
 }
 public void deleteCustomerProofOfId(Long id) {
 CustomerProofOfIdRepository.findById(id).ifPresentOrElse(
 CustomerProofOfIdRepository::delete,
 () -> {
 throw new RuntimeException("CustomerProofOfId not found with id: " + id);
 }
 );
 }
}
