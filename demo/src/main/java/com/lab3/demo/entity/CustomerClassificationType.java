package com.lab3.demo.entity;
import java.util.Date;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
@Entity
public class CustomerClassificationType {
 @Id
 @GeneratedValue(strategy = GenerationType.IDENTITY)
 private int CustomerClassificationID;
 private String CustomerClassificationType;
 private String CustomerClassificationValue;
 private Date EffectiveDate;
public int getCustomerClassificationID() {
	return CustomerClassificationID;
}
public void setCustomerClassificationID(int customerClassificationID) {
	CustomerClassificationID = customerClassificationID;
}
public String getCustomerClassificationType() {
	return CustomerClassificationType;
}
public void setCustomerClassificationType(String customerClassificationType) {
	CustomerClassificationType = customerClassificationType;
}
public String getCustomerClassificationValue() {
	return CustomerClassificationValue;
}
public void setCustomerClassificationValue(String customerClassificationValue) {
	CustomerClassificationValue = customerClassificationValue;
}
public Date getEffectiveDate() {
	return EffectiveDate;
}
public void setEffectiveDate(Date effectiveDate) {
	EffectiveDate = effectiveDate;
}

 
}
