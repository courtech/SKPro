import React from 'react';
import { CheckCircle, Circle } from 'lucide-react';

interface MultiStepFormProps {
  children: React.ReactNode;
  currentStep: number;
  steps: string[];
  onStepChange: (step: number) => void;
}

const MultiStepForm: React.FC<MultiStepFormProps> = ({
  children,
  currentStep,
  steps,
  onStepChange,
}) => {
  return (
    <div className="flex flex-col md:flex-row gap-6">
      {/* Step Sidebar - Visible on tablet and desktop */}
      <div className="hidden md:block w-64 shrink-0">
        <div className="bg-white border border-gray-200 rounded-md p-5 sticky top-6">
          <h3 className="text-sm font-medium text-gray-500 mb-5">
            Step {currentStep + 1} of {steps.length}
          </h3>
          <div className="space-y-4">
            {steps.map((step, index) => (
              <button
                key={index}
                onClick={() => onStepChange(index)}
                className={`flex items-center w-full text-left ${
                  index === currentStep
                    ? 'text-[#0B51A6] font-medium'
                    : index < currentStep
                    ? 'text-gray-500'
                    : 'text-gray-400'
                } transition-colors focus:outline-none`}
              >
                <div className="mr-3">
                  {index < currentStep ? (
                    <CheckCircle className="h-5 w-5 text-[#0B51A6]" />
                  ) : index === currentStep ? (
                    <div className="h-5 w-5 rounded-full bg-[#0B51A6] text-white flex items-center justify-center text-xs">
                      {index + 1}
                    </div>
                  ) : (
                    <Circle className="h-5 w-5 text-gray-300" />
                  )}
                </div>
                <span>{step}</span>
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Mobile Step Indicator */}
      <div className="block md:hidden mb-4">
        <div className="bg-white border border-gray-200 rounded-md p-4">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-sm font-medium text-gray-500">
              Step {currentStep + 1} of {steps.length}
            </h3>
            <span className="text-sm font-medium text-[#0B51A6]">
              {steps[currentStep]}
            </span>
          </div>
          
          <div className="flex">
            {steps.map((_, index) => (
              <div 
                key={index} 
                className="flex-1 h-1 rounded-full mx-0.5 transition-colors"
                style={{
                  backgroundColor: index <= currentStep ? '#0B51A6' : '#E5E7EB'
                }}
              />
            ))}
          </div>
        </div>
      </div>

      {/* Form Content */}
      <div className="flex-1">
        {children}
        
        {/* Navigation Buttons - Mobile Only */}
        <div className="flex justify-between mt-6 md:hidden">
          <button
            type="button"
            onClick={() => onStepChange(currentStep - 1)}
            disabled={currentStep === 0}
            className={`px-4 py-2 border border-gray-300 rounded-md text-sm font-medium ${
              currentStep === 0
                ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
                : 'bg-white text-gray-700 hover:bg-gray-50'
            }`}
          >
            Previous
          </button>
          
          <button
            type="button"
            onClick={() => onStepChange(currentStep + 1)}
            disabled={currentStep === steps.length - 1}
            className={`px-4 py-2 rounded-md text-sm font-medium ${
              currentStep === steps.length - 1
                ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
                : 'bg-[#0B51A6] text-white hover:bg-blue-700'
            }`}
          >
            Next
          </button>
        </div>
      </div>
    </div>
  );
};

export default MultiStepForm; 