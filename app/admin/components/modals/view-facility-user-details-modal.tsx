import React from "react";
import { Button } from "../../../components/ui/button";
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
import { FacilityUser } from "../../facility/page";
import Link from "next/link";

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
            <Link href={`/profile/${id}`}>
              {" "}
              <Button type="button" variant={"ghost"}>
                View Full Profile
              </Button>
            </Link>
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
