export interface CustomerNames {
  firstName: string;
  middleName?: string;
  lastName: string;
}

export interface CustomerContactInformation {
  type: string;
  value: string;
}

export interface CustomerAddress {
  addressLine1: string;
  addressLine2?: string;
  city: string;
  state: string;
  country: string;
  zipCode: string;
}

export interface CustomerProofOfId {
  type: string;
  value: string;
  issuedDate: string;
  expiryDate: string;
}

export interface CustomerDetail {
  id?: number | null | undefined;
  name: CustomerNames;
  dateOfBirth: string;
  contactDetails: CustomerContactInformation[];
  address: CustomerAddress;
  identityProofs: CustomerProofOfId[];
  language?: string
  gender?: string
}
