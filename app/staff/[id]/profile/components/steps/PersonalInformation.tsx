"use client";
import React, { useEffect, useState } from "react";
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
import { Document, StaffProfile } from "@prisma/client";
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
  FormDescription,
} from "@/app/components/ui/form";
import { Loader, XIcon } from "lucide-react";
import axios from "axios";
import { useToast } from "@/app/components/ui/use-toast";
import { SkillsCombobox } from "@/app/components/combobox/skills-combobox";
import { Switch } from "@/app/components/ui/switch";
import Spinner from "@/app/components/loading/spinner";
import CustomDatePicker from "../DatePicker";
import DocumentsSection from "../DocumentsSection";

export interface GeoLocation {
  latitude: number;
  longitude: number;
}
const profileSchema = z.object({
  firstname: z.string().min(1, "First Name is required"),
  lastname: z.string().min(1, "Last Name is required"),
  about: z.string().optional(),
  title: z.string().min(1, "Title is required"),
  dateOfBirth: z.date().refine((date) => date <= new Date(), {
    message: "Date of Birth cannot be in the future",
  }),
  address: z.string().min(1, "Address is required"),
  referredBy: z.string().min(1, "Referral Source is required"),
  emergencyContactName: z.string().min(1, "Emergency Contact Name is required"),
  emergencyContactPhone: z
    .string()
    .regex(/^\(?([0-9]{3})\)?[-. ]?([0-9]{3})[-. ]?([0-9]{4})$/, {
      message: "Invalid phone number",
    }),
});
type ProfileFormValues = z.infer<typeof profileSchema>;

