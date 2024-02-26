import React, { useState } from "react";
import { Task } from "../../tasks/data/schema";
import { Button } from "../../../components/ui/button";
import { labels, priorities, statuses } from "../../tasks/data/data";
import { useToast } from "../../../components/ui/use-toast";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogClose,
} from "../../../components/ui/dialog";
import { Label } from "../../../components/ui/label";
import { Textarea } from "../../../components/ui/textarea";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
} from "../../../components/ui/dropdown-menu";
import { Row } from "@tanstack/react-table";
import { FacilityUser } from "../../facility/page";

// interface ViewStaffUserDetailsModalProps<TData> {
//   row: Row<TData>;
// }

const getStaffUserInfoFromRow = (row: any): FacilityUser => {
  const id = row.getValue("id");
  const name = row.getValue("name");
  const address = row.getValue("address");
  const email = row.getValue("email");
  const phone = row.getValue("phone");
  const status = row.getValue("status");

  return {
    id,
    name,
    address,
    description: "",
    facilityType: "",
    email,
    phone,
    status,
  };
};

export function ViewFacilityUserDetailsModal({ row }: any) {
  const { name, address, description, facilityType, email, id, phone, status } =
    getStaffUserInfoFromRow(row);

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button
          className="w-full border-0 justify-start flex pl-2 font-normal"
          variant="outline"
        >
          View Details
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <div>
          <DialogHeader>
            <DialogTitle>Facility User Details</DialogTitle>
            <DialogDescription>ID: {id}</DialogDescription>
          </DialogHeader>
          <div className="flex flex-col gap-5 my-10">
            <div className="flex">
              <div>Name: {name}</div>
            </div>
            <div className="flex">
              <div>Address: {address}</div>
            </div>
            <div className="flex">
              <div>
                Facility Type: {facilityType === "" ? facilityType : "N/A"}
              </div>
            </div>
            <div className="flex">
              <div>Description: {description === "" ? description : "N/A"}</div>
            </div>
            <div className="flex">
              <div>Email: {email}</div>
            </div>
            <div className="flex">
              <div>Phone: {phone}</div>
            </div>
            <div className="flex">
              <div>Status: {status}</div>
            </div>
          </div>
          <DialogFooter>
            <DialogClose asChild>
              <Button type="button" variant="secondary">
                Close
              </Button>
            </DialogClose>
          </DialogFooter>
        </div>
      </DialogContent>
    </Dialog>
  );
}
