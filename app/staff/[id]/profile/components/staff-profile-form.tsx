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
import { Loader, XIcon } from "lucide-react";
import axios from "axios";
import { useToast } from "@/app/components/ui/use-toast";
import Link from "next/link";
import { SkillsCombobox } from "@/app/components/combobox/skills-combobox";

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
  const { toast } = useToast();
  const [skills, setSkills] = useState<string[]>(profile?.skills ?? []);
  const [profileImageFile, setProfileImageFile] = useState<null | File>();
  const [resumeFile, setResumeFile] = useState<null | File>();
  const [profileImageUrl, setProfileImageUrl] = useState(profile?.profileImage);
  const [resumeUrl, setResumeUrl] = useState(profile?.resumeUrl);

  const handleProfileImageChange = (event: any) => {
    const file = event.target.files[0];
    if (file && /^(image\/jpeg|image\/png|image\/svg\+xml)$/.test(file.type)) {
      setProfileImageFile(file);
    } else {
      alert("Only JPEG, PNG, or SVG files are allowed.");
      event.target.value = "";
    }
  };

  const handleResumeChange = (event: any) => {
    const file = event.target.files[0];
    if (file && file.type === "application/pdf") {
      setResumeFile(file);
    } else {
      alert("Only PDF files are allowed.");
      event.target.value = "";
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
      const res = await axios.post(`/api/staff/${userId}`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      setProfileImageUrl(res.data.profile.profileImage);
      setResumeUrl(res.data.profile.resumeUrl);
      setProfileImageFile(null);
      setResumeFile(null);
      toast({
        title: "Profile Updated Successfully",
        variant: "default",
      });
    } catch (error: any) {
      console.error(error);
      toast({
        title: "Server Side Error",
        description: error?.response?.statusText,
        variant: "destructive",
      });
    }
  };

  const handleAddSkill = (skill: string) => {
    if (!skills.includes(skill)) {
      setSkills([...skills, skill]);
    }
  } 

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
              <Alert variant={"destructive"}>
                Please Complete Your profile setup in order to access the
                platform
              </Alert>
            )}
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              <FormField
                control={form.control}
                name="firstname"
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
                className={`${
                  !profileImageFile && profileImageUrl && "hidden"
                }`}
                accept="image/jpeg,image/png,image/svg+xml"
                id="profileImage"
                type="file"
                onChange={handleProfileImageChange}
              />
              {profileImageUrl && !profileImageFile && (
                <>
                  <p>
                    Current profile image{" "}
                    <Button
                      type="button"
                      variant={"ghost"}
                      onClick={() =>
                        document.getElementById("profileImage")?.click()
                      }
                    >
                      Replace
                    </Button>
                  </p>
                  <img
                    src={profileImageUrl}
                    alt="Profile"
                    style={{ width: "100px", height: "100px" }}
                  />
                </>
              )}
            </div>
            <div className="space-y-2">
              <Label htmlFor="resume">Resume</Label>
              <Input
                className={`${!resumeFile && resumeUrl && "hidden"}`}
                accept=".pdf"
                id="resume"
                type="file"
                onChange={handleResumeChange}
              />
              {resumeUrl && !resumeFile && (
                <div className="flex items-center">
                  <Link href={resumeUrl} target="_blank">
                    <Button type="button" variant={"link"}>
                      View current resume
                    </Button>
                  </Link>
                  <p>
                    <Button
                      type="button"
                      variant={"ghost"}
                      onClick={() => document.getElementById("resume")?.click()}
                    >
                      Replace
                    </Button>
                  </p>
                </div>
              )}
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
                    <SkillsCombobox handleAddSkill={handleAddSkill}>Select Skills</SkillsCombobox>
                    <div className="flex gap-3 flex-wrap justify-start">
                      {skills.map((skill, index) => (
                        <div
                          className="flex border rounded-lg items-center justify-center bg-secondary"
                          key={index}
                        >
                          <div className="px-2">{skill}</div>
                          <Button
                            type="button"
                            variant={"ghost"}
                            onClick={() =>
                              setSkills(skills.filter((s) => s !== skill))
                            }
                          >
                            <XIcon width={15} />
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
            <Button disabled={isSubmitting} type="submit" className="ml-auto">
              {isSubmitting && <Loader />}Save
            </Button>
          </CardFooter>
        </Card>
      </form>
    </Form>
  );
};

export default StaffProfileForm;
