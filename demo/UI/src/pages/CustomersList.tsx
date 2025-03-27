import { useState, useEffect } from 'react';
import { Link } from 'react-router';
import { CustomerDetail } from '../types';
import toast from 'react-hot-toast';

const CustomersList = () => {
  const [customers, setCustomers] = useState<CustomerDetail[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchCustomers = async () => {
      try {
        setLoading(true);
        const response = await fetch('/api/customer');
        
        if (!response.ok) {
          throw new Error('Failed to fetch customers');
        }
        
        const data = await response.json();
        setCustomers(data);
      } catch (err) {
        const errorMessage = err instanceof Error ? err.message : 'An error occurred';
        setError(errorMessage);
        toast.error(errorMessage);
      } finally {
        setLoading(false);
      }
    };

    fetchCustomers();
  }, []);

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
        <h2 className="text-xl font-medium text-red-400 mb-2">Error Loading Customers</h2>
        <p className="text-white/80">{error}</p>
        <button 
          onClick={() => window.location.reload()} 
          className="mt-4 px-4 py-2 bg-red-800/50 hover:bg-red-700/50 rounded text-white"
        >
          Try Again
        </button>
      </div>
    );
  }

  if (customers.length === 0) {
    return (
      <div className="text-center py-16">
        <h2 className="text-3xl font-display font-semibold mb-6">No Customers Found</h2>
        <p className="text-white/70 mb-8">Start by creating a new customer profile</p>
        <Link 
          to="/customers/create" 
          className="px-6 py-3 bg-gold text-space-dark rounded-lg font-medium hover:bg-gold-light transition-colors"
        >
          Create New Customer
        </Link>
      </div>
    );
  }

  return (
    <div className="container mx-auto py-8">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-display font-bold text-white">Customer Directory</h1>
        <Link 
          to="/customers/create" 
          className="px-4 py-2 bg-gold text-space-dark rounded-lg font-medium hover:bg-gold-light transition-colors"
        >
          Add New Customer
        </Link>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {customers.map((customer) => (
          <Link 
            key={customer.id} 
            to={`/customers/view/${customer.id}`} 
            className="bg-space-blue/40 backdrop-blur-sm border border-white/10 rounded-lg overflow-hidden hover:border-gold/30 transition-all transform hover:scale-105 hover:shadow-lg hover:shadow-gold/20"
          >
            <div className="p-6">
              <div className="flex items-center space-x-4">
                <div className="h-12 w-12 rounded-full bg-gold/20 flex items-center justify-center text-gold-light">
                  <span className="text-xl font-semibold">
                    {customer.name.firstName.charAt(0)}
                    {customer.name.lastName.charAt(0)}
                  </span>
                </div>
                <div>
                  <h3 className="text-lg font-semibold">
                    {customer.name.firstName} {customer.name.middleName ? `${customer.name.middleName.charAt(0)}. ` : ''}{customer.name.lastName}
                  </h3>
                  <p className="text-white/60">DOB: {new Date(customer.dateOfBirth).toLocaleDateString()}</p>
                </div>
              </div>
              <div className="mt-4 pt-4 border-t border-white/10">
                <p className="text-white/70 text-sm truncate">
                  <span className="text-gold-light">Location:</span> {customer.address.city}, {customer.address.country}
                </p>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default CustomersList;
