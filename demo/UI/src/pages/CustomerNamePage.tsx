import React, { useState } from 'react';
import { CustomerData } from '../App';

interface CustomerNamePageProps {
  customerData: CustomerData;
  updateCustomerData: (data: Partial<CustomerData>) => void;
  onNext: () => void;
  onBack: () => void;
}

const CustomerNamePage: React.FC<CustomerNamePageProps> = ({
  customerData,
  updateCustomerData,
  onNext,
  onBack
}) => {
  const [errors, setErrors] = useState<Record<string, string>>({});

  const validate = () => {
    const newErrors: Record<string, string> = {};
    
    if (!customerData.firstName.trim()) {
      newErrors.firstName = 'First name is required';
    }
    
    if (!customerData.lastName.trim()) {
      newErrors.lastName = 'Last name is required';
    }
    
    if (customerData.dateOfBirth) {
      const date = new Date(customerData.dateOfBirth);
      const today = new Date();
      if (isNaN(date.getTime()) || date >= today) {
        newErrors.dateOfBirth = 'Please enter a valid date of birth';
      }
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (validate()) {
      onNext();
    }
  };

  return (
    <div className="page-container">
      <div className="mb-8 text-center fade-in">
        <h1 className="text-3xl font-bold gold-text">Personal Information</h1>
        <p className="mt-2 opacity-80">Let's start with your basic details</p>
      </div>
      
      <div className="form-card slide-in">
        <form onSubmit={handleSubmit}>
          <div className="mb-6">
            <label htmlFor="firstName" className="input-label">First Name</label>
            <input
              id="firstName"
              type="text"
              className="input-field"
              value={customerData.firstName}
              onChange={(e) => updateCustomerData({ firstName: e.target.value })}
            />
            {errors.firstName && <p className="error-message">{errors.firstName}</p>}
          </div>

          <div className="mb-6">
            <label htmlFor="middleName" className="input-label">Middle Name (Optional)</label>
            <input
              id="middleName"
              type="text"
              className="input-field"
              value={customerData.middleName || ''}
              onChange={(e) => updateCustomerData({ middleName: e.target.value })}
            />
          </div>

          <div className="mb-6">
            <label htmlFor="lastName" className="input-label">Last Name</label>
            <input
              id="lastName"
              type="text"
              className="input-field"
              value={customerData.lastName}
              onChange={(e) => updateCustomerData({ lastName: e.target.value })}
            />
            {errors.lastName && <p className="error-message">{errors.lastName}</p>}
          </div>

          <div className="mb-8">
            <label htmlFor="dateOfBirth" className="input-label">Date of Birth</label>
            <input
              id="dateOfBirth"
              type="date"
              className="input-field"
              value={customerData.dateOfBirth || ''}
              onChange={(e) => updateCustomerData({ dateOfBirth: e.target.value })}
            />
            {errors.dateOfBirth && <p className="error-message">{errors.dateOfBirth}</p>}
          </div>

          <div className="flex justify-between">
            <button
              type="button"
              onClick={onBack}
              className="btn-secondary"
            >
              Back
            </button>
            <button
              type="submit"
              className="btn-primary"
            >
              Continue
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CustomerNamePage;