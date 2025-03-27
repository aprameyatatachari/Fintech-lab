import { CustomerDetail } from '../../../types';
import CustomerDetails from '../../CustomerDetails';

interface FormSummaryProps {
  customerData: CustomerDetail;
  onBack: () => void;
  onEdit: () => void;
  onSubmit: () => void;
  submitting: boolean;
}

const FormSummary = ({ 
  customerData, 
  onBack, 
  onEdit, 
  onSubmit, 
  submitting 
}: FormSummaryProps) => {
  
  return (
    <div className="space-y-6">
      <div className="mb-8">
        <h2 className="text-xl font-medium text-gold mb-2">Customer Summary</h2>
        <p className="text-white/70">Review the customer information before submitting</p>
      </div>
      
      <div className="border border-gold/30 rounded-lg overflow-hidden">
        <CustomerDetails 
          previewData={customerData} 
          onEdit={onEdit} 
        />
      </div>
      
      <div className="pt-6 flex justify-between">
        <button
          type="button"
          onClick={onBack}
          className="px-6 py-2 bg-transparent border border-white/30 text-white rounded-lg font-medium 
            hover:border-white/60 transition-colors focus:outline-none"
          disabled={submitting}
        >
          Back
        </button>
        <button
          type="button"
          onClick={onSubmit}
          className={`px-8 py-3 bg-gold text-gold rounded-lg font-semibold 
            transition-colors focus:outline-none focus:ring-2 focus:ring-gold focus:ring-opacity-50
            ${submitting ? 'opacity-70 cursor-not-allowed' : 'hover:bg-gold-light'}`}
          disabled={submitting}
        >
          {submitting ? (
            <div className="flex items-center">
              <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-space-dark" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
              Submitting...
            </div>
          ) : (
            'Submit Customer Information'
          )}
        </button>
      </div>
    </div>
  );
};

export default FormSummary;
