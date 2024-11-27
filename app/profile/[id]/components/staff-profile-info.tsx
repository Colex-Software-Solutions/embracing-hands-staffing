"use client";
import React, { useState } from "react";
import { Avatar } from "@/app/components/ui/avatar";
import {
  Document,
  EmploymentHistory,
  StaffProfile,
  StaffSchoolInfo,
  User,
} from "@prisma/client";
import { useToast } from "@/app/components/ui/use-toast";

import DocumentsSection from "@/app/staff/[id]/profile/components/DocumentsSection";
import {
  Card,
  CardHeader,
  CardFooter,
  CardTitle,
  CardDescription,
  CardContent,
} from "@/app/components/ui/card";
import { format } from "date-fns";
import { Button } from "@/app/components/ui/button";
import { Input } from "@/app/components/ui/input";
import { EditIcon, SaveIcon } from "lucide-react";
import { z } from "zod";
import axios from "axios";

const phoneSchema = z.object({
  phone: z.string().regex(/^\+?\d{10,15}$/, {
    message:
      "Phone number must be 10 to 15 digits long and can optionally start with a +",
  }),
});

export interface FullStaffProfile extends StaffProfile {
  staffSchoolInfo: StaffSchoolInfo[];
  employmentHistory: EmploymentHistory[];
}
const StaffProfileInfo = ({
  user,
  staffProfile,
  documents,
}: {
  user: User;
  staffProfile: FullStaffProfile;
  documents: Document[];
}) => {
  const {
    firstname,
    lastname,
    profileImage,
    skills,
    about,
    title,
    dateOfBirth,
    address,
    referredBy,
    emergencyContactName,
    emergencyContactPhone,
    position,
    availableStartDate,
    desiredPay,
    employmentDesired,
    hasLicenseIssues,
    licenseIssuesExplanation,
    hasConviction,
    convictionExplanation,
    hasPrisonRecord,
    prisonRecordExplanation,
    hasPendingCriminalCase,
    pendingCriminalCaseExplanation,
    awareOfMalpracticeSuit,
    malpracticeSuitExplanation,
    references,
    employmentHistory,
    staffSchoolInfo,
    electronicSignatureDisclaimer,
    signatureDate,
  } = staffProfile;
  const [isEditingPhone, setIsEditingPhone] = useState(false);
  const [phone, setPhone] = useState(user.phone);
  const [error, setError] = useState<string | null>(null);
  const { toast } = useToast();

  const handleSavePhone = async () => {
    try {
      phoneSchema.parse({ phone });

      const response = await axios.put(`/api/users/${user.id}`, { phone });

      toast({
        variant: "default",
        title: "Phone number updated",
        description: "The phone number was successfully updated.",
      });

      setIsEditingPhone(false);
      setError(null);
    } catch (error) {
      if (error instanceof z.ZodError) {
        setError(error.errors[0].message);
      } else if (axios.isAxiosError(error)) {
        toast({
          variant: "destructive",
          title: "Error updating phone",
          description:
            error.response?.data?.error ||
            "Failed to update phone. Please try again.",
        });
      } else {
        console.error("Unknown error occurred:", error);
        toast({
          variant: "destructive",
          title: "Unknown Error",
          description: "An unknown error occurred. Please try again.",
        });
      }
    }
  };

  return (
    <div className="grid gap-6 lg:grid-cols-3 md:m-12 m-2">
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
              <div className="text-sm font-medium">{user.email}</div>
              {/* <div className="text-sm font-medium">{user.phone}</div> */}
              <div className="flex items-center space-x-2">
                {isEditingPhone ? (
                  <>
                    <div className="flex flex-col">
                      <Input
                        type="tel"
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                        className="w-40"
                        placeholder="Enter phone number"
                      />
                      {error && <p className="text-red-500 text-sm">{error}</p>}
                    </div>
                    <Button
                      size="sm"
                      onClick={handleSavePhone}
                      className="flex items-center"
                    >
                      <SaveIcon className="w-4 h-4 mr-1" />
                      Save
                    </Button>
                  </>
                ) : (
                  <>
                    <span className="text-sm font-medium">
                      {phone || "N/A"}
                    </span>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => setIsEditingPhone(true)}
                      className="flex items-center"
                    >
                      <EditIcon className="w-4 h-4" />
                    </Button>
                  </>
                )}
              </div>
            </div>
          </div>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Professional Summary</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-gray-500 dark:text-gray-400">{about}</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Skills & Specializations</CardTitle>
          </CardHeader>
          <CardContent>
            <ul className="grid gap-4 list-disc list-outside">
              {skills.map((skill) => (
                <li key={skill}>{skill}</li>
              ))}
            </ul>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Personal Information</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
              <div>
                <CardDescription>Date of Birth</CardDescription>
                <p>
                  {dateOfBirth ? format(new Date(dateOfBirth), "PPP") : "N/A"}
                </p>
              </div>
              <div>
                <CardDescription>Address</CardDescription>
                <p>{address || "N/A"}</p>
              </div>
              <div>
                <CardDescription>Referred By</CardDescription>
                <p>{referredBy || "N/A"}</p>
              </div>
              <div>
                <CardDescription>Emergency Contact</CardDescription>
                <p>{emergencyContactName || "N/A"}</p>
              </div>
              <div>
                <CardDescription>Emergency Contact Phone</CardDescription>
                <p>{emergencyContactPhone || "N/A"}</p>
              </div>
              <div>
                <CardDescription>Position</CardDescription>
                <p>{position || "N/A"}</p>
              </div>
              <div>
                <CardDescription>Available Start Date</CardDescription>
                <p>
                  {availableStartDate
                    ? format(new Date(availableStartDate), "PPP")
                    : "N/A"}
                </p>
              </div>
              <div>
                <CardDescription>Desired Pay</CardDescription>
                <p>{desiredPay ? `$${desiredPay.toFixed(2)}` : "N/A"}</p>
              </div>
              <div>
                <CardDescription>Employment Desired</CardDescription>
                <p>{employmentDesired || "N/A"}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Legal Information</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 gap-4">
              <div>
                <CardDescription>Has License Issues</CardDescription>
                <p>{hasLicenseIssues ? "Yes" : "No"}</p>
                {hasLicenseIssues && (
                  <p className="text-gray-500">{licenseIssuesExplanation}</p>
                )}
              </div>
              <div>
                <CardDescription>Has Conviction</CardDescription>
                <p>{hasConviction ? "Yes" : "No"}</p>
                {hasConviction && (
                  <p className="text-gray-500">{convictionExplanation}</p>
                )}
              </div>
              <div>
                <CardDescription>Has Prison Record</CardDescription>
                <p>{hasPrisonRecord ? "Yes" : "No"}</p>
                {hasPrisonRecord && (
                  <p className="text-gray-500">{prisonRecordExplanation}</p>
                )}
              </div>
              <div>
                <CardDescription>Has Pending Criminal Case</CardDescription>
                <p>{hasPendingCriminalCase ? "Yes" : "No"}</p>
                {hasPendingCriminalCase && (
                  <p className="text-gray-500">
                    {pendingCriminalCaseExplanation}
                  </p>
                )}
              </div>
              <div>
                <CardDescription>Aware of Malpractice Suit</CardDescription>
                <p>{awareOfMalpracticeSuit ? "Yes" : "No"}</p>
                {awareOfMalpracticeSuit && (
                  <p className="text-gray-500">{malpracticeSuitExplanation}</p>
                )}
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Employment History</CardTitle>
          </CardHeader>
          <CardContent>
            {employmentHistory.map((job) => (
              <div key={job.id} className="mb-4">
                <p className="font-bold">{job.company}</p>
                <p className="text-gray-500">{job.jobTitle}</p>
                <p className="text-gray-500">
                  {format(new Date(job.employedFrom), "PPP")} -{" "}
                  {job.employedTo
                    ? format(new Date(job.employedTo), "PPP")
                    : "Present"}
                </p>
                <p className="text-gray-500">{job.address}</p>
                <p className="text-gray-500">Supervisor: {job.supervisor}</p>
                <p className="text-gray-500">
                  Pay Rate: ${job.payRate?.toFixed(2)}
                </p>
                <p className="text-gray-500">Phone: {job.phoneNumber}</p>
              </div>
            ))}
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Educational Background</CardTitle>
          </CardHeader>
          <CardContent>
            {staffSchoolInfo.map((school) => (
              <div key={school.id} className="mb-4">
                <p className="font-bold">{school.schoolName}</p>
                <p className="text-gray-500">{school.schoolAddress}</p>
                <p className="text-gray-500">
                  {format(new Date(school.startDate), "PPP")} -{" "}
                  {school.endDate
                    ? format(new Date(school.endDate), "PPP")
                    : "Present"}
                </p>
                <p className="text-gray-500">Degree: {school.degreeReceived}</p>
              </div>
            ))}
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>References</CardTitle>
          </CardHeader>
          <CardContent>
            {references.map((reference, index) => (
              <div
                key={reference.firstname + "-" + `${index}`}
                className="mb-4"
              >
                <p className="font-bold">
                  {reference.firstname} {reference.lastname}
                </p>
                <p className="text-gray-500">{reference.phone}</p>
                <p className="text-gray-500">{reference.address}</p>
              </div>
            ))}
          </CardContent>
        </Card>
      </div>

      <div className="space-y-6 border-t pt-6 grid gap-4">
        <div className="space-y-2">
          <Card>
            <CardHeader>
              <CardTitle>Credentials & Documents</CardTitle>
            </CardHeader>
            <CardContent>
              <DocumentsSection userId={user.id} documents={documents} />
            </CardContent>
          </Card>
        </div>
      </div>
      <Card>
        <CardHeader>
          <CardTitle>Electronic Signature</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {electronicSignatureDisclaimer && (
              <>
                <CardDescription>Signature</CardDescription>
                <img
                  src={electronicSignatureDisclaimer}
                  alt="Electronic Signature"
                  className="border p-2"
                />
              </>
            )}
            <div>
              <CardDescription>Signature Date</CardDescription>
              <p>
                {signatureDate ? format(new Date(signatureDate), "PPP") : "N/A"}
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default StaffProfileInfo;
