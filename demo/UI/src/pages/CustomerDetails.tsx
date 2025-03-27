import { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router';
import { CustomerDetail } from '../types';
import toast from 'react-hot-toast';

interface CustomerDetailsProps {
  previewData?: CustomerDetail;
  isPreview?: boolean;
  onEdit?: () => void;
}

const CustomerDetails = ({ previewData, isPreview, onEdit }: CustomerDetailsProps) => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [customer, setCustomer] = useState<CustomerDetail | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (previewData) {
      setCustomer(previewData);
      return;
    }

    const fetchCustomerDetails = async () => {
      try {
        setLoading(true);
        const response = await fetch(`/api/customer/${id}`);
        
        if (!response.ok) {
          throw new Error('Failed to fetch customer details');
        }
        
        const data = await response.json();
        setCustomer(data);
      } catch (err) {
        const errorMessage = err instanceof Error ? err.message : 'An error occurred';
        setError(errorMessage);
        toast.error(errorMessage);
      } finally {
        setLoading(false);
      }
    };

    if (id) {
      fetchCustomerDetails();
    }
  }, [id, previewData]);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-96">
        <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-gold"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-red-900/20 border border-red-500 rounded-lg p-6 text-center">
        <h2 className="text-xl font-medium text-red-400 mb-2">Error Loading Customer</h2>
        <p className="text-white/80">{error}</p>
        <div className="flex justify-center mt-4 space-x-4">
          <button 
            onClick={() => navigate(-1)} 
            className="px-4 py-2 bg-space-blue/50 hover:bg-space-blue/70 rounded text-white"
          >
            Go Back
          </button>
          <button 
            onClick={() => window.location.reload()} 
            className="px-4 py-2 bg-red-800/50 hover:bg-red-700/50 rounded text-white"
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }

  if (!customer) {
    return (
      <div className="text-center py-16">
        <h2 className="text-3xl font-display font-semibold mb-6">Customer Not Found</h2>
        <Link 
          to="/customers/view" 
          className="px-6 py-3 bg-gold/80 hover:bg-gold text-space-dark rounded-lg font-medium transition-colors"
        >
          Back to All Customers
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-5xl mx-auto py-8">
      {isPreview && (
        <div className="bg-gold/10 border border-gold/30 rounded-lg mb-8 p-4 text-center">
          <p className="text-gold-light font-medium">
            Preview Mode - Review customer information before submitting
          </p>
        </div>
      )}
      
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-3xl font-display font-bold text-white">
            {customer.name.firstName} {customer.name.middleName ? `${customer.name.middleName} ` : ''}{customer.name.lastName}
          </h1>
          <p className="text-white/60">Customer Profile</p>
        </div>
        
        <div className="flex space-x-4">
          {isPreview ? (
            <button
              onClick={onEdit}
              className="px-4 py-2 border border-gold/50 text-gold rounded-lg hover:bg-gold/20 transition-colors"
            >
              Edit Information
            </button>
          ) : (
            <Link
              to="/customers/view"
              className="px-4 py-2 border border-white/20 rounded-lg hover:border-white/40 transition-colors"
            >
              Back to List
            </Link>
          )}
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Personal Information */}
        <div className="bg-space-blue/30 backdrop-blur-sm border border-white/10 rounded-lg p-6">
          <h2 className="text-xl font-semibold mb-4 text-gold-light">Personal Information</h2>
          <div className="space-y-4">
            <div>
              <p className="text-white/50 text-sm">Full Name</p>
              <p className="text-white font-medium">
                {customer.name.firstName} {customer.name.middleName || ''} {customer.name.lastName}
              </p>
            </div>
            <div>
              <p className="text-white/50 text-sm">Date of Birth</p>
              <p className="text-white font-medium">
                {new Date(customer.dateOfBirth).toLocaleDateString()}
              </p>
            </div>
          </div>
        </div>

        {/* Address Information */}
        <div className="bg-space-blue/30 backdrop-blur-sm border border-white/10 rounded-lg p-6">
          <h2 className="text-xl font-semibold mb-4 text-gold-light">Address</h2>
          <div className="space-y-4">
            <div>
              <p className="text-white/50 text-sm">Street Address</p>
              <p className="text-white font-medium">
                {customer.address.addressLine1}
                {customer.address.addressLine2 && <span><br />{customer.address.addressLine2}</span>}
              </p>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <p className="text-white/50 text-sm">City</p>
                <p className="text-white font-medium">{customer.address.city}</p>
              </div>
              <div>
                <p className="text-white/50 text-sm">State/Province</p>
                <p className="text-white font-medium">{customer.address.state}</p>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <p className="text-white/50 text-sm">Postal Code</p>
                <p className="text-white font-medium">{customer.address.zipCode}</p>
              </div>
              <div>
                <p className="text-white/50 text-sm">Country</p>
                <p className="text-white font-medium">{customer.address.country}</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Contact Information */}
      <div className="mt-8 bg-space-blue/30 backdrop-blur-sm border border-white/10 rounded-lg p-6">
        <h2 className="text-xl font-semibold mb-4 text-gold-light">Contact Information</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {customer.contactDetails.map((contact, index) => (
            <div key={index} className="border border-white/10 rounded-lg p-4">
              <p className="text-white/50 text-sm">{contact.type}</p>
              <p className="text-white font-medium">{contact.value}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Identity Proofs */}
      <div className="mt-8 bg-space-blue/30 backdrop-blur-sm border border-white/10 rounded-lg p-6">
        <h2 className="text-xl font-semibold mb-4 text-gold-light">Identity Documents</h2>
        <div className="space-y-4">
          {customer.identityProofs.map((proof, index) => (
            <div key={index} className="border border-white/10 rounded-lg p-4">
              <div className="flex justify-between">
                <h3 className="font-medium">{proof.type}</h3>
                <span className="text-white/50 text-sm">{proof.value}</span>
              </div>
              <div className="mt-2 grid grid-cols-2 gap-4">
                <div>
                  <p className="text-white/50 text-sm">Issued Date</p>
                  <p className="text-white">{new Date(proof.issuedDate).toLocaleDateString()}</p>
                </div>
                <div>
                  <p className="text-white/50 text-sm">Expiry Date</p>
                  <p className="text-white">{new Date(proof.expiryDate).toLocaleDateString()}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default CustomerDetails;
