import React, { useState } from 'react';
import AnimatedCard from '../components/AnimatedCard';
import Button from '../components/Button';
import InputField from '../components/InputField';
import ProgressBar from '../components/ProgressBar';
import SelectField from '../components/SelectField';
import DatePickerField from '../components/DatePickerField';
import { CustomerData, CustomerProofOfId, CustomerIdentification } from '../App';

interface CustomerProofOfIdentityPageProps {
  customerData: CustomerData;
  updateCustomerData: (data: Partial<CustomerData>) => void;
  onNext: () => void;
  onBack: () => void;
}

const CustomerProofOfIdentityPage: React.FC<CustomerProofOfIdentityPageProps> = ({
  customerData,
  updateCustomerData,
  onNext,
  onBack,
}) => {
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [currentIdentificationType, setCurrentIdentificationType] = useState<string>('');
  const [currentProofOfId, setCurrentProofOfId] = useState<CustomerProofOfId>({
    type: '',
    value: '',
    startDate: '',
    endDate: '',
  });

  const identificationTypes = [
    { value: '1', label: 'Passport' },
    { value: '2', label: "Driver's License" },
    { value: '3', label: 'National ID' },
  ];

  const proofOfIdTypes = [
    { value: 'Aadhar Card', label: 'Aadhar Card' },
    { value: 'PAN Card', label: 'PAN Card' },
    { value: 'Voter ID', label: 'Voter ID' },
  ];

  const handleIdentificationTypeChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setCurrentIdentificationType(e.target.value);
  };

  const handleAddIdentification = () => {
    if (!currentIdentificationType) {
      setErrors({ ...errors, identificationType: 'Please select an identification type' });
      return;
    }

    const newIdentification: CustomerIdentification = {
      type: parseInt(currentIdentificationType),
      item: identificationTypes.find(type => type.value === currentIdentificationType)?.label || '',
    };

    const updatedIdentifications = [...customerData.customerIdentifications, newIdentification];
    updateCustomerData({ customerIdentifications: updatedIdentifications });
    setCurrentIdentificationType('');
    setErrors({ ...errors, identificationType: '' });
  };

  const handleProofOfIdChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setCurrentProofOfId({ ...currentProofOfId, [name]: value });
    
    // Clear error for this field if it exists
    if (errors[name]) {
      setErrors({ ...errors, [name]: '' });
    }
  };

  const handleAddProofOfId = () => {
    const newErrors: Record<string, string> = {};
    
    if (!currentProofOfId.type) {
      newErrors.proofType = 'Please select a proof type';
    }
    if (!currentProofOfId.value) {
      newErrors.proofValue = 'Please enter the ID value';
    }
    if (!currentProofOfId.startDate) {
      newErrors.startDate = 'Please enter the start date';
    }
    if (!currentProofOfId.endDate) {
      newErrors.endDate = 'Please enter the expiry date';
    }
    
    if (Object.keys(newErrors).length > 0) {
      setErrors({ ...errors, ...newErrors });
      return;
    }
    
    const updatedProofOfIds = [...customerData.customerProofOfIds, currentProofOfId];
    updateCustomerData({ customerProofOfIds: updatedProofOfIds });
    setCurrentProofOfId({
      type: '',
      value: '',
      startDate: '',
      endDate: '',
    });
    setErrors({});
  };

  const handleRemoveIdentification = (index: number) => {
    const updatedIdentifications = customerData.customerIdentifications.filter((_, i) => i !== index);
    updateCustomerData({ customerIdentifications: updatedIdentifications });
  };

  const handleRemoveProofOfId = (index: number) => {
    const updatedProofOfIds = customerData.customerProofOfIds.filter((_, i) => i !== index);
    updateCustomerData({ customerProofOfIds: updatedProofOfIds });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validate that at least one identification and proof of ID has been added
    const newErrors: Record<string, string> = {};
    
    if (customerData.customerIdentifications.length === 0) {
      newErrors.identifications = 'At least one identification type is required';
    }
    
    if (customerData.customerProofOfIds.length === 0) {
      newErrors.proofOfIds = 'At least one proof of ID is required';
    }
    
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }
    
    onNext();
  };

  return (
    <div className="page-container py-12">
      <ProgressBar currentStep={2} totalSteps={5} />
      
      <AnimatedCard>
        <h1 className="text-2xl font-bold mb-6 text-center">Proof of Identity</h1>
        
        <form onSubmit={handleSubmit}>
          <div className="mb-6">
            <h2 className="text-xl font-medium mb-4">Identification Types</h2>
            
            <div className="flex flex-col lg:flex-row lg:items-end gap-4 mb-4">
              <div className="flex-grow">
                <SelectField
                  label="Identification Type"
                  id="identificationType"
                  value={currentIdentificationType}
                  onChange={handleIdentificationTypeChange}
                  options={identificationTypes}
                  error={errors.identificationType}
                />
              </div>
              <Button 
                type="button" 
                onClick={handleAddIdentification}
                className="whitespace-nowrap"
              >
                Add Identification
              </Button>
            </div>
            
            {errors.identifications && (
              <p className="error-message mt-2">{errors.identifications}</p>
            )}
            
            {customerData.customerIdentifications.length > 0 && (
              <div className="mt-4 bg-card-dark p-4 rounded-lg">
                <h3 className="text-sm font-medium text-text-dark mb-2">Added Identifications</h3>
                <ul className="divide-y divide-gray-700">
                  {customerData.customerIdentifications.map((id, index) => (
                    <li key={index} className="py-3 flex justify-between items-center">
                      <span>{id.item}</span>
                      <button 
                        type="button"
                        className="text-red-400 hover:text-red-300"
                        onClick={() => handleRemoveIdentification(index)}
                      >
                        Remove
                      </button>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
          
          <div className="mb-6 pt-6 border-t border-gray-700">
            <h2 className="text-xl font-medium mb-4">Proof of ID</h2>
            
            <div className="space-y-4">
              <SelectField
                label="Proof Type"
                id="proofType"
                name="type"
                value={currentProofOfId.type}
                onChange={handleProofOfIdChange}
                options={proofOfIdTypes}
                error={errors.proofType}
              />
              
              <InputField
                label="ID Value"
                id="proofValue"
                name="value"
                value={currentProofOfId.value}
                onChange={handleProofOfIdChange}
                placeholder="Enter your ID number"
                error={errors.proofValue}
              />
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <DatePickerField
                  label="Issue Date"
                  id="startDate"
                  name="startDate"
                  value={currentProofOfId.startDate}
                  onChange={handleProofOfIdChange}
                  error={errors.startDate}
                />
                
                <DatePickerField
                  label="Expiry Date"
                  id="endDate"
                  name="endDate"
                  value={currentProofOfId.endDate}
                  onChange={handleProofOfIdChange}
                  error={errors.endDate}
                />
              </div>
              
              <div className="mt-2">
                <Button 
                  type="button" 
                  onClick={handleAddProofOfId}
                >
                  Add Proof of ID
                </Button>
              </div>
            </div>
            
            {errors.proofOfIds && (
              <p className="error-message mt-2">{errors.proofOfIds}</p>
            )}
            
            {customerData.customerProofOfIds.length > 0 && (
              <div className="mt-4 bg-card-dark p-4 rounded-lg">
                <h3 className="text-sm font-medium text-text-dark mb-2">Added Proof of IDs</h3>
                <ul className="divide-y divide-gray-700">
                  {customerData.customerProofOfIds.map((proof, index) => (
                    <li key={index} className="py-3 flex justify-between items-center">
                      <div>
                        <p className="font-medium">{proof.type}</p>
                        <p className="text-sm text-text-dark">{proof.value}</p>
                        <p className="text-xs text-text-dark">
                          Valid: {new Date(proof.startDate).toLocaleDateString()} - {new Date(proof.endDate).toLocaleDateString()}
                        </p>
                      </div>
                      <button 
                        type="button"
                        className="text-red-400 hover:text-red-300"
                        onClick={() => handleRemoveProofOfId(index)}
                      >
                        Remove
                      </button>
                    </li>
                  ))}
                </ul>
              </div>
            )}
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

export default CustomerProofOfIdentityPage;