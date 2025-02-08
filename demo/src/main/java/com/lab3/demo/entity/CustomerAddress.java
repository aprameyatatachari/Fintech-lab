package com.lab3.demo.entity;
import java.util.Date;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
@Entity
public class CustomerAddress {
 @Id
 @GeneratedValue(strategy = GenerationType.IDENTITY)
 private int CustomerIdentifier;
 private String CustomerAddressType;
 private String CustomerAddressValue;
 private Date EffectiveDate;
 // Getters and Setters
public int getCustomerIdentifier() {
	return CustomerIdentifier;
}
public void setCustomerIdentifier(int customerIdentifier) {
	CustomerIdentifier = customerIdentifier;
}
public String getCustomerAddressType() {
	return CustomerAddressType;
}
public void setCustomerAddressType(String customerAddressType) {
	CustomerAddressType = customerAddressType;
}
public String getCustomerAddressValue() {
	return CustomerAddressValue;
}
public void setCustomerAddressValue(String customerAddressValue) {
	CustomerAddressValue = customerAddressValue;
}
public Date getEffectiveDate() {
	return EffectiveDate;
}
public void setEffectiveDate(Date effectiveDate) {
	EffectiveDate = effectiveDate;
}

 
}
