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
import { ColumnFilter } from "@tanstack/react-table";
import { mapDataToStaffUsers } from "../../utils";

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

const formatFilters = (filters: ColumnFilter[]): string => {
  const formattedFilters = filters.map((filter) => {
    return {
      [filter.id]: filter.value,
    };
  });

  return JSON.stringify(formattedFilters);
};

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
    increment: boolean = false,
    filters: ColumnFilter[]
  ) => {
    try {
      const params = {
        pageSize,
        page,
        filters: formatFilters(filters),
      };

      const response = await axios.get("/api/admin/staff", {
        params,
      });

      const newStaffUsers = mapDataToStaffUsers(response.data.staffUsers.users);

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
    increment: boolean = false,
    filters: ColumnFilter[] = []
  ) => {
    const maxEntries = pageSize * page;
    const hasMoreEntries = totalCount > staffUsers.length;

    if (staffUsers.length <= maxEntries && hasMoreEntries) {
      fetchStaffUsers(pageSize, page, increment, filters);
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

  const handleStaffUsersDelete = (id: string) => {
    const newStaffUsers = staffUsers.filter(
      (newStaffUser) => newStaffUser.id !== id
    );

    setStaffUsers(newStaffUsers);
  };

  return (
    <>
      <DataTable
        data={staffUsers as any[]}
        columns={columns(handleStaffUsersUpdate, handleStaffUsersDelete)}
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
