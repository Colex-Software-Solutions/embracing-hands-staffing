"use client";
import React, { useState } from "react";
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
import { useForm } from "react-hook-form";
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

const jobPostingSchema = z
  .object({
    title: z.string().min(1, "Title is required"),
    description: z.string().min(1, "Description is required"),
    parkingPay: z.coerce.number().optional(),
    scrubsProvided: z.boolean(),
    experience: z.string().min(5, "Experience description is required"),
    location: z.string().optional(),
    shifts: z.string().min(5, "Shifts description is required"),
    startDate: z.string(),
    endDate: z.string(),
    housing: z.string().optional(),
    patientPopulation: z.string().optional(),
    mie: z.coerce.number().optional(),
    bonus: z.coerce.number().optional(),
    paymentPerDay: z.coerce.number().min(1, "Payment per day is required"),
  })
  .refine((data) => new Date(data.startDate).getTime() > new Date().getTime(), {
    message: "Start date must be after today",
    path: ["startDate"],
  })
  .refine(
    (data) =>
      new Date(data.startDate).getTime() < new Date(data.endDate).getTime(),
    {
      message: "End date must be after start date",
      path: ["endDate"],
    }
  );
type JobPostingFormValues = z.infer<typeof jobPostingSchema>;

const JobPostingForm = () => {
  const defaultValues: Partial<JobPostingFormValues> = {
    title: "",
    description: "",
    parkingPay: 0,
    scrubsProvided: false,
    experience: "",
    location: "",
    shifts: "",
    startDate: "",
    endDate: "",
    housing: "",
    patientPopulation: "",
    mie: 0,
    bonus: 0,
    paymentPerDay: 0,
  };
  const form = useForm<JobPostingFormValues>({
    resolver: zodResolver(jobPostingSchema),
    defaultValues,
  });

  const [procedures, setProcedures] = useState<string[]>([]);
  const [procedureInput, setProcedureInput] = useState("");
  const { data: session } = useSession();
  const [tags, setTags] = useState<string[]>([]);
  const [tagsInput, setTagsInput] = useState("");
  const { toast } = useToast();
  const handleAddTag = () => {
    if (tagsInput && !tags.includes(tagsInput)) {
      setTags([...tags, tagsInput]);
      setTagsInput("");
    }
  };

  const handleAddProcedure = () => {
    console.log("here");
    if (procedureInput && !procedures.includes(procedureInput)) {
      setProcedures([...procedures, procedureInput]);
      setProcedureInput("");
    }
  };

  const onSubmit = async (data: JobPostingFormValues) => {
    try {
      if (!session?.user.facilityProfile) {
        throw new Error("Please complete your profile before posting a job");
      }
      if (session?.user.status !== "APPROVED") {
        throw new Error("Please wait until your account is approved");
      }
      const requestBody = {
        ...data,
        startDate: new Date(data.startDate).toISOString(),
        endDate: new Date(data.endDate).toISOString(),
        procedures,
        tags,
        facilityId: session.user.facilityProfile.id,
      };
      const response = await fetch("/api/job-post", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(requestBody),
      });

      if (!response.ok) {
        throw new Error(`Error: ${response.statusText}`);
      }
      await response.json();
      toast({
        title: "Success!",
        description: "The new job add has been posted successfully",
        variant: "default",
      });
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
        <Card className="w-full max-w-screen-xl mx-auto">
          <CardHeader>
            <CardTitle>Job Posting Form</CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
              <div className="space-y-4">
                <FormField
                  control={form.control}
                  name="title"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Title</FormLabel>
                      <FormControl>
                        <Input placeholder="Enter Title" {...field} />
                      </FormControl>
                      {errors.title && (
                        <FormMessage>{errors.title.message}</FormMessage>
                      )}
                    </FormItem>
                  )}
                />
              </div>
              <div className="space-y-4">
                <FormField
                  control={form.control}
                  name="description"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Description</FormLabel>
                      <FormControl>
                        <Textarea
                          id="description"
                          placeholder="Enter job description"
                          {...field}
                        />
                      </FormControl>
                      {errors.description && (
                        <FormMessage>{errors.description.message}</FormMessage>
                      )}
                    </FormItem>
                  )}
                />
              </div>
              <div className="space-y-4">
                <FormField
                  control={form.control}
                  name="parkingPay"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Parking Pay</FormLabel>
                      <FormControl>
                        <Input
                          id="parkingPay"
                          placeholder="Enter parking pay"
                          step="0.01"
                          type="number"
                          {...field}
                        />
                      </FormControl>
                      {errors.parkingPay && (
                        <FormMessage>{errors.parkingPay.message}</FormMessage>
                      )}
                    </FormItem>
                  )}
                />
              </div>
              <div className="space-y-4">
                <FormField
                  control={form.control}
                  name="scrubsProvided"
                  render={({ field: { value, onChange, onBlur, ref } }) => (
                    <FormItem>
                      <FormLabel>Scrubs Provided</FormLabel>
                      <FormControl>
                        <Switch
                          id="scrubsProvided"
                          checked={value}
                          onChange={onChange}
                          onBlur={onBlur}
                          ref={ref}
                        />
                      </FormControl>
                      {errors.scrubsProvided && (
                        <FormMessage>
                          {errors.scrubsProvided.message}
                        </FormMessage>
                      )}
                    </FormItem>
                  )}
                />
              </div>
              <div className="space-y-4">
                <FormField
                  control={form.control}
                  name="experience"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Experience</FormLabel>
                      <FormControl>
                        <Input
                          id="experience"
                          placeholder="Enter required experience"
                          {...field}
                        />
                      </FormControl>
                      {errors.experience && (
                        <FormMessage>{errors.experience.message}</FormMessage>
                      )}
                    </FormItem>
                  )}
                />
              </div>
              <div className="space-y-4">
                <FormField
                  control={form.control}
                  name="location"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>
                        Location{" "}
                        <span className="text-sm font-thin">(optional)</span>
                      </FormLabel>
                      <FormControl>
                        <Input
                          id="location"
                          placeholder="Enter job location if different from facility location"
                          {...field}
                        />
                      </FormControl>
                    </FormItem>
                  )}
                />
              </div>
              <div className="space-y-4">
                <FormField
                  control={form.control}
                  name="shifts"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Shifts</FormLabel>
                      <FormControl>
                        <Input
                          id="shifts"
                          placeholder="Enter shift details"
                          {...field}
                        />
                      </FormControl>
                      {errors.shifts && (
                        <FormMessage>{errors.shifts.message}</FormMessage>
                      )}
                    </FormItem>
                  )}
                />
              </div>
              <div className="space-y-4">
                <FormField
                  control={form.control}
                  name="housing"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Housing</FormLabel>
                      <FormControl>
                        <Input
                          id="housing"
                          placeholder="Enter housing details"
                          {...field}
                        />
                      </FormControl>
                    </FormItem>
                  )}
                />
              </div>
              <div className="space-y-4">
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
              <div className="space-y-4">
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

              <div className="space-y-4">
                <Label>Procedures</Label>
                <div className="flex">
                  <Input
                    id="procedures"
                    placeholder="Enter 
                procedures"
                    value={procedureInput}
                    onChange={(e) => setProcedureInput(e.target.value)}
                  />
                  <Button
                    type="button"
                    disabled={procedureInput.length === 0}
                    onClick={handleAddProcedure}
                  >
                    Add
                  </Button>
                </div>

                <div className="flex flex-wrap items-center gap-2">
                  {procedures.map((procedure, index) => (
                    <div
                      className="bg-gray-100  rounded-full px-3 py-1 flex items-center"
                      key={index}
                    >
                      {procedure}
                      <Button
                        className="ml-2 focus:outline-none"
                        type="button"
                        variant={"ghost"}
                        onClick={() =>
                          setProcedures(
                            procedures.filter((s) => s !== procedure)
                          )
                        }
                      >
                        <XIcon />
                      </Button>
                    </div>
                  ))}
                </div>
              </div>
              <div className="space-y-4">
                <FormField
                  control={form.control}
                  name="patientPopulation"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Patient Population</FormLabel>
                      <FormControl>
                        <Input
                          placeholder="Enter patient population"
                          {...field}
                        />
                      </FormControl>
                      {errors.patientPopulation && (
                        <FormMessage>
                          {errors.patientPopulation.message}
                        </FormMessage>
                      )}
                    </FormItem>
                  )}
                />
              </div>
              <div className="space-y-4">
                <FormField
                  control={form.control}
                  name="mie"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>MIE</FormLabel>
                      <FormControl>
                        <Input
                          type="number"
                          step="0.01"
                          placeholder="Enter MIE payment"
                          {...field}
                        />
                      </FormControl>
                      {errors.mie && (
                        <FormMessage>{errors.mie.message}</FormMessage>
                      )}
                    </FormItem>
                  )}
                />
              </div>
              <div className="space-y-4">
                <FormField
                  control={form.control}
                  name="bonus"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Bonus</FormLabel>
                      <FormControl>
                        <Input
                          type="number"
                          step="0.01"
                          placeholder="Enter bonus payment"
                          {...field}
                        />
                      </FormControl>
                      {errors.bonus && (
                        <FormMessage>{errors.bonus.message}</FormMessage>
                      )}
                    </FormItem>
                  )}
                />
              </div>
              <div className="space-y-4">
                <Label htmlFor="tags">Tags</Label>
                <div className="flex">
                  <Input
                    id="tags"
                    placeholder="Enter job tags"
                    value={tagsInput}
                    onChange={(e) => setTagsInput(e.target.value)}
                  />
                  <Button
                    type="button"
                    disabled={tagsInput.length === 0}
                    onClick={handleAddTag}
                  >
                    Add
                  </Button>
                </div>

                <div className="flex flex-wrap items-center gap-2">
                  {tags.map((tag, index) => (
                    <div
                      className="bg-gray-100  rounded-full px-3 py-1 flex items-center"
                      key={index}
                    >
                      {tag}
                      <Button
                        type="button"
                        variant={"ghost"}
                        onClick={() =>
                          setTags(procedures.filter((s) => s !== tag))
                        }
                      >
                        <XIcon />
                      </Button>
                    </div>
                  ))}
                </div>
              </div>
              <div className="space-y-4">
                <FormField
                  control={form.control}
                  name="paymentPerDay"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Payment Per Day</FormLabel>
                      <FormControl>
                        <Input
                          type="number"
                          step="0.01"
                          placeholder="Enter payment per day"
                          {...field}
                        />
                      </FormControl>
                      {errors.paymentPerDay && (
                        <FormMessage>
                          {errors.paymentPerDay.message}
                        </FormMessage>
                      )}
                    </FormItem>
                  )}
                />
              </div>
            </div>
            <CardFooter>
              <Button disabled={isSubmitting} type="submit" className="ml-auto">
                {isSubmitting && <Loader className="animate-spin" />} Post Job
              </Button>
            </CardFooter>
          </CardContent>
        </Card>
      </form>
    </Form>
  );
};

export default JobPostingForm;
