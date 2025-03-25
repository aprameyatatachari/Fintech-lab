import React from 'react';

type ProgressBarProps = {
  currentStep: number;
  totalSteps: number;
  stepTitles?: string[];
};

const ProgressBar: React.FC<ProgressBarProps> = ({ currentStep, totalSteps, stepTitles = [] }) => {
  const progress = Math.round((currentStep / totalSteps) * 100);
  
  return (
    <div className="w-full mb-10">
      <div className="flex justify-between mb-2">
        <span className="text-sm font-medium text-indigo-300">Step {currentStep} of {totalSteps}</span>
        <span className="text-sm font-medium text-indigo-300">{progress}% Complete</span>
      </div>
      
      <div className="relative h-3 w-full bg-gray-800 rounded-full overflow-hidden">
        <div 
          className="h-full bg-gradient-to-r from-indigo-500 to-purple-600 transition-all duration-500 ease-out"
          style={{ width: `${progress}%` }}
        >
          <div className="absolute top-0 right-0 h-full w-24 bg-gradient-to-l from-purple-500 to-transparent opacity-70"></div>
        </div>
      </div>
      
      {stepTitles.length > 0 && (
        <div className="flex justify-between mt-2">
          {stepTitles.map((title, index) => (
            <div 
              key={index} 
              className={`flex flex-col items-center ${index === 0 ? 'items-start' : ''} ${index === stepTitles.length - 1 ? 'items-end' : ''}`}
            >
              <div 
                className={`w-4 h-4 rounded-full ${index + 1 <= currentStep ? 'bg-indigo-500' : 'bg-gray-700'} 
                  ${index + 1 === currentStep ? 'ring-2 ring-indigo-300 ring-opacity-50' : ''}`}
              />
              <span 
                className={`text-xs mt-1 ${index + 1 <= currentStep ? 'text-indigo-300' : 'text-gray-500'}`}
              >
                {title}
              </span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default ProgressBar;