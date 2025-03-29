package com.lab3.demo.entity;

import jakarta.persistence.*;

import java.time.LocalDate;
import java.util.List;

@Entity
public class CustomerDetail {
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long id;

	@OneToOne(cascade = CascadeType.ALL)
	private CustomerNames name;

	private LocalDate dateOfBirth;

	@OneToMany(cascade = CascadeType.ALL)
	private List<CustomerContactInformation> contactDetails;

	@OneToOne(cascade = CascadeType.ALL)
	private CustomerAddress address;

	@OneToMany(cascade = CascadeType.ALL)
	private List<CustomerProofOfId> identityProofs;

	private String gender;
	public String getGender() {
		return gender;
	}

	public void setGender(String gender) {
		this.gender = gender;
	}

	public String getLanguage() {
		return language;
	}

	public void setLanguage(String language) {
		this.language = language;
	}

	private String language;

	public Long getId() {
		return id;
	}

	public void setId(Long id) {
		this.id = id;
	}

	public CustomerNames getName() {
		return name;
	}

	public void setName(CustomerNames name) {
		this.name = name;
	}

	public LocalDate getDateOfBirth() {
		return dateOfBirth;
	}

	public void setDateOfBirth(LocalDate dateOfBirth) {
		this.dateOfBirth = dateOfBirth;
	}

	public List<CustomerContactInformation> getContactDetails() {
		return contactDetails;
	}

	public void setContactDetails(List<CustomerContactInformation> contactDetails) {
		this.contactDetails = contactDetails;
	}

	public CustomerAddress getAddress() {
		return address;
	}

	public void setAddress(CustomerAddress address) {
		this.address = address;
	}

	public List<CustomerProofOfId> getIdentityProofs() {
		return identityProofs;
	}

	public void setIdentityProofs(List<CustomerProofOfId> identityProofs) {
		this.identityProofs = identityProofs;
	}
}