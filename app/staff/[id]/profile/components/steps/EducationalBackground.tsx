import React, { useState } from "react";
import { useForm, Controller } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { StaffSchoolInfo } from "@prisma/client";
import axios from "axios";
import { useToast } from "@/app/components/ui/use-toast";
import { Label } from "@/app/components/ui/label";
import { Input } from "@/app/components/ui/input";
import {
  CardTitle,
  CardDescription,
  CardHeader,
  CardContent,
  Card,
  CardFooter,
} from "@/app/components/ui/card";
import { Button } from "@/app/components/ui/button";
import {
  Form,
  FormControl,
  FormLabel,
  FormMessage,
  FormField,
  FormItem,
} from "@/app/components/ui/form";
import { Loader, TrashIcon } from "lucide-react";

import CustomDatePicker from "../DatePicker";
import { StepComponentProps } from "../MultiStepForm";
import { Alert } from "@/app/components/ui/alert";

const educationSchema = z.object({
  schoolName: z.string().min(1, "School Name is required"),
  schoolAddress: z.string().min(1, "School Address is required"),
  startDate: z.date({
    required_error: "Start Date is required",
    invalid_type_error: "Invalid date format",
  }),
  endDate: z.date({
    required_error: "End Date is required",
    invalid_type_error: "Invalid date format",
  }),
  degreeReceived: z.string().min(1, "Degree Received is required"),
});

type EducationFormValues = z.infer<typeof educationSchema>;

