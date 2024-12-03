"use client";
import React, { useEffect, useState } from "react";
import dynamic from "next/dynamic";

const PersonalInformation = dynamic(
  () => import("./steps/PersonalInformation"),
  { ssr: false }
);
const PositionDetails = dynamic(() => import("./steps/PositionDetails"), {
  ssr: false,
});

const EducationalBackground = dynamic(
  () => import("./steps/EducationalBackground"),
  { ssr: false }
);

const Certifications = dynamic(() => import("./steps/Certifications"), {
  ssr: false,
});

const BackgroundInformation = dynamic(
  () => import("./steps/BackgroundInformation"),
  { ssr: false }
);

const ProfessionalReferences = dynamic(
  () => import("./steps/ProfessionalReferences"),
  { ssr: false }
);

const EmploymentHistorySection = dynamic(
  () => import("./steps/EmploymentHistory"),
  { ssr: false }
);
import { Button } from "@/app/components/ui/button";
import { useToast } from "@/app/components/ui/use-toast";
import {
  Document,
  EmploymentHistory,
  StaffProfile,
  StaffSchoolInfo,
} from "@prisma/client";
import Stepper from "./steps/Stepper";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
  DropdownMenuItem,
} from "@/app/components/ui/dropdown-menu";
import ElectronicSignature from "./steps/ElectroicSignature";
import { useRouter } from "next/navigation";

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
  { name: "Certifications & Licensure", component: Certifications },
  { name: "Background Information", component: BackgroundInformation },
  { name: "Professional References", component: ProfessionalReferences },
  { name: "Employment History", component: EmploymentHistorySection },
  { name: "Electronic Signature", component: ElectronicSignature },
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
  const router = useRouter();
  const isInitialSetup = profile?.profileSetupComplete === true ? false : true;

  // Function to determine if a step is complete
  const isStepComplete = (stepName: string): boolean => {
    // for ACLS certifications we check if any documents has the title of a certification
    const certNames = [
      "BLS Certification",
      "PALS Certification",
      "ACLS Certification",
    ];
    const hasAnyCertification =
      documents.length > 0 &&
      documents.some((doc) => certNames.includes(doc.name));

    // need to do similar check for resume, driverLicense files
    const requiredProfileDocs = [
      "Resume",
      "Social Security Card",
      "Drivers License",
    ];
    const hasRequiredDocs =
      documents.length > 0 &&
      documents.some((doc) => requiredProfileDocs.includes(doc.name));

    switch (stepName) {
      case "Personal Information":
        return profile && profile.firstname && profile.lastname ? true : false;
      case "Position Details":
        return profile && profile.position ? true : false;
      case "Educational Background":
        return profile &&
          staffSchoolInfo &&
          staffSchoolInfo.length > 0 &&
          hasRequiredDocs
          ? true
          : false;
      case "Certifications & Licensure":
        return profile && hasAnyCertification ? true : false;
      case "Background Information":
        return profile && profile.hasConviction !== null ? true : false;
      case "Professional References":
        return profile && profile.references.length > 0 ? true : false;
      case "Employment History":
        return employmentHistory && employmentHistory.length > 0 ? true : false;
      case "Electronic Signature":
        return profile && profile.electronicSignatureDisclaimer ? true : false;
      default:
        return false;
    }
  };

  // Function to find the next incomplete step
  const getNextIncompleteStep = (): number => {
    for (let i = steps.length - 1; i >= 0; i--) {
      if (isStepComplete(steps[i].name)) {
        return i + 1;
      }
    }
    // No step is completed
    return 0;
  };

  useEffect(() => {
    if (isInitialSetup) {
      const nextStep = getNextIncompleteStep();
      setCurrentStep(nextStep);
    }
  }, [isInitialSetup]);

  const CurrentStepComponent = steps[currentStep].component;

  const handleNext = (data: StaffProfile | null) => {
    setFormData((prevData) => {
      if (prevData) {
        return {
          ...prevData,
          ...data,
        };
      }
      return data;
    });
    if (currentStep !== steps.length - 1 && isInitialSetup) {
      setCurrentStep((prev) => Math.min(prev + 1, steps.length - 1));
    }
    if (currentStep === steps.length - 1 && isInitialSetup) {
      setTimeout(() => {
        router.push("/auth/login");
      }, 3000);
    }
  };

  const handleBack = () => {
    setCurrentStep((prev) => Math.max(prev - 1, 0));
  };
  const progressPercentage = (currentStep / steps.length) * 100;

  return (
    <div className="flex flex-col md:flex-row md:w-full md:px-12 justify-center">
      {isInitialSetup && (
        <>
          <div className="w-full md:hidden">
            {/** Progress Bar */}
            <div className="w-full bg-gray-200 h-2 rounded">
              <div
                className="bg-primary h-2 rounded animate-progress"
                style={{ width: `${progressPercentage}%` }}
              ></div>
            </div>
          </div>
          <div className="hidden md:block md:w-1/3">
            <Stepper
              currentStep={currentStep}
              steps={steps.map((step) => step.name)}
            />
          </div>
        </>
      )}
      {!isInitialSetup && (
        <>
          <aside className="-mx-4 lg:w-1/5">
            <nav className="mt-4 hidden md:flex space-x-2 mg:flex-col md:space-x-0 md:space-y-1">
              <ul className="flex flex-col mr-12 w-[300px] space-y-4">
                {steps.map((step, index) => (
                  <>
                    {index < steps.length - 1 && (
                      <li
                        key={index}
                        className={index === currentStep ? "font-bold" : ""}
                      >
                        <button onClick={() => setCurrentStep(index)}>
                          {step.name}
                        </button>
                      </li>
                    )}
                  </>
                ))}
              </ul>
            </nav>
          </aside>
          <div className="md:hidden w-full">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button className="w-full" variant={"outline"}>
                  {steps[currentStep].name}
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent>
                {steps.map((step, index) => (
                  <>
                    {index < steps.length - 1 && (
                      <DropdownMenuItem
                        key={index}
                        onSelect={() => setCurrentStep(index)}
                      >
                        {step.name}
                      </DropdownMenuItem>
                    )}
                  </>
                ))}
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </>
      )}
      <div
        className={`w-full ${
          isInitialSetup ? "md:w-3/4" : "md:w-full"
        } p-4 md:p-0`}
      >
        <CurrentStepComponent
          userId={userId}
          profile={formData}
          onNext={handleNext}
          documents={documents}
          isInitialSetup={isInitialSetup}
          staffSchoolInfo={staffSchoolInfo}
          employmentHistory={employmentHistory}
        />
        {/* {isInitialSetup && (
          <div className="flex justify-between mt-4 md:hidden">
            <Button
              variant="secondary"
              onClick={handleBack}
              disabled={currentStep === 0}
            >
              Previous
            </Button>
            <Button
              variant="default"
              onClick={() => setCurrentStep(currentStep + 1)}
              disabled={currentStep === steps.length - 1}
            >
              Next
            </Button>
          </div>
        )} */}
      </div>
    </div>
  );
};

export default MultiStepForm;
