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
import { StaffUser } from "../../staff/page";

// interface ViewStaffUserDetailsModalProps<TData> {
//   row: Row<TData>;
// }

const getStaffUserInfoFromRow = (row: any): StaffUser => {
  const id = row.getValue("id");
  const firstName = row.getValue("firstName");
  const lastName = row.getValue("lastName");
  const email = row.getValue("email");
  const phone = row.getValue("phone");
  const status = row.getValue("status");

  return {
    id,
    firstName,
    lastName,
    email,
    phone,
    status,
  };
};

export function DeclineStatusModal({ row }: any) {
  const { firstName, lastName, email, id, phone, status } =
    getStaffUserInfoFromRow(row);

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button
          className="w-full border-0 justify-start flex pl-2 font-normal hover:bg-red-600 hover:text-white"
          variant="outline"
        >
          Reject
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <div>
          <DialogHeader>
            <DialogTitle>Do you wish to reject this application?</DialogTitle>
          </DialogHeader>
          <div className="flex justify-center gap-5 my-5">
            <DialogClose asChild>
              <Button type="button" variant="secondary">
                Cancel
              </Button>
            </DialogClose>
            <DialogClose asChild>
              <Button
                type="button"
                variant="default"
                className="bg-red-600 hover:bg-red-400"
              >
                Yes, Reject
              </Button>
            </DialogClose>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
