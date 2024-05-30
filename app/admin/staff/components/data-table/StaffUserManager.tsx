"use client";
import React, { useState } from "react";
import {
  DataTable,
  DataTableToolbarInput,
  DataTableToolbarOption,
} from "../../../../components/data-table/data-table";
import { columns } from "./columns";
import { Toaster } from "@/app/components/ui/toaster";
import { StaffUser } from "../../page";
import { statuses } from "../../data/data";
import axios from "axios";

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

const dataTableToolbarOutputs: DataTableToolbarOption[] = [
  {
    column: "status",
    options: statuses,
  },
];

interface IStaffUserManager {
  initialStaffUsers: StaffUser[];
  totalCount: number;
}
const StaffUserManager = ({
  initialStaffUsers,
  totalCount,
}: IStaffUserManager) => {
  const [staffUsers, setStaffUsers] = useState(initialStaffUsers);

  const fetchStaffUsers = async (
    pageSize: number,
    page: number,
    increment: boolean = false
  ) => {
    try {
      const params = {
        pageSize,
        page,
      };

      const response = await axios.get("/api/staff", {
        params,
      });

      const newStaffUsers = response.data.staffUsers.users;

      if (increment) {
        setStaffUsers((prev) => [...prev, ...newStaffUsers]);
      } else {
        setStaffUsers(newStaffUsers);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handlePagination = (
    pageSize: number,
    page: number,
    increment: boolean = false
  ) => {
    const maxEntries = pageSize * page;
    const hasMoreEntries = totalCount > staffUsers.length;

    if (staffUsers.length <= maxEntries && hasMoreEntries) {
      fetchStaffUsers(pageSize, page, increment);
    }
  };

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
        dataTableToolbarOptions={dataTableToolbarOutputs}
        totalCount={totalCount}
        handlePagination={handlePagination}
      />
      <Toaster />
    </>
  );
};

export default StaffUserManager;
