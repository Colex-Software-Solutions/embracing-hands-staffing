"use client";
import React, { Dispatch, SetStateAction, useState } from "react";
import {
  CardTitle,
  CardHeader,
  CardFooter,
  CardContent,
  Card,
} from "@/app/components/ui/card";
import { Label } from "@/app/components/ui/label";
import { Input } from "@/app/components/ui/input";
import { Textarea } from "@/app/components/ui/textarea";
import { Button } from "@/app/components/ui/button";
import { Switch } from "@/app/components/ui/switch";
import { useForm, Controller } from "react-hook-form";
import {
  Form,
  FormControl,
  FormLabel,
  FormMessage,
  FormField,
  FormItem,
} from "@/app/components/ui/form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Loader, XIcon } from "lucide-react";
import { useToast } from "@/app/components/ui/use-toast";
import { useSession } from "next-auth/react";
import { JobPost } from "@prisma/client";
import { SkillsCombobox } from "@/app/components/combobox/skills-combobox";
import StaffCombobox from "./staff-combobox";
import hours from "../data/hours.json";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/app/components/ui/select";
import { combineDateAndTime } from "@/lib/utils";
import { Shift } from "../../applications/jobPost/[jobPostId]/page";
import useStaff from "@/lib/hooks/useStaff";

const now = new Date();

const CreateShiftSchema = z
  .object({
    staff: z.string().min(1, "Please select a staff"),
    startDate: z.string(),
    endDate: z.string(),
    startHour: z.string().min(1, "Please select a valid time"),
    endHour: z.string().min(1, "Please select a valid time"),
  })
  .refine(
    (data) => new Date(data.startDate).getTime() >= new Date().getTime(),
    {
      message: "Please select a valid start date",
      path: ["startDate"],
    }
  )
  .refine(
    (data) =>
      new Date(data.startDate).getTime() <= new Date(data.endDate).getTime(),
    {
      message: "Please select a valid end date",
      path: ["endDate"],
    }
  );
type CreateShiftFormValues = z.infer<typeof CreateShiftSchema>;

interface ICreateShiftForm {
  currentJob?: JobPost;
  handleJobPostUpdate?: (newJob: JobPost) => void;
  jobPostId: string;
  setOpenModal: Dispatch<SetStateAction<boolean>>;
  handleAddShift: (newShift: Shift) => void;
}

