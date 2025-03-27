import { useState } from 'react';
import { CustomerContactInformation } from '../../../types';

interface ContactInfoFormProps {
  initialData: CustomerContactInformation[];
  onBack: () => void;
  onSubmit: (data: CustomerContactInformation[]) => void;
}

const ContactInfoForm = ({ initialData, onBack, onSubmit }: ContactInfoFormProps) => {
  const [contacts, setContacts] = useState<
    Array<CustomerContactInformation & { id: string }>
  >(
    initialData.length > 0
      ? initialData.map((contact) => ({
          ...contact,
          id: Math.random().toString(36).substring(2, 9),
        }))
      : [
          {
            id: Math.random().toString(36).substring(2, 9),
            type: 'Email',
            value: '',
          },
        ]
  );
  const [errors, setErrors] = useState<Record<string, string>>({});

  const handleChange = (id: string, field: keyof CustomerContactInformation, value: string) => {
    setContacts(contacts.map(contact => 
      contact.id === id ? { ...contact, [field]: value } : contact
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

  const addContact = () => {
    setContacts([
      ...contacts,
      {
        id: Math.random().toString(36).substring(2, 9),
        type: 'Phone',
        value: '',
      },
    ]);
  };

  const removeContact = (id: string) => {
    // Don't allow removing all contacts
    if (contacts.length > 1) {
      setContacts(contacts.filter(contact => contact.id !== id));
      
      // Clear any errors for this contact
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
    
    contacts.forEach(contact => {
      if (!contact.type.trim()) {
        newErrors[`${contact.id}-type`] = 'Contact type is required';
      }
      
      if (!contact.value.trim()) {
        newErrors[`${contact.id}-value`] = 'Contact value is required';
      } else {
        // Validate based on contact type
        switch (contact.type) {
          case 'Email':
            // Basic email validation
            if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(contact.value)) {
              newErrors[`${contact.id}-value`] = 'Please enter a valid email address';
            }
            break;
          case 'Phone':
            // Basic phone validation (allows +, spaces, parentheses, hyphens, and digits)
            if (!/^[+\s()0-9-]{7,20}$/.test(contact.value)) {
              newErrors[`${contact.id}-value`] = 'Please enter a valid phone number';
            }
            break;
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
      const cleanedContacts: CustomerContactInformation[] = contacts.map(
        ({ id, ...rest }) => rest
      );
      onSubmit(cleanedContacts);
    }
  };

  const contactTypes = ['Email', 'Phone', 'Mobile', 'Work', 'Other'];

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="mb-8">
        <h2 className="text-xl font-medium text-gold mb-2">Contact Information</h2>
        <p className="text-white/70">Add one or more contact methods for the customer</p>
      </div>
      
      {contacts.map((contact, index) => (
        <div 
          key={contact.id} 
          className="p-5 border border-white/10 rounded-lg bg-space-blue/20 space-y-4"
        >
          <div className="flex justify-between items-center">
            <h3 className="text-white font-medium">Contact #{index + 1}</h3>
            {contacts.length > 1 && (
              <button
                type="button"
                onClick={() => removeContact(contact.id)}
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
              <label htmlFor={`type-${contact.id}`} className="block text-white mb-2">
                Contact Type <span className="text-gold">*</span>
              </label>
              <select
                id={`type-${contact.id}`}
                value={contact.type}
                onChange={(e) => handleChange(contact.id, 'type', e.target.value)}
                className={`w-full px-4 py-2 bg-space-blue/40 border ${errors[`${contact.id}-type`] ? 'border-red-500' : 'border-white/20'} 
                  rounded-lg focus:outline-none focus:border-gold text-white`}
              >
                {contactTypes.map((type) => (
                  <option key={type} value={type}>
                    {type}
                  </option>
                ))}
              </select>
              {errors[`${contact.id}-type`] && (
                <p className="mt-1 text-red-400 text-sm">{errors[`${contact.id}-type`]}</p>
              )}
            </div>
            
            <div>
              <label htmlFor={`value-${contact.id}`} className="block text-white mb-2">
                {contact.type === 'Email' ? 'Email Address' : 'Phone Number'} <span className="text-gold">*</span>
              </label>
              <input
                type={contact.type === 'Email' ? 'email' : 'tel'}
                id={`value-${contact.id}`}
                value={contact.value}
                onChange={(e) => handleChange(contact.id, 'value', e.target.value)}
                placeholder={contact.type === 'Email' ? 'customer@example.com' : '+1 123-456-7890'}
                className={`w-full px-4 py-2 bg-space-blue/40 border ${errors[`${contact.id}-value`] ? 'border-red-500' : 'border-white/20'} 
                  rounded-lg focus:outline-none focus:border-gold text-white`}
              />
              {errors[`${contact.id}-value`] && (
                <p className="mt-1 text-red-400 text-sm">{errors[`${contact.id}-value`]}</p>
              )}
            </div>
          </div>
        </div>
      ))}
      
      <div>
        <button
          type="button"
          onClick={addContact}
          className="flex items-center text-gold hover:text-gold-light transition-colors focus:outline-none"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-11a1 1 0 10-2 0v2H7a1 1 0 100 2h2v2a1 1 0 102 0v-2h2a1 1 0 100-2h-2V7z" clipRule="evenodd" />
          </svg>
          Add Another Contact Method
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

export default ContactInfoForm;
