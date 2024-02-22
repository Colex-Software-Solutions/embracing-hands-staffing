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
  const handleStaffUsersUpdate = (
    id: string,
    status: "APPROVED" | "REJECTED"
  ) => {
    const newStaffUSers = staffUsers.map((staffUser) => {
      if (staffUser.id === id) {
        return { ...staffUser, status };
      }
      return staffUser;
    });

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
