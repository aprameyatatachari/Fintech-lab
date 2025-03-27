import { useState } from 'react';
import { CustomerNames } from '../../../types';

interface PersonalInfoFormProps {
  initialData: CustomerNames;
  initialDateOfBirth: string;
  onSubmit: (data: { name: CustomerNames; dateOfBirth: string }) => void;
}

const PersonalInfoForm = ({ initialData, initialDateOfBirth, onSubmit }: PersonalInfoFormProps) => {
  const [formData, setFormData] = useState({
    firstName: initialData.firstName || '',
    middleName: initialData.middleName || '',
    lastName: initialData.lastName || '',
    dateOfBirth: initialDateOfBirth || '',
  });
  const [errors, setErrors] = useState<Record<string, string>>({});

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
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
    
    if (!formData.firstName.trim()) {
      newErrors.firstName = 'First name is required';
    }
    
    if (!formData.lastName.trim()) {
      newErrors.lastName = 'Last name is required';
    }
    
    if (!formData.dateOfBirth) {
      newErrors.dateOfBirth = 'Date of birth is required';
    } else {
      const dob = new Date(formData.dateOfBirth);
      const today = new Date();
      
      // Check if date is valid and not in the future
      if (isNaN(dob.getTime()) || dob > today) {
        newErrors.dateOfBirth = 'Please enter a valid date not in the future';
      }
      
      // Check if customer is at least 18 years old
      const age = today.getFullYear() - dob.getFullYear();
      const monthDiff = today.getMonth() - dob.getMonth();
      
      if (age < 18 || (age === 18 && monthDiff < 0) || 
         (age === 18 && monthDiff === 0 && today.getDate() < dob.getDate())) {
        newErrors.dateOfBirth = 'Customer must be at least 18 years old';
      }
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (validateForm()) {
      onSubmit({
        name: {
          firstName: formData.firstName.trim(),
          middleName: formData.middleName.trim() || undefined,
          lastName: formData.lastName.trim(),
        },
        dateOfBirth: formData.dateOfBirth,
      });
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="mb-8">
        <h2 className="text-xl font-medium text-gold mb-2">Personal Information</h2>
        <p className="text-white/70">Enter the customer's basic personal details</p>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label htmlFor="firstName" className="block text-white mb-2">
            First Name <span className="text-gold">*</span>
          </label>
          <input
            type="text"
            id="firstName"
            name="firstName"
            value={formData.firstName}
            onChange={handleChange}
            className={`w-full px-4 py-2 bg-space-blue/40 border ${errors.firstName ? 'border-red-500' : 'border-white/20'} 
              rounded-lg focus:outline-none focus:border-gold text-white`}
          />
          {errors.firstName && (
            <p className="mt-1 text-red-400 text-sm">{errors.firstName}</p>
          )}
        </div>
        
        <div>
          <label htmlFor="middleName" className="block text-white mb-2">
            Middle Name <span className="text-white/50">(optional)</span>
          </label>
          <input
            type="text"
            id="middleName"
            name="middleName"
            value={formData.middleName}
            onChange={handleChange}
            className="w-full px-4 py-2 bg-space-blue/40 border border-white/20 
              rounded-lg focus:outline-none focus:border-gold text-white"
          />
        </div>
      </div>
      
      <div>
        <label htmlFor="lastName" className="block text-white mb-2">
          Last Name <span className="text-gold">*</span>
        </label>
        <input
          type="text"
          id="lastName"
          name="lastName"
          value={formData.lastName}
          onChange={handleChange}
          className={`w-full px-4 py-2 bg-space-blue/40 border ${errors.lastName ? 'border-red-500' : 'border-white/20'} 
            rounded-lg focus:outline-none focus:border-gold text-white`}
        />
        {errors.lastName && (
          <p className="mt-1 text-red-400 text-sm">{errors.lastName}</p>
        )}
      </div>
      
      <div>
        <label htmlFor="dateOfBirth" className="block text-white mb-2">
          Date of Birth <span className="text-gold">*</span>
        </label>
        <input
          type="date"
          id="dateOfBirth"
          name="dateOfBirth"
          value={formData.dateOfBirth}
          onChange={handleChange}
          className={`w-full px-4 py-2 bg-space-blue/40 border ${errors.dateOfBirth ? 'border-red-500' : 'border-white/20'} 
            rounded-lg focus:outline-none focus:border-gold text-white`}
          max={new Date().toISOString().split('T')[0]} // Prevents future dates
        />
        {errors.dateOfBirth && (
          <p className="mt-1 text-red-400 text-sm">{errors.dateOfBirth}</p>
        )}
      </div>
      
      <div className="pt-6 flex justify-end">
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

export default PersonalInfoForm;
