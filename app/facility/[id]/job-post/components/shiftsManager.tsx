"use client";
import React, { useState } from "react";
import { Toaster } from "@/app/components/ui/toaster";
import { Shift } from "../../applications/jobPost/[jobPostId]/page";
import ShiftDisplayTabs from "./jobs-display-tabs";
import { useToast } from "@/app/components/ui/use-toast";
import axios from "axios";

interface IShiftsManager {
  initialShifts: Shift[];
  jobPostId: string;
}

const ShiftsManager = ({ initialShifts, jobPostId }: IShiftsManager) => {
  const { toast } = useToast();
  const [shifts, setShifts] = useState<Shift[]>(initialShifts);

  const handleAddShift = (newShift: Shift) => {
    setShifts([...shifts, newShift]);
  };

  const handleDeleteShift = async (shiftId: string) => {
    try {
      const response = await axios.delete(`/api/shift/${shiftId}`);

      if (response.status !== 200) {
        throw new Error(response.data?.message || "Failed to delete shift.");
      }

      setShifts((prevShifts) =>
        prevShifts.filter((shift) => shift.id !== shiftId)
      );

      toast({
        title: "Shift Deleted",
        description: "The shift has been successfully deleted.",
        variant: "default",
      });
    } catch (error: any) {
      toast({
        title: "Error Deleting Shift",
        description: error.response?.data?.message || error.message,
        variant: "destructive",
      });
    }
  };

  return (
    <>
      <ShiftDisplayTabs
        shifts={shifts}
        jobPostId={jobPostId}
        handleAddShift={handleAddShift}
        handleDeleteShift={handleDeleteShift}
      />
      <Toaster />
    </>
  );
};

export default ShiftsManager;
