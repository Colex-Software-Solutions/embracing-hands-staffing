import React from "react";
import { Avatar } from "@/app/components/ui/avatar";
import { Label } from "@/app/components/ui/label";
import { FacilityProfile, StaffProfile, User } from "@prisma/client";
import Link from "next/link";
import { Button } from "@/app/components/ui/button";

const FacilityProfileInfo = ({
  user,
  facilityProfile,
}: {
  user: User;
  facilityProfile: FacilityProfile;
}) => {
  const { email, phone } = user;
  const { name, profileImage, description, address, facilityType } =
    facilityProfile;
  return (
    <div className="grid gap-6 lg:grid-cols-3 m-12">
      <div className="space-y-6 lg:col-span-2">
        <div className="space-y-2">
          <h1 className="text-3xl font-bold">{name}</h1>
          <div className="flex items-center space-x-2">
            <Avatar className="w-36 h-36">
              <img
                alt="Avatar"
                className="rounded-full object-cover"
                height="64"
                src={profileImage ?? "/avatar.jpg"}
                style={{
                  aspectRatio: "64/64",
                  objectFit: "cover",
                }}
              />
            </Avatar>
            <div className="space-y-1.5">
              <div className="text-md font-semibold">{facilityType}</div>
              <div className="text-md font-semibold">{address}</div>
              <div className="text-sm font-medium">{email}</div>
              <div className="text-sm font-medium">{phone}</div>
            </div>
          </div>
        </div>
        <div className="space-y-6">
          <div className="border-t border-b py-6">
            <div className="space-y-2">
              <h2 className="text-2xl font-bold">About Us</h2>
              <p className="text-gray-500 dark:text-gray-400">{description}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FacilityProfileInfo;
