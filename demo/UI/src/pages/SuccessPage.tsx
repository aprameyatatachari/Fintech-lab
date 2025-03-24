import React, { useEffect, useState } from 'react';
import Button from '../components/Button';

const SuccessPage: React.FC = () => {
  const [showConfetti, setShowConfetti] = useState(true);
  
  useEffect(() => {
    const timer = setTimeout(() => {
      setShowConfetti(false);
    }, 5000);
    
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="min-h-screen flex items-center justify-center px-4 dot-pattern">
      {showConfetti && (
        <div className="fixed top-0 left-0 w-full h-full pointer-events-none">
          {Array.from({ length: 50 }).map((_, i) => {
            const size = Math.random() * 10 + 5;
            const left = Math.random() * 100;
            const animationDuration = Math.random() * 3 + 2;
            const delay = Math.random() * 0.5;
            const color = [
              'bg-primary',
              'bg-purple-500',
              'bg-blue-400',
              'bg-indigo-500',
              'bg-pink-500',
            ][Math.floor(Math.random() * 5)];
            
            return (
              <div
                key={i}
                className={`absolute ${color} rounded-full`}
                style={{
                  width: `${size}px`,
                  height: `${size}px`,
                  left: `${left}%`,
                  top: '-10px',
                  opacity: 0.7,
                  animation: `fall ${animationDuration}s linear ${delay}s infinite`,
                }}
              />
            );
          })}
          
          <style>{`
            @keyframes fall {
              0% {
                transform: translateY(0) rotate(0deg);
                opacity: 0.7;
              }
              100% {
                transform: translateY(100vh) rotate(720deg);
                opacity: 0;
              }
            }
          `}</style>
        </div>
      )}
      
      <div className="text-center max-w-lg mx-auto">
        <div className="mb-8 inline-block">
          <div className="relative w-24 h-24 mx-auto mb-6">
            <div className="absolute inset-0 bg-green-500 rounded-full opacity-20 animate-ping"></div>
            <div className="relative flex items-center justify-center w-24 h-24 bg-green-500 bg-opacity-30 rounded-full">
              <svg 
                className="w-12 h-12 text-green-400" 
                fill="none" 
                stroke="currentColor" 
                viewBox="0 0 24 24" 
                xmlns="http://www.w3.org/2000/svg"
              >
                <path 
                  strokeLinecap="round" 
                  strokeLinejoin="round" 
                  strokeWidth={2} 
                  d="M5 13l4 4L19 7" 
                />
              </svg>
            </div>
          </div>
        </div>
        
        <h1 className="text-4xl font-bold mb-4">Registration Complete!</h1>
        <p className="text-text-dark text-lg mb-8">
          Thank you for completing your registration. Your information has been successfully submitted.
        </p>
        
        <Button 
          onClick={() => window.location.href = '/'}
          className="mx-auto"
        >
          Return to Home
        </Button>
      </div>
    </div>
  );
};

export default SuccessPage;