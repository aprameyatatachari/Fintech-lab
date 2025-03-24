import React, { useEffect, useState } from 'react';
import Button from '../components/Button';

interface LandingPageProps {
  onNext: () => void;
}

const LandingPage: React.FC<LandingPageProps> = ({ onNext }) => {
  const [animatedText, setAnimatedText] = useState('');
  const fullText = 'Customer Registration';
  
  // Animate the text typing effect
  useEffect(() => {
    let currentIndex = 0;
    const typingInterval = setInterval(() => {
      if (currentIndex < fullText.length) {
        setAnimatedText(fullText.substring(0, currentIndex + 1));
        currentIndex++;
      } else {
        clearInterval(typingInterval);
      }
    }, 100);
    
    return () => clearInterval(typingInterval);
  }, []);
  
  return (
    <div className="min-h-screen flex flex-col">
      <div className="flex-grow flex flex-col items-center justify-center px-4 dot-pattern">
        <div className="text-center max-w-2xl mx-auto">
          <div className="mb-6 inline-block">
            <div className="relative w-20 h-20 mx-auto mb-4">
              <div className="absolute inset-0 bg-primary rounded-full opacity-20 animate-ping"></div>
              <div className="relative flex items-center justify-center w-20 h-20 bg-primary bg-opacity-30 rounded-full">
                <svg 
                  className="w-10 h-10 text-primary-light" 
                  fill="currentColor" 
                  viewBox="0 0 20 20" 
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd"></path>
                </svg>
              </div>
            </div>
          </div>
          
          <h1 className="text-4xl md:text-6xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-[#FF512F] to-[#DD2476]">
            {animatedText}
            <span className="animate-bounce text-green">|</span>
          </h1>
          
          <p className="text-text-dark text-xl mb-8 fade-in">
            Complete your registration following the steps in the next screen.
          </p>
          
          <div className="space-y-4 slide-in" style={{ animationDelay: "0.1s" }}>
            <Button onClick={onNext} className="text-lg px-8 py-4">
              <span>Get Started</span>
              <svg className="w-5 h-5 ml-2 inline-block" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
              </svg>
            </Button>
          </div>
        </div>
      </div>
      
      <footer className="p-4 text-center text-text-dark bg-clip-text text-transparent bg-gradient-to-l from-[#FF512F] to-[#DD2476]">
        <p>© 2025</p>
      </footer>
    </div>
  );
};

export default LandingPage;