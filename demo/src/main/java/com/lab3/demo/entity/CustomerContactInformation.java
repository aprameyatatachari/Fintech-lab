package com.lab3.demo.entity;
import java.util.Date;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
@Entity
public class CustomerContactInformation {
 @Id
 @GeneratedValue(strategy = GenerationType.IDENTITY)
 private int CustomerIdentifier; 
 private String CustomerContactType; 
 private String CustomerContactValue;
 private Date EffectiveDate; 
 private Date StartDate;  
 private Date EndDate;
public int getCustomerIdentifier() {
	return CustomerIdentifier;
}
public void setCustomerIdentifier(int customerIdentifier) {
	CustomerIdentifier = customerIdentifier;
}
public String getCustomerContactType() {
	return CustomerContactType;
}
public void setCustomerContactType(String customerContactType) {
	CustomerContactType = customerContactType;
}
public String getCustomerContactValue() {
	return CustomerContactValue;
}
public void setCustomerContactValue(String customerContactValue) {
	CustomerContactValue = customerContactValue;
}
public Date getEffectiveDate() {
	return EffectiveDate;
}
public void setEffectiveDate(Date effectiveDate) {
	EffectiveDate = effectiveDate;
}
public Date getStartDate() {
	return StartDate;
}
public void setStartDate(Date startDate) {
	StartDate = startDate;
}
public Date getEndDate() {
	return EndDate;
}
public void setEndDate(Date endDate) {
	EndDate = endDate;
}

 
}
