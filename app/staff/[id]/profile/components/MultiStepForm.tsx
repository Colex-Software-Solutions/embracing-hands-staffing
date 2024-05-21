"use client";
import React, { useState } from "react";
import PersonalInformation from "./steps/PersonalInformation";
import PositionDetails from "./steps/PositionDetails";
import EducationalBackground from "./steps/EducationalBackground";
import Certifications from "./steps/Certifications";
import Licensure from "./steps/Licensure";
import BackgroundInformation from "./steps/BackgroundInformation";
import ProfessionalReferences from "./steps/ProfessionalReferenences";
import EmploymentHistorySection from "./steps/EmploymentHistory";
import { Button } from "@/app/components/ui/button";
import { useToast } from "@/app/components/ui/use-toast";
import {
  Document,
  EmploymentHistory,
  StaffProfile,
  StaffSchoolInfo,
} from "@prisma/client";
import Stepper from "./steps/Stepper";

interface MultiStepFormProps {
  userId: string;
  profile: StaffProfile | null;
  documents: Document[];
  staffSchoolInfo: StaffSchoolInfo[];
  employmentHistory: EmploymentHistory[];
}

export interface StepComponentProps {
  userId: string;
  profile: StaffProfile | null;
  onNext: (data: any) => void;
  documents?: Document[];
  isInitialSetup: boolean;
  staffSchoolInfo: StaffSchoolInfo[];
  employmentHistory: EmploymentHistory[];
}

const steps = [
  { name: "Personal Information", component: PersonalInformation },
  { name: "Position Details", component: PositionDetails },
  { name: "Educational Background", component: EducationalBackground },
  { name: "Certifications", component: Certifications },
  { name: "Licensure", component: Licensure },
  { name: "Background Information", component: BackgroundInformation },
  { name: "Professional References", component: ProfessionalReferences },
  { name: "Employment History", component: EmploymentHistorySection },
];

const MultiStepForm: React.FC<MultiStepFormProps> = ({
  userId,
  profile,
  documents,
  staffSchoolInfo,
  employmentHistory,
}) => {
  const [currentStep, setCurrentStep] = useState<number>(0);
  const [formData, setFormData] = useState<StaffProfile | null>(profile);
  const { toast } = useToast();

  const CurrentStepComponent = steps[currentStep].component;

  const handleNext = (data: StaffProfile) => {
    setFormData((prevData) => {
      if (prevData) {
        return {
          ...prevData,
          ...data,
        };
      }
      return data;
    });
    if (currentStep === steps.length - 1) {
    }
    setCurrentStep((prev) => Math.min(prev + 1, steps.length - 1));
  };

  const handleBack = () => {
    setCurrentStep((prev) => Math.max(prev - 1, 0));
  };

  const isInitialSetup = true;
  const handleStepClick = (stepIndex: number) => {
    setCurrentStep(stepIndex);
  };

  return (
    <div className="flex md:w-full md:px-12 justify-center">
      <div className="w-1/3">
        {isInitialSetup ? (
          <Stepper
            currentStep={currentStep}
            steps={steps.map((step) => step.name)}
            onStepClick={handleStepClick}
          />
        ) : (
          <nav>
            <ul>
              {steps.map((step, index) => (
                <li
                  key={index}
                  className={index === currentStep ? "font-bold" : ""}
                >
                  <button onClick={() => setCurrentStep(index)}>
                    {step.name}
                  </button>
                </li>
              ))}
            </ul>
          </nav>
        )}
      </div>
      <div className="w-3/4">
        <CurrentStepComponent
          userId={userId}
          profile={formData}
          onNext={handleNext}
          documents={documents}
          isInitialSetup={isInitialSetup}
          staffSchoolInfo={staffSchoolInfo}
          employmentHistory={employmentHistory}
        />
      </div>
    </div>
  );
};

export default MultiStepForm;
