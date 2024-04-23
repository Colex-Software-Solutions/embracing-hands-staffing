"use client";
import React from "react";
import { Avatar } from "@/app/components/ui/avatar";
import { Document, StaffProfile, User } from "@prisma/client";
import DocumentsSection from "@/app/staff/[id]/profile/components/DocumentsSection";

const StaffProfileInfo = ({
  user,
  staffProfile,
  documents,
}: {
  user: User;
  staffProfile: StaffProfile;
  documents: Document[];
}) => {
  const { email, phone } = user;
  const { firstname, lastname, profileImage, skills, about, title } =
    staffProfile;
  return (
    <div className="grid gap-6 lg:grid-cols-3 m-12">
      <div className="space-y-6 lg:col-span-2">
        <div className="space-y-2">
          <h1 className="text-3xl font-bold">
            {firstname} {lastname}
          </h1>
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
              <div className="text-md font-semibold">{title}</div>
              <div className="text-sm font-medium">{email}</div>
              <div className="text-sm font-medium">{phone}</div>
            </div>
          </div>
        </div>
        <div className="space-y-6">
          <div className="border-t border-b py-6">
            <div className="space-y-2">
              <h2 className="text-2xl font-bold">Professional Summary</h2>
              <p className="text-gray-500 dark:text-gray-400">{about}</p>
            </div>
          </div>
          <div className="space-y-2">
            <div className="space-y-2">
              <h2 className="text-2xl font-bold">Skills & Specializations</h2>
              <ul className="grid gap-4 list-disc list-outside">
                {skills.map((skill) => (
                  <li key={skill}>{skill}</li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
      <div className="space-y-6 border-t pt-6 grid gap-4">
        <div className="space-y-2">
          <h2 className="text-2xl font-bold">Credentials & Documents</h2>
          <div className="space-y-2">
            <DocumentsSection userId={user.id} documents={documents} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default StaffProfileInfo;
