"use client";
import React, { useEffect, useState } from "react";
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
import { JobPost } from "@prisma/client";
import { SkillsCombobox } from "@/app/components/combobox/skills-combobox";
import GooglePlacesAutocomplete, {
  geocodeByAddress,
} from "react-places-autocomplete";
import { format } from "date-fns";

const jobPostingSchema = z
  .object({
    title: z.string().min(1, "Title is required"),
    description: z.string().min(1, "Description is required"),
    scrubsProvided: z.boolean(),
    experience: z.string().min(5, "Experience description is required"),
    location: z.string().optional(),
    latitude: z.coerce.number().optional(),
    longitude: z.coerce.number().optional(),
    shiftsTime: z.string().min(5, "Shifts description is required"),
    startDate: z.string(),
    endDate: z.string(),
    housing: z.string().optional(),
    patientPopulation: z.string().optional(),
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

interface IJobPostingForm {
  currentJob?: JobPost;
  handleJobPostUpdate?: (newJob: JobPost) => void;
}

const JobPostingForm = ({
  currentJob,
  handleJobPostUpdate,
}: IJobPostingForm) => {
  const defaultValues: Partial<JobPostingFormValues> = {
    title: currentJob?.title || "",
    description: currentJob?.description || "",
    scrubsProvided: currentJob?.scrubsProvided || false,
    experience: currentJob?.experience || "",
    location: currentJob?.location || "",
    shiftsTime: currentJob?.shiftsTime || "",
    startDate: currentJob
      ? new Date(currentJob.startDate).toISOString().slice(0, 10)
      : "",
    endDate: currentJob
      ? new Date(currentJob.endDate).toISOString().slice(0, 10)
      : "",
    housing: currentJob?.housing || "",
    patientPopulation: currentJob?.patientPopulation || "",
  };
  const form = useForm<JobPostingFormValues>({
    resolver: zodResolver(jobPostingSchema),
    defaultValues,
  });

  const [procedures, setProcedures] = useState<string[]>(
    currentJob?.procedures || []
  );

  const [procedureInput, setProcedureInput] = useState("");
  const { data: session } = useSession();
  const [tags, setTags] = useState<string[]>(currentJob?.tags || []);
  const { toast } = useToast();
  const [location, setLocation] = useState<string>(
    defaultValues.location || ""
  );
  const [locationError, setLocationError] = useState<boolean>(false);

  const verifyAddress = async () => {
    try {
      const results = await geocodeByAddress(location);

      const latitude = results[0].geometry.location.lat();
      const longitude = results[0].geometry.location.lng();

      console.log(latitude);

      if (!latitude || !longitude) {
        setLocationError(true);
        return;
      }

      setLocationError(false);
    } catch (error) {
      setLocationError(true);
    }
  };

  useEffect(() => {
    verifyAddress();
  }, [location]);

  const handleAddSkill = (tag: string) => {
    if (!tags.includes(tag)) {
      setTags([...tags, tag]);
    }
  };

  const handleAddProcedure = () => {
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

      const results = await geocodeByAddress(location);

      const latitude = results[0].geometry.location.lat();
      const longitude = results[0].geometry.location.lng();

      if (!latitude || !longitude) {
        toast({
          title: "Error!",
          description: "Please provide a valid address",
          variant: "destructive",
        });

        return;
      }

      // set location values
      form.setValue("location", location);
      form.setValue("latitude", latitude);
      form.setValue("longitude", longitude);

      const requestBody = {
        ...data,
        location,
        latitude,
        longitude,
        startDate: format(data.startDate, "yyyy-MM-dd"),
        endDate: format(data.endDate, "yyyy-MM-dd"),
        procedures,
        tags,
        facilityId: session.user.facilityProfile.id,
        id: currentJob ? currentJob.id : null,
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
      const newJob: JobPost = (await response.json()).jobPost;

      // updating the jobs state
      if (handleJobPostUpdate) {
        handleJobPostUpdate(newJob);
      }
      toast({
        title: "Success!",
        description: "The new job add has been posted successfully",
        variant: "default",
      });
    } catch (error: any) {
      toast({
        title: "Error!",
        description: "Failed to create job post",
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
            <CardTitle>
              {currentJob ? "View and edit this job" : "Job Posting Form"}
            </CardTitle>
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
                  name="scrubsProvided"
                  render={({ field: { value, onChange, onBlur, ref } }) => (
                    <FormItem>
                      <FormLabel>Scrubs Provided</FormLabel>
                      <FormControl>
                        <Switch
                          id="scrubsProvided"
                          checked={value}
                          onCheckedChange={onChange}
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
                        <div className="relative">
                          <GooglePlacesAutocomplete
                            value={location}
                            onChange={(val) => setLocation(val)}
                            onSelect={async (
                              address: string,
                              placeId: string
                            ) => {
                              setLocation(address);
                            }}
                            debounce={300}
                            searchOptions={{
                              types: ["address"],
                              componentRestrictions: { country: ["us", "ca"] },
                            }}
                          >
                            {({
                              getInputProps,
                              suggestions,
                              getSuggestionItemProps,
                              loading,
                            }) => (
                              <div>
                                <input
                                  {...getInputProps({
                                    placeholder: "Search Places ...",
                                    className:
                                      "border border-gray-300 p-2  rounded-md w-full",
                                  })}
                                />

                                <div className="absolute z-30 w-full mt-1 bg-white">
                                  {loading && <div>Loading...</div>}
                                  {suggestions.map((suggestion) => (
                                    <div
                                      className="hover:bg-slate-100 cursor-pointer"
                                      {...getSuggestionItemProps(suggestion)}
                                      key={suggestion.placeId}
                                    >
                                      <span>{suggestion.description}</span>
                                    </div>
                                  ))}
                                </div>
                              </div>
                            )}
                          </GooglePlacesAutocomplete>
                          {locationError && (
                            <FormMessage>
                              Please enter a valid address
                            </FormMessage>
                          )}
                        </div>
                      </FormControl>
                    </FormItem>
                  )}
                />
              </div>
              <div className="space-y-4">
                <FormField
                  control={form.control}
                  name="shiftsTime"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Shifts</FormLabel>
                      <FormControl>
                        <Input
                          id="shiftsTime"
                          placeholder="Enter shift details"
                          {...field}
                        />
                      </FormControl>
                      {errors.shiftsTime && (
                        <FormMessage>{errors.shiftsTime.message}</FormMessage>
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
              <div className="space-y-4 flex flex-col">
                <Label htmlFor="tags">Tags</Label>
                <SkillsCombobox handleAddSkill={handleAddSkill}>
                  Select Tags
                </SkillsCombobox>
                <div className="flex gap-3 flex-wrap justify-start">
                  {tags.map((tag, index) => (
                    <div
                      className="flex border rounded-lg items-center justify-center bg-secondary"
                      key={index}
                    >
                      <div className="px-2">{tag}</div>
                      <Button
                        type="button"
                        variant={"ghost"}
                        onClick={() => setTags(tags.filter((s) => s !== tag))}
                      >
                        <XIcon width={15} />
                      </Button>
                    </div>
                  ))}
                </div>
              </div>
            </div>
            <CardFooter>
              <Button disabled={isSubmitting} type="submit" className="ml-auto">
                {isSubmitting && <Loader className="animate-spin" />}{" "}
                {currentJob ? "Save Changes" : "Post Job"}
              </Button>
            </CardFooter>
          </CardContent>
        </Card>
      </form>
    </Form>
  );
};

export default JobPostingForm;
