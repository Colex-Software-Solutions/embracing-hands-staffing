import { Check } from "lucide-react";
import React from "react";

interface StepperProps {
  currentStep: number;
  steps: string[];
}

const Stepper: React.FC<StepperProps> = ({ currentStep, steps }) => {
  return (
    <div className="flex flex-col items-start space-y-8 relative">
      {steps.map((step, i) => (
        <div key={i} className="flex items-center space-x-4 relative">
          <div
            className={`w-10 h-10 flex items-center justify-center rounded-full font-semibold text-white cursor-pointer transition-colors ${
              i < currentStep
                ? "bg-green-600"
                : currentStep === i
                ? "bg-primary"
                : "bg-gray-500"
            }`}
          >
            {i < currentStep ? <Check size={24} /> : i + 1}
          </div>
          <p
            className={`text-lg ${
              i < currentStep
                ? "text-green-600"
                : currentStep === i
                ? "text-primary"
                : "text-gray-500"
            }`}
          >
            {step}
          </p>
          {i < steps.length - 1 && (
            <div
              className={`absolute left-1 top-10 w-0.5 h-full ${
                i < currentStep
                  ? "bg-green-600"
                  : i === currentStep
                  ? "bg-primary"
                  : "bg-gray-300"
              } transition-colors`}
            ></div>
          )}
        </div>
      ))}
    </div>
  );
};

export default Stepper;
