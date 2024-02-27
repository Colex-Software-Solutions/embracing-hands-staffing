import React from "react";
import { Avatar } from "@/app/components/ui/avatar";
import { Label } from "@/app/components/ui/label";
import { StaffProfile, User } from "@prisma/client";
import Link from "next/link";
import { Button } from "@/app/components/ui/button";

const StaffProfileInfo = ({
  user,
  staffProfile,
}: {
  user: User;
  staffProfile: StaffProfile;
}) => {
  const { email, phone } = user;
  const { firstname, lastname, profileImage, skills, about, title, resumeUrl } =
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
          <h2 className="text-2xl font-bold">Credentials & Resume</h2>
          <div className="space-y-2">
            <div>
              <Label htmlFor="availability">Current Resume:</Label>

              {resumeUrl && (
                <Link href={resumeUrl} target="_blank">
                  <Button variant={"secondary"}>View Resume</Button>
                </Link>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StaffProfileInfo;
