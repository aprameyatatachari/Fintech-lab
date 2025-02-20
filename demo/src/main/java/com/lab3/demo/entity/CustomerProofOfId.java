package com.lab3.demo.entity;
import java.util.Date;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
@Entity
public class CustomerProofOfId {
 @Id
 @GeneratedValue(strategy = GenerationType.IDENTITY)
 private int CustomerIdentifier;
 private String CustomerProofOfIDType;
 private String CustomerProofOfIDValue;
 private Date EffectiveDate;
 private Date StartDate;
 private Date EndDate;
public int getCustomerIdentifier() {
	return CustomerIdentifier;
}
public void setCustomerIdentifier(int customerIdentifier) {
	CustomerIdentifier = customerIdentifier;
}
public String getCustomerProofOfIDType() {
	return CustomerProofOfIDType;
}
public void setCustomerProofOfIDType(String customerProofOfIDType) {
	CustomerProofOfIDType = customerProofOfIDType;
}
public String getCustomerProofOfIDValue() {
	return CustomerProofOfIDValue;
}
public void setCustomerProofOfIDValue(String customerProofOfIDValue) {
	CustomerProofOfIDValue = customerProofOfIDValue;
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
