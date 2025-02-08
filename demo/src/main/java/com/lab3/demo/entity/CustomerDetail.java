package com.lab3.demo.entity;
import java.util.Date;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
@Entity
public class CustomerDetail {
 @Id
 @GeneratedValue(strategy = GenerationType.IDENTITY)
 private int CustomerIdentifier; 
 private String CustomerFullName; 
 private String CustomerGender;
 private String CustomerType; 
 private Date CustomerDateOfBirth; 
 private String CustomerPreferredLanguage; 
 private String CustomerStatus; 
 private String CustomerCountryOfOrigin;
public int getCustomerIdentifier() {
	return CustomerIdentifier;
}
public void setCustomerIdentifier(int customerIdentifier) {
	CustomerIdentifier = customerIdentifier;
}
public String getCustomerFullName() {
	return CustomerFullName;
}
public void setCustomerFullName(String customerFullName) {
	CustomerFullName = customerFullName;
}
public String getCustomerGender() {
	return CustomerGender;
}
public void setCustomerGender(String customerGender) {
	CustomerGender = customerGender;
}
public String getCustomerType() {
	return CustomerType;
}
public void setCustomerType(String customerType) {
	CustomerType = customerType;
}
public Date getCustomerDateOfBirth() {
	return CustomerDateOfBirth;
}
public void setCustomerDateOfBirth(Date customerDateOfBirth) {
	CustomerDateOfBirth = customerDateOfBirth;
}
public String getCustomerPreferredLanguage() {
	return CustomerPreferredLanguage;
}
public void setCustomerPreferredLanguage(String customerPreferredLanguage) {
	CustomerPreferredLanguage = customerPreferredLanguage;
}
public String getCustomerStatus() {
	return CustomerStatus;
}
public void setCustomerStatus(String customerStatus) {
	CustomerStatus = customerStatus;
}
public String getCustomerCountryOfOrigin() {
	return CustomerCountryOfOrigin;
}
public void setCustomerCountryOfOrigin(String customerCountryOfOrigin) {
	CustomerCountryOfOrigin = customerCountryOfOrigin;
} 

 
}
