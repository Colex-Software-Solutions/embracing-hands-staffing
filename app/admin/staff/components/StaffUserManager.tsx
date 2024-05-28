"use client";
import React, { useState } from "react";
// import { DataTable } from "./data-table";
import {
  DataTable,
  DataTableToolbarInput,
} from "../../../components/data-table/data-table";
import { columns } from "./columns";
import { Toaster } from "@/app/components/ui/toaster";
import { StaffUser } from "../page";

const dataTableToolbarInputs: DataTableToolbarInput[] = [
  {
    placeholder: "Filter by Email",
    column: "email",
  },
  {
    placeholder: "Filter by Phone number",
    column: "phone",
  },
];

interface IStaffUserManager {
  initialStaffUsers: StaffUser[];
}
const StaffUserManager = ({ initialStaffUsers }: IStaffUserManager) => {
  const [staffUsers, setStaffUsers] = useState(initialStaffUsers);

  // Function to update a staff user
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
      <DataTable
        data={staffUsers as any[]}
        columns={columns(handleStaffUsersUpdate)}
        dataTableToolbarInputs={dataTableToolbarInputs}
      />
      <Toaster />
    </>
  );
};

export default StaffUserManager;
