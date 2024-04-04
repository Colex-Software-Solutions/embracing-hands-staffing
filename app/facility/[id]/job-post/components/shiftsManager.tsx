"use client";
import React, { useState } from "react";
import { Toaster } from "@/app/components/ui/toaster";
import { Shift } from "../../applications/jobPost/[jobPostId]/page";
import ShiftDisplayTabs from "./jobs-display-tabs";

interface IShiftsManager {
  initialShifts: Shift[];
  jobPostId: string;
}

const ShiftsManager = ({ initialShifts, jobPostId }: IShiftsManager) => {
  const [shifts, setShifts] = useState<Shift[]>(initialShifts);

  const handleAddShift = (newShift: Shift) => {
    setShifts([...shifts, newShift]);
  };

  return (
    <>
      <ShiftDisplayTabs
        shifts={shifts}
        jobPostId={jobPostId}
        handleAddShift={handleAddShift}
      />
      <Toaster />
    </>
  );
};

export default ShiftsManager;
