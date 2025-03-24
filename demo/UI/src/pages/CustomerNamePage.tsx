import React, { useState } from 'react';
import AnimatedCard from '../components/AnimatedCard';
import Button from '../components/Button';
import InputField from '../components/InputField';
import ProgressBar from '../components/ProgressBar';
import DatePickerField from '../components/DatePickerField';
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
  onBack,
}) => {
  const [errors, setErrors] = useState<Record<string, string>>({});

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validate form
    const newErrors: Record<string, string> = {};
    if (!customerData.firstName.trim()) {
      newErrors.firstName = 'First name is required';
    }
    if (!customerData.lastName.trim()) {
      newErrors.lastName = 'Last name is required';
    }
    
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }
    
    // If validation passes, go to next page
    onNext();
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    updateCustomerData({ [name]: value });
    
    // Clear error for this field if it exists
    if (errors[name]) {
      setErrors({ ...errors, [name]: '' });
    }
  };

  return (
    <div className="page-container py-12">
      <ProgressBar currentStep={1} totalSteps={5} />
      
      <AnimatedCard>
        <h1 className="text-2xl font-bold mb-6 text-center">Personal Information</h1>
        
        <form onSubmit={handleSubmit}>
          <InputField
            label="First Name"
            id="firstName"
            name="firstName"
            value={customerData.firstName}
            onChange={handleChange}
            placeholder="Enter your first name"
            error={errors.firstName}
            required
          />
          
          <InputField
            label="Middle Name (Optional)"
            id="middleName"
            name="middleName"
            value={customerData.middleName || ''}
            onChange={handleChange}
            placeholder="Enter your middle name"
          />
          
          <InputField
            label="Last Name"
            id="lastName"
            name="lastName"
            value={customerData.lastName}
            onChange={handleChange}
            placeholder="Enter your last name"
            error={errors.lastName}
            required
          />
          
          <DatePickerField
            label="Date of Birth"
            id="dateOfBirth"
            name="dateOfBirth"
            value={customerData.dateOfBirth || ''}
            onChange={handleChange}
            max={new Date().toISOString().split('T')[0]}
          />
          
          <div className="flex justify-between mt-8">
            <Button 
              type="button" 
              variant="secondary"
              onClick={onBack}
            >
              Back
            </Button>
            
            <Button type="submit">
              Continue
            </Button>
          </div>
        </form>
      </AnimatedCard>
    </div>
  );
};

export default CustomerNamePage;