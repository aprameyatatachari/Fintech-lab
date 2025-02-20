package com.lab3.demo.entity;
import java.util.Date;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
@Entity
public class CustomerIdentification {
 @Id
 @GeneratedValue(strategy = GenerationType.IDENTITY)
private int CustomerIdentifier;
private String CustomerIdentificationType;
private String CustomerIdentificationValue;
private Date EffectiveDate;
public int getCustomerIdentifier() {
	return CustomerIdentifier;
}
public void setCustomerIdentifier(int customerIdentifier) {
	CustomerIdentifier = customerIdentifier;
}
public String getCustomerIdentificationType() {
	return CustomerIdentificationType;
}
public void setCustomerIdentificationType(String customerIdentificationType) {
	CustomerIdentificationType = customerIdentificationType;
}
public String getCustomerIdentificationValue() {
	return CustomerIdentificationValue;
}
public void setCustomerIdentificationValue(String customerIdentificationValue) {
	CustomerIdentificationValue = customerIdentificationValue;
}
public Date getEffectiveDate() {
	return EffectiveDate;
}
public void setEffectiveDate(Date effectiveDate) {
	EffectiveDate = effectiveDate;
}



 
}
