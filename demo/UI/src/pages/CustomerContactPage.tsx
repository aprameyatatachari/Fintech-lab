import React, { useState } from 'react';
import AnimatedCard from '../components/AnimatedCard';
import Button from '../components/Button';
import InputField from '../components/InputField';
import ProgressBar from '../components/ProgressBar';
import { CustomerData } from '../App';

interface CustomerContactPageProps {
  customerData: CustomerData;
  updateCustomerData: (data: Partial<CustomerData>) => void;
  onNext: () => void;
  onBack: () => void;
}

const CustomerContactPage: React.FC<CustomerContactPageProps> = ({
  customerData,
  updateCustomerData,
  onNext,
  onBack,
}) => {
  const [errors, setErrors] = useState<Record<string, string>>({});

  const validateEmail = (email: string): boolean => {
    const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
  };

  const validatePhone = (phone: string): boolean => {
    const re = /^[+]?[(]?[0-9]{3}[)]?[-\s.]?[0-9]{3}[-\s.]?[0-9]{4,6}$/;
    return re.test(String(phone));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validate form
    const newErrors: Record<string, string> = {};
    
    if (!customerData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!validateEmail(customerData.email)) {
      newErrors.email = 'Please enter a valid email address';
    }
    
    if (!customerData.phone.trim()) {
      newErrors.phone = 'Phone number is required';
    } else if (!validatePhone(customerData.phone)) {
      newErrors.phone = 'Please enter a valid phone number';
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
      <ProgressBar currentStep={3} totalSteps={5} />
      
      <AnimatedCard>
        <h1 className="text-2xl font-bold mb-6 text-center">Contact Information</h1>
        
        <form onSubmit={handleSubmit}>
          <InputField
            label="Email Address"
            id="email"
            name="email"
            type="email"
            value={customerData.email}
            onChange={handleChange}
            placeholder="Enter your email address"
            error={errors.email}
            required
          />
          
          <InputField
            label="Phone Number"
            id="phone"
            name="phone"
            type="tel"
            value={customerData.phone}
            onChange={handleChange}
            placeholder="Enter your phone number"
            error={errors.phone}
            required
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

export default CustomerContactPage;