const CreateShiftForm = ({
  currentJob,
  handleJobPostUpdate,
  jobPostId,
  setOpenModal,
  handleAddShift,
}: ICreateShiftForm) => {
  const { fetchStaffProfilesByJobPostId, staffProfiles } = useStaff("");

  React.useEffect(() => {
    fetchStaffProfilesByJobPostId(jobPostId);
  }, []);

  const defaultValues: Partial<CreateShiftFormValues> = {
    staff: "",
    startDate: new Date().toISOString().slice(0, 10),
    endDate: new Date().toISOString().slice(0, 10),
    startHour: "",
    endHour: "",
  };
  const form = useForm<CreateShiftFormValues>({
    resolver: zodResolver(CreateShiftSchema),
    defaultValues,
  });

  const [procedures, setProcedures] = useState<string[]>(
    currentJob?.procedures || []
  );

  const { data: session } = useSession();
  const { toast } = useToast();

  const onSubmit = async (data: CreateShiftFormValues) => {
    try {
      if (!session?.user.facilityProfile) {
        throw new Error("Please complete your profile before posting a job");
      }
      if (session?.user.status !== "APPROVED") {
        throw new Error("Please wait until your account is approved");
      }

      const start = combineDateAndTime(
        data.startDate,
        hours[Number(data.startHour)].hour
      );
      const end = combineDateAndTime(
        data.endDate,
        hours[Number(data.endHour)].hour
      );

      const requestBody = {
        start,
        end,
        jobPostId,
        staffProfileId: data.staff,
      };

      const response = await fetch("/api/shift", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(requestBody),
      });

      if (!response.ok) {
        throw new Error(`Error: ${response.statusText}`);
      }
      const shift = (await response.json()).shift;

      const staffProfile = staffProfiles.find(
        (profile) => profile.id === data.staff
      );

      if (!staffProfile) {
        toast({
          title: "Error!",
          description: "Failed to update table. Please refresh page.",
          variant: "destructive",
        });
        setOpenModal(false);

        return;
      }

      handleAddShift({
        ...shift,
        staffName: `${staffProfile.firstname} ${staffProfile.lastname}`,
      });

      toast({
        title: "Success!",
        description: "New shift has been successfully created",
        variant: "default",
      });

      setOpenModal(false);
    } catch (error: any) {
      toast({
        title: "Error!",
        description: "Failed to create job post: " + error.message,
        variant: "destructive",
      });
      console.error("Failed to create job post", error);
    }
  };

  const { errors, isSubmitting } = form.formState;

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)}>
        <Card className="max-w-xl">
          <CardContent>
            <div className="flex flex-col gap-5">
              <div>
                <FormField
                  control={form.control}
                  name="staff"
                  render={({ field }) => (
                    <FormItem className="flex gap-5 items-center">
                      <FormLabel>Assign Staff</FormLabel>
                      <FormControl>
                        <StaffCombobox
                          value={field.value}
                          onChange={field.onChange}
                          staffProfiles={staffProfiles}
                        />
                      </FormControl>
                      {errors.staff && (
                        <FormMessage>{errors.staff.message}</FormMessage>
                      )}
                    </FormItem>
                  )}
                />
              </div>

              <div className="flex justify-between">
                <div>
                  <FormField
                    control={form.control}
                    name="startDate"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Start Date</FormLabel>
                        <FormControl>
                          <Input
                            min={new Date().toISOString().slice(0, 10)}
                            id="startDate"
                            type="date"
                            {...field}
                          />
                        </FormControl>
                        {errors.startDate && (
                          <FormMessage>{errors.startDate.message}</FormMessage>
                        )}
                      </FormItem>
                    )}
                  />
                </div>
                <div>
                  <FormField
                    control={form.control}
                    name="startHour"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Start Time</FormLabel>
                        <FormControl>
                          <Select
                            onValueChange={(value) => field.onChange(value)}
                            value={field.value}
                          >
                            <SelectTrigger className="w-[180px]">
                              <SelectValue placeholder="Select Hour" />
                            </SelectTrigger>
                            <SelectContent>
                              {hours.map((hour) => (
                                <SelectItem
                                  key={hour.id}
                                  value={hour.id.toString()}
                                >
                                  {hour.hour}
                                </SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                        </FormControl>
                        {errors.startDate && (
                          <FormMessage>{errors.startDate.message}</FormMessage>
                        )}
                      </FormItem>
                    )}
                  />
                </div>
              </div>
              <div className="flex justify-between">
                <div>
                  <FormField
                    control={form.control}
                    name="endDate"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>End Date</FormLabel>
                        <FormControl>
                          <Input
                            min={new Date().toISOString().slice(0, 10)}
                            id="endDate"
                            type="date"
                            {...field}
                          />
                        </FormControl>
                        {errors.endDate && (
                          <FormMessage>{errors.endDate.message}</FormMessage>
                        )}
                      </FormItem>
                    )}
                  />
                </div>
                <div>
                  <FormField
                    control={form.control}
                    name="endHour"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>End Time</FormLabel>
                        <FormControl>
                          <Select
                            onValueChange={(value) => field.onChange(value)}
                            value={field.value}
                          >
                            <SelectTrigger className="w-[180px]">
                              <SelectValue placeholder="Select Hour" />
                            </SelectTrigger>
                            <SelectContent>
                              {hours.map((hour) => (
                                <SelectItem
                                  key={hour.id}
                                  value={hour.id.toString()}
                                >
                                  {hour.hour}
                                </SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                        </FormControl>
                        {errors.startDate && (
                          <FormMessage>{errors.startDate.message}</FormMessage>
                        )}
                      </FormItem>
                    )}
                  />
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
        <div className="flex justify-end">
          <Button
            disabled={isSubmitting}
            type="submit"
            className="ml-auto mt-5"
          >
            {isSubmitting && <Loader className="animate-spin" />}{" "}
            {currentJob ? "Save Changes" : "Post Job"}
          </Button>
        </div>
      </form>
    </Form>
  );
};

export default CreateShiftForm;