const PersonalInformationForm = ({
  profile,
  userId,
  documents = [],
  isInitialSetup = true,
  onNext,
}: {
  profile: StaffProfile | null;
  userId: string;
  documents?: Document[];
  isInitialSetup?: boolean;
  onNext: (data: Partial<ProfileFormValues>) => void;
}) => {
  const defaultValues: Partial<ProfileFormValues> = {
    firstname: profile?.firstname ?? "",
    lastname: profile?.firstname ?? "",
    about: profile?.about ?? "",
    title: profile?.title ?? "",
    dateOfBirth: profile?.dateOfBirth ?? undefined,
    address: profile?.address ?? "",
    referredBy: profile?.referredBy ?? "",
    emergencyContactName: profile?.emergencyContactName ?? "",
    emergencyContactPhone: profile?.emergencyContactPhone ?? "",
  };
  const form = useForm<ProfileFormValues>({
    resolver: zodResolver(profileSchema),
    defaultValues,
  });
  const { toast } = useToast();
  const [skills, setSkills] = useState<string[]>(profile?.skills ?? []);
  const [profileImageFile, setProfileImageFile] = useState<null | File>();
  const [profileImageUrl, setProfileImageUrl] = useState(profile?.profileImage);
  const [location, setLocation] = useState<GeoLocation | null>(null);
  const [locationLoading, setLocationLoading] = useState(false);

  const handleProfileImageChange = (event: any) => {
    const file = event.target.files[0];
    if (file && /^(image\/jpeg|image\/png|image\/svg\+xml)$/.test(file.type)) {
      setProfileImageFile(file);
    } else {
      alert("Only JPEG, PNG, or SVG files are allowed.");
      event.target.value = "";
    }
  };

  useEffect(() => {
    if (!location) {
      handleLocationChange(true);
    }
  }, []);

  const handleLocationChange = (checked: boolean) => {
    if (!checked) {
      setLocation(null);

      return;
    }

    if (!navigator.geolocation) {
      console.log("Geolocation is not supported by your browser");

      return;
    }

    setLocationLoading(true);

    navigator.geolocation.getCurrentPosition(
      (position: GeolocationPosition) => {
        setLocation({
          latitude: position.coords.latitude,
          longitude: position.coords.longitude,
        });

        setLocationLoading(false);
      },
      (err: GeolocationPositionError) => {
        console.log(err.message);
        setLocationLoading(false);
      }
    );
  };

  const onSubmit = async (data: ProfileFormValues) => {
    let profileImageBase64 = null;

    if (profileImageFile) {
      profileImageBase64 = await new Promise<string | null>(
        (resolve, reject) => {
          const reader = new FileReader();
          reader.readAsDataURL(profileImageFile);
          reader.onloadend = () => resolve(reader.result as string);
          reader.onerror = (error) => reject(null);
        }
      );
    }

    const payload = {
      ...data,
      skills,
      userId,
      profileImage: profileImageBase64,
    };

    try {
      const res = await axios.post(`/api/staff/${userId}`, payload);
      setProfileImageUrl(res.data.profile.profileImage);
      setProfileImageFile(null);
      toast({
        title: "Profile Updated Successfully",
        variant: "default",
      });
      onNext(res.data.profile);
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
  };

  const { errors, isSubmitting } = form.formState;

  return (
    <Form {...form}>
      <form
        className="w-full max-w-4xl py-4"
        onSubmit={form.handleSubmit(onSubmit)}
      >
        <Card className="py-2">
          <CardContent className="space-y-4">
            <h1 className="text-2xl text-secondary-foreground lg:text-3xl font-bold">
              Your Profile Information
            </h1>
            {isInitialSetup && (
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
            <FormField
              control={form.control}
              name="dateOfBirth"
              render={({ field }) => (
                <FormItem className="flex flex-col">
                  <FormLabel>Date of Birth</FormLabel>

                  <CustomDatePicker
                    selectedDate={field.value}
                    onDateChange={field.onChange}
                    disabled={(date) =>
                      date > new Date() || date < new Date("1900-01-01")
                    }
                  />
                  {errors.dateOfBirth && (
                    <FormMessage>{errors.dateOfBirth.message}</FormMessage>
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
                    <Input placeholder="Enter your address" {...field} />
                  </FormControl>
                  {errors.address && (
                    <FormMessage>{errors.address.message}</FormMessage>
                  )}
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="referredBy"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Referred By</FormLabel>
                  <FormControl>
                    <Input placeholder="Enter referral source" {...field} />
                  </FormControl>
                  {errors.referredBy && (
                    <FormMessage>{errors.referredBy.message}</FormMessage>
                  )}
                </FormItem>
              )}
            />
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              <FormField
                control={form.control}
                name="emergencyContactName"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Emergency Contact Name</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="Enter emergency contact name"
                        {...field}
                      />
                    </FormControl>
                    {errors.emergencyContactName && (
                      <FormMessage>
                        {errors.emergencyContactName.message}
                      </FormMessage>
                    )}
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="emergencyContactPhone"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Emergency Contact Phone</FormLabel>
                    <FormControl>
                      <Input
                        type="tel"
                        placeholder="Enter emergency contact phone"
                        {...field}
                      />
                    </FormControl>
                    {errors.emergencyContactPhone && (
                      <FormMessage>
                        {errors.emergencyContactPhone.message}
                      </FormMessage>
                    )}
                  </FormItem>
                )}
              />
            </div>

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
              <Card>
                <CardHeader>
                  <CardTitle>Skills</CardTitle>
                  <CardDescription>
                    Add your professional skills.
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <SkillsCombobox handleAddSkill={handleAddSkill}>
                      Select Skills
                    </SkillsCombobox>
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
            <div className="flex items-center space-x-2">
              {locationLoading ? (
                <Spinner />
              ) : (
                <Switch
                  id="location"
                  checked={location ? true : false}
                  onCheckedChange={handleLocationChange}
                />
              )}

              <Label htmlFor="location">Enable location</Label>
            </div>
          </CardContent>

          <CardFooter>
            <Button disabled={isSubmitting} type="submit" className="ml-auto">
              {isSubmitting && <Loader />}
              {isInitialSetup ? "Save And Next Step" : "save"}
            </Button>
          </CardFooter>
        </Card>
      </form>
    </Form>
  );
};

export default PersonalInformationForm;