const EducationalBackground: React.FC<StepComponentProps> = ({
  userId,
  isInitialSetup,
  profile,
  staffSchoolInfo,
  onNext,
}) => {
  const [educations, setEducations] =
    useState<StaffSchoolInfo[]>(staffSchoolInfo);
  const [resumeFile, setResumeFile] = useState<File | null>(null);
  const [socialSecurityCardFile, setSocialSecurityCardFile] =
    useState<File | null>(null);
  const [driversLicenseFile, setDriversLicenseFile] = useState<File | null>(
    null
  );
  const [fileErrors, setFileErrors] = useState<{
    [key: string]: string | null;
  }>({});
  const [loading, setLoading] = useState(false);
  const form = useForm<EducationFormValues>({
    resolver: zodResolver(educationSchema),
    defaultValues: {
      schoolName: "",
      schoolAddress: "",
      startDate: new Date(),
      endDate: new Date(),
      degreeReceived: "",
    },
  });

  const { toast } = useToast();
  const { errors, isSubmitting } = form.formState;

  const addEducation = async (data: EducationFormValues) => {
    try {
      const res = await axios.post(`/api/education/${profile?.id}`, data, {
        headers: {
          "Content-Type": "application/json",
        },
      });

      setEducations([...educations, res.data]);
      form.reset();
    } catch (error: any) {
      console.error(error);
      toast({
        title: "Failed to update education information",
        description: error?.response?.statusText,
        variant: "destructive",
      });
    }
  };

  const validateFiles = () => {
    const newFileErrors: { [key: string]: string | null } = {};
    if (!resumeFile) newFileErrors.resume = "Resume is required";
    if (!socialSecurityCardFile)
      newFileErrors.socialSecurityCard = "Social Security Card is required";
    if (!driversLicenseFile)
      newFileErrors.driversLicense = "Driver's License is required";
    setFileErrors(newFileErrors);

    return Object.values(newFileErrors).every((error) => error === null);
  };
  const uploadFiles = async () => {
    const fileUploadPromises = [
      "Resume",
      "Social Security Card",
      "Drivers License",
    ].map((fileType, index) => {
      const formData = new FormData();
      const file = [resumeFile, socialSecurityCardFile, driversLicenseFile][
        index
      ];
      formData.append("documentFile", file!);
      formData.append("userId", userId);
      formData.append("name", fileType);

      return axios.post(`/api/document`, formData);
    });

    await Promise.all(fileUploadPromises);
  };

  const onSubmit = async () => {
    setLoading(true);
    try {
      if (educations.length === 0) {
        toast({
          title: "Validation Error",
          description: "At least one education entry is required.",
          variant: "destructive",
        });
        setLoading(false);
        return;
      }
      if (isInitialSetup) {
        if (!validateFiles()) {
          setLoading(false);
          return;
        }
        await uploadFiles();
      }

      toast({
        title: "Educational Background Updated Successfully",
        variant: "default",
      });
      onNext({});
    } catch (error: any) {
      console.error(error);
      toast({
        title: "Server Side Error",
        description: error?.response?.statusText,
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const handleRemoveEducation = async (id: string) => {
    try {
      await axios.delete(`/api/education/${id}`);
      setEducations(educations.filter((education) => education.id !== id));
    } catch (error) {
      console.error(error);
      toast({
        variant: "destructive",
        title: "Failed to remove education",
      });
    }
  };

  return (
    <>
      <Card className="py-2">
        <CardContent className="space-y-4">
          <h1 className="text-2xl text-secondary-foreground lg:text-3xl font-bold">
            Educational Background
          </h1>
          <div className="grid grid-cols-1  gap-4 w-full">
            {educations.map((education, index) => (
              <Card
                key={index}
                className="relative p-4 flex flex-col space-y-2"
              >
                <button
                  type="button"
                  className="absolute top-2 right-2 text-red-600"
                  onClick={(e) => {
                    e.stopPropagation();
                    handleRemoveEducation(education.id);
                  }}
                >
                  <TrashIcon className="h-5 w-5" />
                </button>
                <p className="font-bold text-lg">{education.schoolName}</p>
                <p className="text-sm text-muted-foreground">
                  {education.schoolAddress}
                </p>
                <div className="text-sm">
                  <p>
                    Start Date:{" "}
                    {new Date(education.startDate).toLocaleDateString()}
                  </p>
                  <p>
                    End Date: {new Date(education.endDate).toLocaleDateString()}
                  </p>
                </div>
                <p className="font-medium">{education.degreeReceived}</p>
              </Card>
            ))}
          </div>
          <Form {...form}>
            <form
              className="w-full max-w-4xl py-4"
              onSubmit={form.handleSubmit(addEducation)}
            >
              <FormField
                control={form.control}
                name="schoolName"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>School Name</FormLabel>
                    <FormControl>
                      <Input placeholder="Enter your school name" {...field} />
                    </FormControl>
                    {errors.schoolName && (
                      <FormMessage>{errors.schoolName.message}</FormMessage>
                    )}
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="schoolAddress"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>School Address</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="Enter your school address"
                        {...field}
                      />
                    </FormControl>
                    {errors.schoolAddress && (
                      <FormMessage>{errors.schoolAddress.message}</FormMessage>
                    )}
                  </FormItem>
                )}
              />
              <Controller
                name="startDate"
                control={form.control}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Start Date</FormLabel>
                    <CustomDatePicker
                      selectedDate={field.value}
                      onDateChange={field.onChange}
                      disabled={(date) => date > new Date()}
                    />
                    {errors.startDate && (
                      <FormMessage>{errors.startDate.message}</FormMessage>
                    )}
                  </FormItem>
                )}
              />
              <Controller
                name="endDate"
                control={form.control}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>End Date</FormLabel>
                    <CustomDatePicker
                      selectedDate={field.value}
                      onDateChange={field.onChange}
                      disabled={(date) => date < form.getValues("startDate")}
                    />
                    {errors.endDate && (
                      <FormMessage>{errors.endDate.message}</FormMessage>
                    )}
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="degreeReceived"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Degree Received</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="Enter your degree received"
                        {...field}
                      />
                    </FormControl>
                    {errors.degreeReceived && (
                      <FormMessage>{errors.degreeReceived.message}</FormMessage>
                    )}
                  </FormItem>
                )}
              />
              <Button type="submit" className="ml-auto mt-10">
                Add Education
              </Button>
            </form>
          </Form>
        </CardContent>
        {isInitialSetup && (
          <div className="w-full px-6">
            <Label htmlFor="resume">Upload Resume</Label>
            <Input
              type="file"
              accept="application/pdf"
              onChange={(e) => setResumeFile(e.target.files?.[0] || null)}
            />
            {fileErrors.resume && (
              <p className="text-red-500">{fileErrors.resume}</p>
            )}

            <Label htmlFor="socialSecurityCard">
              Upload Social Security Card
            </Label>
            <Input
              type="file"
              onChange={(e) =>
                setSocialSecurityCardFile(e.target.files?.[0] || null)
              }
            />
            {fileErrors.socialSecurityCard && (
              <p className="text-red-500">{fileErrors.socialSecurityCard}</p>
            )}

            <Label htmlFor="driversLicense">Upload Driver's License</Label>
            <Input
              type="file"
              onChange={(e) =>
                setDriversLicenseFile(e.target.files?.[0] || null)
              }
            />
            {fileErrors.driversLicense && (
              <p className="text-red-500">{fileErrors.driversLicense}</p>
            )}
          </div>
        )}
        <CardFooter>
          <Button
            type="button"
            className="ml-auto mt-4"
            onClick={(e) => {
              e.stopPropagation();
              onSubmit();
            }}
          >
            {loading && <Loader />}{" "}
            {isInitialSetup ? "Save and Next Step" : "Save"}
          </Button>
        </CardFooter>
      </Card>
    </>
  );
};

export default EducationalBackground;
