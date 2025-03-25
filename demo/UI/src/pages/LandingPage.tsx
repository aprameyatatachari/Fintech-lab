import React from 'react';

interface LandingPageProps {
  onNext: () => void;
}

const LandingPage: React.FC<LandingPageProps> = ({ onNext }) => {
  return (
    <div className="container mx-auto px-4 py-16 max-w-4xl">
      <div className="text-center mb-12 fade-in">
        <h1 className="text-4xl md:text-5xl font-bold mb-6 gold-text">
          <span className="neon-text">Fintech Lab</span>
        </h1>
        <h1 className="text-lg md:text-xl max-w-2xl mx-auto opacity-80">
          Aprameya Tatachari, 230958006
        </h1>
      </div>
      
      <div className="galaxy-card mx-auto max-w-2xl slide-in">
        <div className="flex flex-col items-center p-6">
          <div className="w-24 h-24 rounded-full gold-border flex items-center justify-center mb-6">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 text-yellow-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
            </svg>
          </div>
          
          <h2 className="text-2xl font-semibold mb-4 gold-text">Create Your Customer Profile</h2>
          
          <p className="text-center mb-8 opacity-80">
            Enter your details as follows.
          </p>
          
          <ul className="space-y-3 w-full max-w-md mb-8">
            {['Personal Information', 'Identity Verification', 'Contact Details', 'Address Verification'].map((step, index) => (
              <li key={index} className="flex items-center">
                <div className="w-8 h-8 rounded-full neon-border flex items-center justify-center mr-3">
                  <span className="neon-text">{index + 1}</span>
                </div>
                <span>{step}</span>
              </li>
            ))}
          </ul>
          
          <button 
            onClick={onNext}
            className="btn-primary w-full md:w-auto">
            Start
          </button>
        </div>
      </div>
    </div>
  );
};

export default LandingPage;