import { useState } from 'react';
import { CustomerProofOfId } from '../../../types';

interface IdentityProofFormProps {
  initialData: CustomerProofOfId[];
  onBack: () => void;
  onSubmit: (data: CustomerProofOfId[]) => void;
}

const IdentityProofForm = ({ initialData, onBack, onSubmit }: IdentityProofFormProps) => {
  const [proofs, setProofs] = useState<
    Array<CustomerProofOfId & { id: string }>
  >(
    initialData.length > 0
      ? initialData.map((proof) => ({
          ...proof,
          id: Math.random().toString(36).substring(2, 9),
        }))
      : [
          {
            id: Math.random().toString(36).substring(2, 9),
            type: 'Passport',
            value: '',
            issuedDate: '',
            expiryDate: '',
          },
        ]
  );
  const [errors, setErrors] = useState<Record<string, string>>({});

  const handleChange = (id: string, field: keyof CustomerProofOfId, value: string) => {
    setProofs(proofs.map(proof => 
      proof.id === id ? { ...proof, [field]: value } : proof
    ));
    
    // Clear error
    if (errors[`${id}-${field}`]) {
      setErrors(prev => {
        const newErrors = { ...prev };
        delete newErrors[`${id}-${field}`];
        return newErrors;
      });
    }
  };

  const addProof = () => {
    setProofs([
      ...proofs,
      {
        id: Math.random().toString(36).substring(2, 9),
        type: 'Driver License',
        value: '',
        issuedDate: '',
        expiryDate: '',
      },
    ]);
  };

  const removeProof = (id: string) => {
    // Don't allow removing all proofs
    if (proofs.length > 1) {
      setProofs(proofs.filter(proof => proof.id !== id));
      
      // Clear any errors for this proof
      const newErrors = { ...errors };
      Object.keys(newErrors).forEach(key => {
        if (key.startsWith(`${id}-`)) {
          delete newErrors[key];
        }
      });
      setErrors(newErrors);
    }
  };

  const validateForm = () => {
    const newErrors: Record<string, string> = {};
    const today = new Date();
    
    proofs.forEach(proof => {
      if (!proof.type.trim()) {
        newErrors[`${proof.id}-type`] = 'Document type is required';
      }
      
      if (!proof.value.trim()) {
        newErrors[`${proof.id}-value`] = 'Document number is required';
      }
      
      if (!proof.issuedDate) {
        newErrors[`${proof.id}-issuedDate`] = 'Issue date is required';
      } else {
        const issuedDate = new Date(proof.issuedDate);
        if (isNaN(issuedDate.getTime()) || issuedDate > today) {
          newErrors[`${proof.id}-issuedDate`] = 'Please enter a valid issue date not in the future';
        }
      }
      
      if (!proof.expiryDate) {
        newErrors[`${proof.id}-expiryDate`] = 'Expiry date is required';
      } else {
        const expiryDate = new Date(proof.expiryDate);
        const issuedDate = new Date(proof.issuedDate);
        
        if (isNaN(expiryDate.getTime())) {
          newErrors[`${proof.id}-expiryDate`] = 'Please enter a valid expiry date';
        } else if (proof.issuedDate && expiryDate <= issuedDate) {
          newErrors[`${proof.id}-expiryDate`] = 'Expiry date must be after issue date';
        }
      }
    });
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (validateForm()) {
      // Strip the temporary ids before submitting
      const cleanedProofs: CustomerProofOfId[] = proofs.map(
        ({ id, ...rest }) => rest
      );
      onSubmit(cleanedProofs);
    }
  };

  const documentTypes = ['Passport', 'Driver License', 'ID Card', 'Social Security', 'Other Government ID'];

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="mb-8">
        <h2 className="text-xl font-medium text-gold mb-2">Identity Documents</h2>
        <p className="text-white/70">Add one or more identity documents for the customer</p>
      </div>
      
      {proofs.map((proof, index) => (
        <div 
          key={proof.id} 
          className="p-5 border border-white/10 rounded-lg bg-space-blue/20 space-y-4"
        >
          <div className="flex justify-between items-center">
            <h3 className="text-white font-medium">Document #{index + 1}</h3>
            {proofs.length > 1 && (
              <button
                type="button"
                onClick={() => removeProof(proof.id)}
                className="text-red-400 hover:text-red-300 focus:outline-none"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM7 9a1 1 0 000 2h6a1 1 0 100-2H7z" clipRule="evenodd" />
                </svg>
              </button>
            )}
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label htmlFor={`type-${proof.id}`} className="block text-white mb-2">
                Document Type <span className="text-gold">*</span>
              </label>
              <select
                id={`type-${proof.id}`}
                value={proof.type}
                onChange={(e) => handleChange(proof.id, 'type', e.target.value)}
                className={`w-full px-4 py-2 bg-space-blue/40 border ${errors[`${proof.id}-type`] ? 'border-red-500' : 'border-white/20'} 
                  rounded-lg focus:outline-none focus:border-gold text-white`}
              >
                {documentTypes.map((type) => (
                  <option key={type} value={type}>
                    {type}
                  </option>
                ))}
              </select>
              {errors[`${proof.id}-type`] && (
                <p className="mt-1 text-red-400 text-sm">{errors[`${proof.id}-type`]}</p>
              )}
            </div>
            
            <div>
              <label htmlFor={`value-${proof.id}`} className="block text-white mb-2">
                Document Number <span className="text-gold">*</span>
              </label>
              <input
                type="text"
                id={`value-${proof.id}`}
                value={proof.value}
                onChange={(e) => handleChange(proof.id, 'value', e.target.value)}
                placeholder={proof.type === 'Passport' ? 'X12345678' : 'DL123456789'}
                className={`w-full px-4 py-2 bg-space-blue/40 border ${errors[`${proof.id}-value`] ? 'border-red-500' : 'border-white/20'} 
                  rounded-lg focus:outline-none focus:border-gold text-white`}
              />
              {errors[`${proof.id}-value`] && (
                <p className="mt-1 text-red-400 text-sm">{errors[`${proof.id}-value`]}</p>
              )}
            </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label htmlFor={`issuedDate-${proof.id}`} className="block text-white mb-2">
                Issue Date <span className="text-gold">*</span>
              </label>
              <input
                type="date"
                id={`issuedDate-${proof.id}`}
                value={proof.issuedDate}
                onChange={(e) => handleChange(proof.id, 'issuedDate', e.target.value)}
                max={new Date().toISOString().split('T')[0]} // Prevents future dates
                className={`w-full px-4 py-2 bg-space-blue/40 border ${errors[`${proof.id}-issuedDate`] ? 'border-red-500' : 'border-white/20'} 
                  rounded-lg focus:outline-none focus:border-gold text-white`}
              />
              {errors[`${proof.id}-issuedDate`] && (
                <p className="mt-1 text-red-400 text-sm">{errors[`${proof.id}-issuedDate`]}</p>
              )}
            </div>
            
            <div>
              <label htmlFor={`expiryDate-${proof.id}`} className="block text-white mb-2">
                Expiry Date <span className="text-gold">*</span>
              </label>
              <input
                type="date"
                id={`expiryDate-${proof.id}`}
                value={proof.expiryDate}
                onChange={(e) => handleChange(proof.id, 'expiryDate', e.target.value)}
                className={`w-full px-4 py-2 bg-space-blue/40 border ${errors[`${proof.id}-expiryDate`] ? 'border-red-500' : 'border-white/20'} 
                  rounded-lg focus:outline-none focus:border-gold text-white`}
              />
              {errors[`${proof.id}-expiryDate`] && (
                <p className="mt-1 text-red-400 text-sm">{errors[`${proof.id}-expiryDate`]}</p>
              )}
            </div>
          </div>
        </div>
      ))}
      
      <div>
        <button
          type="button"
          onClick={addProof}
          className="flex items-center text-gold hover:text-gold-light transition-colors focus:outline-none"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-11a1 1 0 10-2 0v2H7a1 1 0 100 2h2v2a1 1 0 102 0v-2h2a1 1 0 100-2h-2V7z" clipRule="evenodd" />
          </svg>
          Add Another Document
        </button>
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

export default IdentityProofForm;
