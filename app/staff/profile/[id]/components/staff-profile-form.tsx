"use client";
import React, { useState } from "react";
import { Label } from "@/app/components/ui/label";
import { Input } from "@/app/components/ui/input";
import { Textarea } from "@/app/components/ui/textarea";
import {
  CardTitle,
  CardDescription,
  CardHeader,
  CardContent,
  Card,
  CardFooter,
} from "@/app/components/ui/card";
import { Button } from "@/app/components/ui/button";
import { Alert } from "@/app/components/ui/alert";
import { StaffProfile } from "@prisma/client";
import { TypeOf, z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Form,
  FormControl,
  FormLabel,
  FormMessage,
  FormField,
  FormItem,
} from "@/app/components/ui/form";
import { XIcon } from "lucide-react";
import axios from "axios";

const profileSchema = z.object({
  firstname: z.string().min(1, "First Name is required"),
  lastname: z.string().min(1, "Last Name is required"),
  about: z.string().optional(),
  title: z.string().min(1, "Title is required"),
});
type ProfileFormValues = z.infer<typeof profileSchema>;
const StaffProfileForm = ({
  profile,
  userId,
}: {
  profile: StaffProfile | null;
  userId: string;
}) => {
  const defaultValues: Partial<ProfileFormValues> = {
    firstname: profile?.firstname ?? "",
    lastname: profile?.firstname ?? "",
    about: profile?.about ?? "",
    title: profile?.title ?? "",
  };
  const form = useForm<ProfileFormValues>({
    resolver: zodResolver(profileSchema),
    defaultValues,
  });
  const [skills, setSkills] = useState<string[]>([]);
  const [skillInput, setSkillInput] = useState("");
  // State hooks for managing files
  const [profileImageFile, setProfileImageFile] = useState();
  const [resumeFile, setResumeFile] = useState();

  // Handlers for file change
  const handleProfileImageChange = (event: any) => {
    const file = event.target.files[0];
    if (file && /^(image\/jpeg|image\/png|image\/svg\+xml)$/.test(file.type)) {
      setProfileImageFile(file);
    } else {
      alert("Only JPEG, PNG, or SVG files are allowed.");
      // Reset the file input
      event.target.value = "";
    }
  };

  const handleResumeChange = (event: any) => {
    const file = event.target.files[0];
    if (file && file.type === "application/pdf") {
      setResumeFile(file);
    } else {
      alert("Only PDF files are allowed.");
      // Reset the file input
      event.target.value = "";
    }
  };

  const handleAddSkill = () => {
    if (skillInput && !skills.includes(skillInput)) {
      setSkills([...skills, skillInput]);
      setSkillInput("");
    }
  };

  const onSubmit = async (data: ProfileFormValues) => {
    const formData = new FormData();
    formData.append("firstname", data.firstname);
    formData.append("lastname", data.lastname);
    formData.append("about", data.about ?? "");
    formData.append("title", data.title);
    formData.append("skills", JSON.stringify(skills));

    if (profileImageFile) formData.append("profileImage", profileImageFile);
    if (resumeFile) formData.append("resume", resumeFile);

    try {
      const response = await axios.post(`/api/staff/${userId}`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      console.log(response);
    } catch (error) {
      console.error(error);
    }
  };

  const { errors, isSubmitting } = form.formState;

  return (
    <Form {...form}>
      <form
        className="w-full max-w-3xl py-4"
        onSubmit={form.handleSubmit(onSubmit)}
      >
        <Card className="py-2">
          <CardContent className="space-y-4">
            <h1 className="text-2xl text-secondary-foreground lg:text-3xl font-bold">
              Your Profile Information
            </h1>
            {profile === null && (
              <Alert>
                Please Complete Your profile setup in order to access the
                platform
              </Alert>
            )}
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              <FormField
                control={form.control}
                name="firstname" // Adjust this for each field
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>First Name</FormLabel>
                    <FormControl>
                      <Input placeholder="Enter your first name" {...field} />
                    </FormControl>
                    {errors.firstname && (
                      <FormMessage>{errors.firstname.message}</FormMessage>
                    )}
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="lastname"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Last Name</FormLabel>
                    <FormControl>
                      <Input placeholder="Enter your last name" {...field} />
                    </FormControl>
                    {errors.lastname && (
                      <FormMessage>{errors.lastname.message}</FormMessage>
                    )}
                  </FormItem>
                )}
              />
            </div>
            <FormField
              control={form.control}
              name="about"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>About</FormLabel>
                  <FormControl>
                    <Textarea
                      className="min-h-[100px]"
                      placeholder="Enter your professional summary"
                      {...field}
                    />
                  </FormControl>
                  {errors.about && (
                    <FormMessage>{errors.about.message}</FormMessage>
                  )}
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="title"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Title</FormLabel>
                  <FormControl>
                    <Input placeholder="Enter your job title" {...field} />
                  </FormControl>
                  {errors.title && (
                    <FormMessage>{errors.title.message}</FormMessage>
                  )}
                </FormItem>
              )}
            />

            <div className="space-y-2">
              <Label htmlFor="profileImage">Profile Image</Label>
              <Input
                accept="image/jpeg,image/png,image/svg+xml"
                id="profileImage"
                type="file"
                onChange={handleProfileImageChange}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="resume">Resume</Label>
              <Input
                accept=".pdf"
                id="resume"
                type="file"
                onChange={handleResumeChange}
              />
            </div>
            <div className="space-y-2">
              <Card>
                <CardHeader>
                  <CardTitle>Skills</CardTitle>
                  <CardDescription>
                    Add your professional skills.
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex">
                      <Input
                        placeholder="Enter your skill"
                        value={skillInput}
                        onChange={(e) => setSkillInput(e.target.value)}
                      />
                      <Button onClick={handleAddSkill}>Add</Button>
                    </div>

                    <div className="flex space-x-3">
                      {skills.map((skill, index) => (
                        <div
                          className="border rounded-xl items-center justify-center flex bg-gray-300"
                          key={index}
                        >
                          {skill}
                          <Button
                            variant={"ghost"}
                            onClick={() =>
                              setSkills(skills.filter((s) => s !== skill))
                            }
                          >
                            <XIcon />
                          </Button>
                        </div>
                      ))}
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </CardContent>
          <CardFooter>
            <Button type="submit" className="ml-auto">
              Save
            </Button>
          </CardFooter>
        </Card>
      </form>
    </Form>
  );
};

export default StaffProfileForm;
