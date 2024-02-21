"use client";
import React, { useState } from "react";
import { DataTable } from "./data-table";
import { columns } from "./columns";
import { Toaster } from "@/app/components/ui/toaster";
import { StaffUser } from "../page";

interface IStaffUserManager {
  initialStaffUsers: StaffUser[];
}
const StaffUserManager = ({ initialStaffUsers }: IStaffUserManager) => {
  const [staffUsers, setStaffUsers] = useState(initialStaffUsers);

  // Function to update a task
  const handleStaffUsersUpdate = (updatedStaffUser: StaffUser) => {
    const newStaffUSers = staffUsers.map((staffUser) =>
      staffUser.id === updatedStaffUser.id ? updatedStaffUser : staffUser
    );
    setStaffUsers(newStaffUSers);
  };

  return (
    <>
      <DataTable data={staffUsers} columns={columns(handleStaffUsersUpdate)} />
      <Toaster />
    </>
  );
};

export default StaffUserManager;
