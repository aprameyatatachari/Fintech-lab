package com.lab3.demo.service;
import com.lab3.demo.entity.CustomerAddress;
import com.lab3.demo.repository.CustomerAddressRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.util.List;
import java.util.Optional;
@Service
public class CustomerAddressService{
 @Autowired
 private CustomerAddressRepository CustomerAddressRepository;
 public List<CustomerAddress> getAllCustomerAddresss() {
 return CustomerAddressRepository.findAll();
 }
 public Optional<CustomerAddress> getCustomerAddressById(Long id) {
 return CustomerAddressRepository.findById(id);
 }
 public CustomerAddress createCustomerAddress(CustomerAddress CustomerAddress) {
 return CustomerAddressRepository.save(CustomerAddress);
 }
 public CustomerAddress updateCustomerAddress(Long id, CustomerAddress CustomerAddressDetails) {
 return CustomerAddressRepository.findById(id)
 .map(CustomerAddress -> {
 CustomerAddress.setCustomerIdentifier(CustomerAddressDetails.getCustomerIdentifier());
CustomerAddress.setCustomerAddressType(CustomerAddressDetails.getCustomerAddressType());
CustomerAddress.setCustomerAddressValue(CustomerAddressDetails.getCustomerAddressValue());
return CustomerAddressRepository.save(CustomerAddress);
 })
 .orElseThrow(() -> new RuntimeException("CustomerAddress not found with id: " +
id));
 }
 public void deleteCustomerAddress(Long id) {
 CustomerAddressRepository.findById(id).ifPresentOrElse(
 CustomerAddressRepository::delete,
 () -> {
 throw new RuntimeException("CustomerAddress not found with id: " + id);
 }
 );
 }
}
