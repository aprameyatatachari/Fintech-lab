import { useState } from 'react';
import LandingPage from './pages/LandingPage';
import CustomerDetailsPage from './pages/CustomerDetailsPage';
import CustomerNamePage from './pages/CustomerNamePage';
import CustomerProofOfIdentityPage from './pages/CustomerProofOfIdentityPage';
import CustomerContactPage from './pages/CustomerContactPage';
import CustomerAddressPage from './pages/CustomerAddressPage';
import SuccessPage from './pages/SuccessPage';

// Define types for our customer data structure
export type CustomerIdentification = {
  type: number;
  item: string;
};

export type CustomerProofOfId = {
  type: string;
  value: string;
  startDate: string;
  endDate: string;
};

export type CustomerData = {
  firstName: string;
  lastName: string;
  middleName?: string;
  dateOfBirth?: string;
  customerIdentifications: CustomerIdentification[];
  customerProofOfIds: CustomerProofOfId[];
  email: string;
  phone: string;
  addressLine1: string;
  addressLine2?: string;
  city: string;
  state: string;
  zipCode: string;
  country: string;
};

const App = () => {
  // State to keep track of the current page
  const [currentPage, setCurrentPage] = useState<number>(0);
  
  // State to keep track of the customer data
  const [customerData, setCustomerData] = useState<CustomerData>({
    firstName: '',
    lastName: '',
    customerIdentifications: [],
    customerProofOfIds: [],
    email: '',
    phone: '',
    addressLine1: '',
    city: '',
    state: '',
    zipCode: '',
    country: '',
  });

  // Function to handle navigation between pages
  const navigate = (pageNumber: number) => {
    setCurrentPage(pageNumber);
    window.scrollTo(0, 0);
  };

  // Function to update customer data
  const updateCustomerData = (data: Partial<CustomerData>) => {
    setCustomerData(prevData => ({
      ...prevData,
      ...data
    }));
  };

  // Function to submit data to server
  const submitCustomerData = async () => {
    try {
      const response = await fetch('/api/cdetail', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(customerData),
      });
      
      if (response.ok) {
        // Navigate to success page
        navigate(6);
      } else {
        throw new Error('Failed to submit data');
      }
    } catch (error) {
      console.error('Error submitting customer data:', error);
      // Handle error (could add error state and display to user)
    }
  };

  // Render the appropriate page based on the current page number
  const renderPage = () => {
    switch (currentPage) {
      case 0:
        return <LandingPage onNext={() => navigate(1)} />;
      case 1:
        return (
          <CustomerNamePage 
            customerData={customerData} 
            updateCustomerData={updateCustomerData} 
            onNext={() => navigate(2)} 
            onBack={() => navigate(0)} 
          />
        );
      case 2:
        return (
          <CustomerProofOfIdentityPage 
            customerData={customerData} 
            updateCustomerData={updateCustomerData} 
            onNext={() => navigate(3)} 
            onBack={() => navigate(1)} 
          />
        );
      case 3:
        return (
          <CustomerContactPage 
            customerData={customerData} 
            updateCustomerData={updateCustomerData} 
            onNext={() => navigate(4)} 
            onBack={() => navigate(2)} 
          />
        );
      case 4:
        return (
          <CustomerAddressPage 
            customerData={customerData} 
            updateCustomerData={updateCustomerData} 
            onNext={() => navigate(5)} 
            onBack={() => navigate(3)} 
          />
        );
      case 5:
        return (
          <CustomerDetailsPage 
            customerData={customerData} 
            onNext={submitCustomerData} 
            onBack={() => navigate(4)} 
          />
        );
      case 6:
        return <SuccessPage />;
      default:
        return <LandingPage onNext={() => navigate(1)} />;
    }
  };

  return (
    <div className="min-h-screen bg-background-dark">
      {renderPage()}
    </div>
  );
};

export default App;