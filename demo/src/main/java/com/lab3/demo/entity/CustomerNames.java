package com.lab3.demo.entity;
import java.util.Date;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
@Entity
public class CustomerNames {
 @Id
 @GeneratedValue(strategy = GenerationType.IDENTITY)
 private int CustomerIdentifier;
 private String CustomerNameType;
 private String CustomerNameValue; 
 public int getCustomerIdentifier() {
	return CustomerIdentifier;
}
public void setCustomerIdentifier(int customerIdentifier) {
	CustomerIdentifier = customerIdentifier;
}
public String getCustomerNameType() {
	return CustomerNameType;
}
public void setCustomerNameType(String customerNameType) {
	CustomerNameType = customerNameType;
}
public String getCustomerNameValue() {
	return CustomerNameValue;
}
public void setCustomerNameValue(String customerNameValue) {
	CustomerNameValue = customerNameValue;
}
public Date getEffectiveDate() {
	return EffectiveDate;
}
public void setEffectiveDate(Date effectiveDate) {
	EffectiveDate = effectiveDate;
}
private Date EffectiveDate;
}
