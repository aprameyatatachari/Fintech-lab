import { useState } from 'react';
import { Routes, Route, useNavigate, Navigate, useLocation } from 'react-router';
import toast from 'react-hot-toast';
import { CustomerDetail, CustomerNames, CustomerAddress, CustomerContactInformation, CustomerProofOfId } from '../../types';
import PersonalInfoForm from './steps/PersonalInfoForm';
import AddressForm from './steps/AddressForm';
import ContactInfoForm from './steps/ContactInfoForm';
import IdentityProofForm from './steps/IdentityProofForm';
import FormSummary from './steps/FormSummary';

// Helper to get initial customer data
const getInitialCustomerData = (): CustomerDetail => ({
  name: {
    firstName: '',
    middleName: '',
    lastName: '',
  },
  dateOfBirth: '',
  contactDetails: [{
    type: 'Email',
    value: '',
  }],
  address: {
    addressLine1: '',
    addressLine2: '',
    city: '',
    state: '',
    country: '',
    zipCode: '',
  },
  identityProofs: [{
    type: 'Passport',
    value: '',
    issuedDate: '',
    expiryDate: '',
  }],
});

const CustomerFormContainer = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [formData, setFormData] = useState<CustomerDetail>(getInitialCustomerData());
  const [submitting, setSubmitting] = useState(false);
  
  // Form step tracking
  const steps = [
    '/customers/create',
    '/customers/create/address',
    '/customers/create/contact',
    '/customers/create/identity',
    '/customers/create/summary',
  ];
  
  const currentStepIndex = steps.findIndex(path => 
    path === location.pathname || (path === '/customers/create' && location.pathname === '/customers/create/')
  );
  
  // Progress percentage for progress bar
  const progressPercentage = currentStepIndex >= 0 
    ? (currentStepIndex / (steps.length - 1)) * 100 
    : 0;
  
  // Navigate to the next step
  const goToNextStep = () => {
    const nextPath = steps[currentStepIndex + 1];
    if (nextPath) {
      navigate(nextPath);
    }
  };
  
  // Navigate to the previous step
  const goToPreviousStep = () => {
    const prevPath = steps[currentStepIndex - 1];
    if (prevPath) {
      navigate(prevPath);
    }
  };
  
  // Update form data at each step
  const updatePersonalInfo = (data: { name: CustomerNames; dateOfBirth: string }) => {
    setFormData(prev => ({
      ...prev,
      name: data.name,
      dateOfBirth: data.dateOfBirth,
    }));
    goToNextStep();
  };
  
  const updateAddress = (address: CustomerAddress) => {
    setFormData(prev => ({
      ...prev,
      address,
    }));
    goToNextStep();
  };
  
  const updateContactInfo = (contactDetails: CustomerContactInformation[]) => {
    setFormData(prev => ({
      ...prev,
      contactDetails,
    }));
    goToNextStep();
  };
  
  const updateIdentityProofs = (identityProofs: CustomerProofOfId[]) => {
    setFormData(prev => ({
      ...prev,
      identityProofs,
    }));
    goToNextStep();
  };
  
  // Submit the form data
  const handleSubmit = async () => {
    try {
      setSubmitting(true);
      const response = await fetch('/api/customer', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });
      
      if (!response.ok) {
        throw new Error('Failed to create customer');
      }
      
      const data = await response.json();
      toast.success('Customer created successfully!');
      
      // Navigate to the customer details page
      navigate(`/customers/view/${data.id}`);
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Failed to create customer';
      toast.error(errorMessage);
    } finally {
      setSubmitting(false);
    }
  };
  
  return (
    <div className="max-w-3xl mx-auto py-8">
      <div className="mb-8">
        <div className="flex justify-between items-center mb-2">
          <h1 className="text-3xl font-display font-bold text-white">Create New Customer</h1>
          <span className="text-white/60">Step {currentStepIndex + 1} of {steps.length}</span>
        </div>
        
        {/* Progress bar */}
        <div className="w-full bg-space-blue/40 rounded-full h-2.5">
          <div 
            className="bg-gold h-2.5 rounded-full transition-all duration-300" 
            style={{ width: `${progressPercentage}%` }}
          ></div>
        </div>
      </div>
      
      <div className="bg-space-blue/30 backdrop-blur-sm border border-white/10 rounded-lg p-6 mb-8">
        <Routes>
          <Route path="/" element={
            <PersonalInfoForm 
              initialData={formData.name} 
              initialDateOfBirth={formData.dateOfBirth}
              onSubmit={updatePersonalInfo} 
            />
          } />
          <Route path="/address" element={
            <AddressForm 
              initialData={formData.address} 
              onBack={goToPreviousStep}
              onSubmit={updateAddress} 
            />
          } />
          <Route path="/contact" element={
            <ContactInfoForm 
              initialData={formData.contactDetails} 
              onBack={goToPreviousStep}
              onSubmit={updateContactInfo} 
            />
          } />
          <Route path="/identity" element={
            <IdentityProofForm 
              initialData={formData.identityProofs} 
              onBack={goToPreviousStep}
              onSubmit={updateIdentityProofs} 
            />
          } />
          <Route path="/summary" element={
            <FormSummary 
              customerData={formData} 
              onBack={goToPreviousStep}
              onEdit={() => navigate('/customers/create')}
              onSubmit={handleSubmit}
              submitting={submitting}
            />
          } />
          <Route path="*" element={<Navigate to="/customers/create" />} />
        </Routes>
      </div>
    </div>
  );
};

export default CustomerFormContainer;
