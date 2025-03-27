import { useState } from 'react';
import { CustomerAddress } from '../../../types';

interface AddressFormProps {
  initialData: CustomerAddress;
  onBack: () => void;
  onSubmit: (data: CustomerAddress) => void;
}

const AddressForm = ({ initialData, onBack, onSubmit }: AddressFormProps) => {
  const [formData, setFormData] = useState<CustomerAddress>({
    addressLine1: initialData.addressLine1 || '',
    addressLine2: initialData.addressLine2 || '',
    city: initialData.city || '',
    state: initialData.state || '',
    country: initialData.country || '',
    zipCode: initialData.zipCode || '',
  });
  const [errors, setErrors] = useState<Record<string, string>>({});

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => {
        const newErrors = { ...prev };
        delete newErrors[name];
        return newErrors;
      });
    }
  };

  const validateForm = () => {
    const newErrors: Record<string, string> = {};
    const requiredFields: (keyof CustomerAddress)[] = [
      'addressLine1', 'city', 'state', 'country', 'zipCode'
    ];
    
    requiredFields.forEach(field => {
      if (!formData[field]?.trim()) {
        newErrors[field] = `${field.charAt(0).toUpperCase() + field.slice(1).replace(/([A-Z])/g, ' $1').toLowerCase()} is required`;
      }
    });
    
    // Additional validation for zip code format (basic pattern)
    if (formData.zipCode && !/^[0-9a-zA-Z\s\-]{3,10}$/.test(formData.zipCode)) {
      newErrors.zipCode = 'Please enter a valid postal/zip code';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (validateForm()) {
      const processedData: CustomerAddress = {
        ...formData,
        // If addressLine2 is empty, set it to undefined so it won't be included in the final JSON
        addressLine2: formData.addressLine2?.trim() || undefined,
      };
      
      onSubmit(processedData);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="mb-8">
        <h2 className="text-xl font-medium text-gold mb-2">Address Information</h2>
        <p className="text-white/70">Enter the customer's address details</p>
      </div>
      
      <div>
        <label htmlFor="addressLine1" className="block text-white mb-2">
          Address Line 1 <span className="text-gold">*</span>
        </label>
        <textarea
          id="addressLine1"
          name="addressLine1"
          value={formData.addressLine1}
          onChange={handleChange}
          rows={2}
          className={`w-full px-4 py-2 bg-space-blue/40 border ${errors.addressLine1 ? 'border-red-500' : 'border-white/20'} 
            rounded-lg focus:outline-none focus:border-gold text-white`}
        />
        {errors.addressLine1 && (
          <p className="mt-1 text-red-400 text-sm">{errors.addressLine1}</p>
        )}
      </div>
      
      <div>
        <label htmlFor="addressLine2" className="block text-white mb-2">
          Address Line 2 <span className="text-white/50">(optional)</span>
        </label>
        <textarea
          id="addressLine2"
          name="addressLine2"
          value={formData.addressLine2}
          onChange={handleChange}
          rows={2}
          className="w-full px-4 py-2 bg-space-blue/40 border border-white/20 
            rounded-lg focus:outline-none focus:border-gold text-white"
        />
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label htmlFor="city" className="block text-white mb-2">
            City <span className="text-gold">*</span>
          </label>
          <input
            type="text"
            id="city"
            name="city"
            value={formData.city}
            onChange={handleChange}
            className={`w-full px-4 py-2 bg-space-blue/40 border ${errors.city ? 'border-red-500' : 'border-white/20'} 
              rounded-lg focus:outline-none focus:border-gold text-white`}
          />
          {errors.city && (
            <p className="mt-1 text-red-400 text-sm">{errors.city}</p>
          )}
        </div>
        
        <div>
          <label htmlFor="state" className="block text-white mb-2">
            State/Province <span className="text-gold">*</span>
          </label>
          <input
            type="text"
            id="state"
            name="state"
            value={formData.state}
            onChange={handleChange}
            className={`w-full px-4 py-2 bg-space-blue/40 border ${errors.state ? 'border-red-500' : 'border-white/20'} 
              rounded-lg focus:outline-none focus:border-gold text-white`}
          />
          {errors.state && (
            <p className="mt-1 text-red-400 text-sm">{errors.state}</p>
          )}
        </div>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label htmlFor="country" className="block text-white mb-2">
            Country <span className="text-gold">*</span>
          </label>
          <input
            type="text"
            id="country"
            name="country"
            value={formData.country}
            onChange={handleChange}
            className={`w-full px-4 py-2 bg-space-blue/40 border ${errors.country ? 'border-red-500' : 'border-white/20'} 
              rounded-lg focus:outline-none focus:border-gold text-white`}
          />
          {errors.country && (
            <p className="mt-1 text-red-400 text-sm">{errors.country}</p>
          )}
        </div>
        
        <div>
          <label htmlFor="zipCode" className="block text-white mb-2">
            Postal/Zip Code <span className="text-gold">*</span>
          </label>
          <input
            type="text"
            id="zipCode"
            name="zipCode"
            value={formData.zipCode}
            onChange={handleChange}
            className={`w-full px-4 py-2 bg-space-blue/40 border ${errors.zipCode ? 'border-red-500' : 'border-white/20'} 
              rounded-lg focus:outline-none focus:border-gold text-white`}
          />
          {errors.zipCode && (
            <p className="mt-1 text-red-400 text-sm">{errors.zipCode}</p>
          )}
        </div>
      </div>
      
      <div className="pt-6 flex justify-between">
        <button
          type="button"
          onClick={onBack}
          className="px-6 py-2 bg-transparent border border-white/30 text-white rounded-lg font-medium 
            hover:border-white/60 transition-colors focus:outline-none"
        >
          Back
        </button>
        <button
          type="submit"
          className="px-6 py-2 bg-gold text-gold rounded-lg font-medium 
            hover:bg-gold-light transition-colors focus:outline-none focus:ring-2 
            focus:ring-gold focus:ring-opacity-50"
        >
          Next Step
        </button>
      </div>
    </form>
  );
};

export default AddressForm;
