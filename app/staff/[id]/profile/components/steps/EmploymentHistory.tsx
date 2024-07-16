"use client";
import React, { useState } from "react";
import { useForm, Controller } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import axios from "axios";
import { useToast } from "@/app/components/ui/use-toast";
import { Label } from "@/app/components/ui/label";
import { Input } from "@/app/components/ui/input";
import { Card, CardContent, CardFooter } from "@/app/components/ui/card";
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
import { EmploymentHistory as EmploymentHistoryType } from "@prisma/client";

export const employmentSchema = z.object({
  company: z.string().min(1, "Company Name is required"),
  jobTitle: z.string().min(1, "Job Title is required"),
  address: z.string().min(1, "Address is required"),
  employedFrom: z.date({
    required_error: "Start Date is required",
    invalid_type_error: "Invalid date format",
  }),
  employedTo: z.date({
    required_error: "End Date is required",
    invalid_type_error: "Invalid date format",
  }),
  supervisor: z.string().min(1, "Supervisor is required"),
  payRate: z.number().optional(),
  phoneNumber: z.string().min(1, "Phone Number is required"),
});

type EmploymentFormValues = z.infer<typeof employmentSchema>;

const EmploymentHistory: React.FC<StepComponentProps> = ({
  userId,
  isInitialSetup,
  profile,
  employmentHistory,
  onNext,
}) => {
  const [employments, setEmployments] = useState<EmploymentHistoryType[]>(
    employmentHistory ?? []
  );
  const form = useForm<EmploymentFormValues>({
    resolver: zodResolver(employmentSchema),
    defaultValues: {
      company: "",
      jobTitle: "",
      address: "",
      employedFrom: new Date(),
      employedTo: new Date(),
      supervisor: "",
      payRate: 0,
      phoneNumber: "",
    },
  });

  const { toast } = useToast();
  const { errors, isSubmitting } = form.formState;

  const addEmployment = async (data: EmploymentFormValues) => {
    try {
      const res = await axios.post(`/api/employment/${profile?.id}`, data);

      setEmployments([...employments, res.data]);
      form.reset();
    } catch (error: any) {
      console.error(error);
      toast({
        title: "Server Side Error",
        description: error?.response?.statusText,
        variant: "destructive",
      });
    }
  };

  const onSubmit = async () => {
    if (employments.length === 0) {
      toast({
        title: "Validation Error",
        description: "At least one employment entry is required.",
        variant: "destructive",
      });
      return;
    }
    if (isInitialSetup) {
      onNext({});
    }

    toast({
      title: "Employment History Updated Successfully",
      variant: "default",
    });
  };

  const handleRemoveEmployment = async (id: string) => {
    try {
      await axios.delete(`/api/employment/${id}`);
      setEmployments(employments.filter((employment) => employment.id !== id));
    } catch (error) {
      console.error(error);
      toast({
        variant: "destructive",
        title: "Failed to remove employement",
      });
    }
  };

  return (
    <Form {...form}>
      <form
        className="w-full max-w-4xl py-4"
        onSubmit={form.handleSubmit(addEmployment)}
      >
        <Card className="py-2">
          <CardContent className="space-y-4">
            <h1 className="text-2xl text-secondary-foreground lg:text-3xl font-bold">
              Employment History{" "}
              <span className="font-semibold">
                (last 7 years of employment)
              </span>
            </h1>
            <div className="grid grid-cols-1 gap-4 w-full">
              {employments.map((employment, index) => (
                <Card
                  key={index}
                  className="relative p-4 flex flex-col space-y-2"
                >
                  <button
                    type="button"
                    className="absolute top-2 right-2 text-red-600"
                    onClick={(e) => {
                      e.stopPropagation();
                      handleRemoveEmployment(employment.id);
                    }}
                  >
                    <TrashIcon type="button" className="h-5 w-5" />
                  </button>
                  <p className="font-bold text-lg">{employment.company}</p>
                  <p className="text-sm text-muted-foreground">
                    {employment.jobTitle}
                  </p>
                  <div className="text-sm">
                    <p>Address: {employment.address}</p>
                    <p>Supervisor: {employment.supervisor}</p>
                    <p>Phone: {employment.phoneNumber}</p>
                    <p>Pay Rate: {employment.payRate}</p>
                    <p>
                      Start Date:{" "}
                      {new Date(employment.employedFrom).toLocaleDateString()}
                    </p>
                    <p>
                      End Date:{" "}
                      {new Date(employment.employedTo).toLocaleDateString()}
                    </p>
                  </div>
                </Card>
              ))}
            </div>
            <FormField
              control={form.control}
              name="company"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Company Name</FormLabel>
                  <FormControl>
                    <Input placeholder="Enter company name" {...field} />
                  </FormControl>
                  {errors.company && (
                    <FormMessage>{errors.company.message}</FormMessage>
                  )}
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="jobTitle"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Job Title</FormLabel>
                  <FormControl>
                    <Input placeholder="Enter job title" {...field} />
                  </FormControl>
                  {errors.jobTitle && (
                    <FormMessage>{errors.jobTitle.message}</FormMessage>
                  )}
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="address"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Address</FormLabel>
                  <FormControl>
                    <Input placeholder="Enter address" {...field} />
                  </FormControl>
                  {errors.address && (
                    <FormMessage>{errors.address.message}</FormMessage>
                  )}
                </FormItem>
              )}
            />
            <Controller
              name="employedFrom"
              control={form.control}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Start Date</FormLabel>
                  <CustomDatePicker
                    selectedDate={field.value}
                    onDateChange={field.onChange}
                    disabled={(date) => date > new Date()}
                  />
                  {errors.employedFrom && (
                    <FormMessage>{errors.employedFrom.message}</FormMessage>
                  )}
                </FormItem>
              )}
            />
            <Controller
              name="employedTo"
              control={form.control}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>End Date</FormLabel>
                  <CustomDatePicker
                    selectedDate={field.value}
                    onDateChange={field.onChange}
                    disabled={(date) => date < form.getValues("employedFrom")}
                  />
                  {errors.employedTo && (
                    <FormMessage>{errors.employedTo.message}</FormMessage>
                  )}
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="supervisor"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Supervisor</FormLabel>
                  <FormControl>
                    <Input placeholder="Enter supervisor's name" {...field} />
                  </FormControl>
                  {errors.supervisor && (
                    <FormMessage>{errors.supervisor.message}</FormMessage>
                  )}
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="payRate"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Pay Rate (optional)</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Enter pay rate"
                      {...field}
                      onChange={(e) => field.onChange(parseInt(e.target.value))}
                    />
                  </FormControl>
                  {errors.payRate && (
                    <FormMessage>{errors.payRate.message}</FormMessage>
                  )}
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="phoneNumber"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Phone Number</FormLabel>
                  <FormControl>
                    <Input placeholder="Enter phone number" {...field} />
                  </FormControl>
                  {errors.phoneNumber && (
                    <FormMessage>{errors.phoneNumber.message}</FormMessage>
                  )}
                </FormItem>
              )}
            />
            <Button type="submit" className="ml-auto">
              Add Employment
            </Button>
          </CardContent>
          <CardFooter>
            <Button
              disabled={isSubmitting}
              type="button"
              className="ml-auto mt-4"
              onClick={onSubmit}
            >
              {isSubmitting && <Loader />} Save Profile
            </Button>
          </CardFooter>
        </Card>
      </form>
    </Form>
  );
};
export default EmploymentHistory;
