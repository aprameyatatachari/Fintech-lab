import React, { useState } from 'react';
import AnimatedCard from '../components/AnimatedCard';
import Button from '../components/Button';
import InputField from '../components/InputField';
import SelectField from '../components/SelectField';
import ProgressBar from '../components/ProgressBar';
import { CustomerData } from '../App';

interface CustomerAddressPageProps {
  customerData: CustomerData;
  updateCustomerData: (data: Partial<CustomerData>) => void;
  onNext: () => void;
  onBack: () => void;
}

const CustomerAddressPage: React.FC<CustomerAddressPageProps> = ({
  customerData,
  updateCustomerData,
  onNext,
  onBack,
}) => {
  const [errors, setErrors] = useState<Record<string, string>>({});

  const countryOptions = [
    { value: 'USA', label: 'United States' },
    { value: 'Canada', label: 'Canada' },
    { value: 'UK', label: 'United Kingdom' },
    { value: 'Australia', label: 'Australia' },
    { value: 'India', label: 'India' },
    { value: 'Germany', label: 'Germany' },
    { value: 'France', label: 'France' },
    { value: 'Japan', label: 'Japan' },
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validate form
    const newErrors: Record<string, string> = {};
    
    if (!customerData.addressLine1.trim()) {
      newErrors.addressLine1 = 'Address is required';
    }
    if (!customerData.city.trim()) {
      newErrors.city = 'City is required';
    }
    if (!customerData.state.trim()) {
      newErrors.state = 'State/Province is required';
    }
    if (!customerData.zipCode.trim()) {
      newErrors.zipCode = 'Postal/ZIP code is required';
    }
    if (!customerData.country) {
      newErrors.country = 'Country is required';
    }
    
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }
    
    // If validation passes, go to next page
    onNext();
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    updateCustomerData({ [name]: value });
    
    // Clear error for this field if it exists
    if (errors[name]) {
      setErrors({ ...errors, [name]: '' });
    }
  };

  return (
    <div className="page-container py-12">
      <ProgressBar currentStep={4} totalSteps={5} />
      
      <AnimatedCard>
        <h1 className="text-2xl font-bold mb-6 text-center">Address Information</h1>
        
        <form onSubmit={handleSubmit}>
          <InputField
            label="Address Line 1"
            id="addressLine1"
            name="addressLine1"
            value={customerData.addressLine1}
            onChange={handleChange}
            placeholder="Enter your street address"
            error={errors.addressLine1}
            required
          />
          
          <InputField
            label="Address Line 2 (Optional)"
            id="addressLine2"
            name="addressLine2"
            value={customerData.addressLine2 || ''}
            onChange={handleChange}
            placeholder="Apartment, suite, unit, building, floor, etc."
          />
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <InputField
              label="City"
              id="city"
              name="city"
              value={customerData.city}
              onChange={handleChange}
              placeholder="Enter your city"
              error={errors.city}
              required
            />
            
            <InputField
              label="State/Province"
              id="state"
              name="state"
              value={customerData.state}
              onChange={handleChange}
              placeholder="Enter your state or province"
              error={errors.state}
              required
            />
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <InputField
              label="Postal/ZIP Code"
              id="zipCode"
              name="zipCode"
              value={customerData.zipCode}
              onChange={handleChange}
              placeholder="Enter your postal or ZIP code"
              error={errors.zipCode}
              required
            />
            
            <SelectField
              label="Country"
              id="country"
              name="country"
              value={customerData.country}
              onChange={handleChange}
              options={countryOptions}
              error={errors.country}
              required
            />
          </div>
          
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

export default CustomerAddressPage;