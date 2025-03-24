import React from 'react';
import AnimatedCard from '../components/AnimatedCard';
import Button from '../components/Button';
import ProgressBar from '../components/ProgressBar';
import { CustomerData } from '../App';

interface CustomerDetailsPageProps {
  customerData: CustomerData;
  onNext: () => void;
  onBack: () => void;
}

const CustomerDetailsPage: React.FC<CustomerDetailsPageProps> = ({
  customerData,
  onNext,
  onBack,
}) => {
  return (
    <div className="page-container py-12">
      <ProgressBar currentStep={5} totalSteps={5} />
      
      <AnimatedCard>
        <h1 className="text-2xl font-bold mb-6 text-center">Review Your Information</h1>
        
        <div className="space-y-6">
          <section>
            <h2 className="text-lg font-medium mb-3 text-primary">Personal Information</h2>
            <div className="bg-background-dark p-4 rounded-lg">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <p className="text-sm text-text-dark">First Name</p>
                  <p>{customerData.firstName}</p>
                </div>
                <div>
                  <p className="text-sm text-text-dark">Last Name</p>
                  <p>{customerData.lastName}</p>
                </div>
                {customerData.middleName && (
                  <div>
                    <p className="text-sm text-text-dark">Middle Name</p>
                    <p>{customerData.middleName}</p>
                  </div>
                )}
                {customerData.dateOfBirth && (
                  <div>
                    <p className="text-sm text-text-dark">Date of Birth</p>
                    <p>{new Date(customerData.dateOfBirth).toLocaleDateString()}</p>
                  </div>
                )}
              </div>
            </div>
          </section>
          
          <section>
            <h2 className="text-lg font-medium mb-3 text-primary">Identification Types</h2>
            <div className="bg-background-dark p-4 rounded-lg">
              {customerData.customerIdentifications.length > 0 ? (
                <ul className="divide-y divide-gray-700">
                  {customerData.customerIdentifications.map((id, index) => (
                    <li key={index} className="py-2">
                      {id.item}
                    </li>
                  ))}
                </ul>
              ) : (
                <p className="text-text-dark">No identification types added.</p>
              )}
            </div>
          </section>
          
          <section>
            <h2 className="text-lg font-medium mb-3 text-primary">Proof of IDs</h2>
            <div className="bg-background-dark p-4 rounded-lg">
              {customerData.customerProofOfIds.length > 0 ? (
                <ul className="divide-y divide-gray-700">
                  {customerData.customerProofOfIds.map((proof, index) => (
                    <li key={index} className="py-3">
                      <div>
                        <p className="font-medium">{proof.type}</p>
                        <p className="text-sm text-text-dark">{proof.value}</p>
                        <p className="text-xs text-text-dark">
                          Valid: {new Date(proof.startDate).toLocaleDateString()} - {new Date(proof.endDate).toLocaleDateString()}
                        </p>
                      </div>
                    </li>
                  ))}
                </ul>
              ) : (
                <p className="text-text-dark">No proof of IDs added.</p>
              )}
            </div>
          </section>
          
          <section>
            <h2 className="text-lg font-medium mb-3 text-primary">Contact Information</h2>
            <div className="bg-background-dark p-4 rounded-lg">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <p className="text-sm text-text-dark">Email Address</p>
                  <p>{customerData.email}</p>
                </div>
                <div>
                  <p className="text-sm text-text-dark">Phone Number</p>
                  <p>{customerData.phone}</p>
                </div>
              </div>
            </div>
          </section>
          
          <section>
            <h2 className="text-lg font-medium mb-3 text-primary">Address Information</h2>
            <div className="bg-background-dark p-4 rounded-lg">
              <p>{customerData.addressLine1}</p>
              {customerData.addressLine2 && <p>{customerData.addressLine2}</p>}
              <p>{customerData.city}, {customerData.state} {customerData.zipCode}</p>
              <p>{customerData.country}</p>
            </div>
          </section>
        </div>
        
        <div className="flex justify-between mt-8">
          <Button 
            type="button" 
            variant="secondary"
            onClick={onBack}
          >
            Back
          </Button>
          
          <Button onClick={onNext}>
            Submit Registration
          </Button>
        </div>
      </AnimatedCard>
    </div>
  );
};

export default CustomerDetailsPage;