"use client";
import React, { useState } from "react";
import { DataTable } from "./data-table";
import { columns } from "./columns";
import { Toaster } from "@/app/components/ui/toaster";
import { FacilityUser } from "../page";

interface IFacilityUserManager {
  initialFacilityUsers: FacilityUser[];
}
const FacilityUserManager = ({
  initialFacilityUsers,
}: IFacilityUserManager) => {
  const [FacilityUsers, setFacilityUsers] = useState(initialFacilityUsers);

  // Function to update a facility user
  const handleFacilityUsersUpdate = (
    id: string,
    status: "APPROVED" | "REJECTED"
  ) => {
    const newFacilityUsers = FacilityUsers.map((facilityUser) => {
      if (facilityUser.id === id) {
        return { ...facilityUser, status };
      }
      return facilityUser;
    });

    setFacilityUsers(newFacilityUsers);
  };

  return (
    <>
      <DataTable
        data={FacilityUsers as any[]}
        columns={columns(handleFacilityUsersUpdate)}
      />
      <Toaster />
    </>
  );
};

export default FacilityUserManager;
