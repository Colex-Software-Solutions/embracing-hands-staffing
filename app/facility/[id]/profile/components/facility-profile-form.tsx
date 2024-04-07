"use client";
import React, { useState } from "react";
import { Label } from "@/app/components/ui/label";
import { Input } from "@/app/components/ui/input";
import { Textarea } from "@/app/components/ui/textarea";
import { CardContent, CardFooter, Card } from "@/app/components/ui/card";
import { Button } from "@/app/components/ui/button";
import { Alert } from "@/app/components/ui/alert";
import { FacilityProfile } from "@prisma/client";
import { z } from "zod";
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
import { Loader } from "lucide-react";
import axios from "axios";
import { useToast } from "@/app/components/ui/use-toast";
import ReactGoogleAutocomplete from "react-google-autocomplete";

const GOOGLE_MAPS_API_KEY = process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY;

const profileSchema = z.object({
  name: z.string().min(1, "Name is required"),
  facilityType: z.string().min(1, "Facility Type is required"),
  description: z.string().optional(),
  address: z.string().min(10, "Address is required"),
  country: z.string().min(3, "Country is required"),
  state: z
    .string()
    .min(1, "State/Province is required")
    .min(3, "Please enter full state/province name and not the shortcut"),
  city: z.string().min(3, "City is required"),
  latitude: z.number(),
  longitude: z.number(),
});
type ProfileFormValues = z.infer<typeof profileSchema>;

const FacilityProfileForm = ({
  profile,
  userId,
}: {
  profile: FacilityProfile | null;
  userId: string;
}) => {
  const defaultValues: Partial<ProfileFormValues> = {
    name: profile?.name ?? "",
    facilityType: profile?.facilityType ?? "",
    description: profile?.description ?? "",
    address: profile?.address ?? "",
    country: profile?.country ?? "",
    state: profile?.state ?? "",
    city: profile?.city ?? "",
    latitude: profile?.latitude,
    longitude: profile?.longitude,
  };
  const form = useForm<ProfileFormValues>({
    resolver: zodResolver(profileSchema),
    defaultValues,
  });
  const [profileImageFile, setProfileImageFile] = useState<null | File>();
  const [profileImageUrl, setProfileImageUrl] = useState(profile?.profileImage);
  const { toast } = useToast();

  const handleProfileImageChange = (event: any) => {
    const file = event.target.files[0];
    if (file && /^(image\/jpeg|image\/png|image\/svg\+xml)$/.test(file.type)) {
      setProfileImageFile(file);
    } else {
      alert("Only JPEG, PNG, or SVG files are allowed.");
      event.target.value = "";
    }
  };
  const onSubmit = async (data: ProfileFormValues) => {
    const formData = new FormData();
    formData.append("name", data.name);
    formData.append("address", data.address);
    formData.append("description", data.description ?? "");
    formData.append("facilityType", data.facilityType);
    formData.append("country", data.country);
    formData.append("state", data.state);
    formData.append("city", data.city);
    formData.append("latitude", data.latitude.toString());
    formData.append("longitude", data.longitude.toString());
    if (profileImageFile) formData.append("profileImage", profileImageFile);

    try {
      const res = await axios.post(`/api/facility/${userId}`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      setProfileImageUrl(res.data.profile.profileImage);
      setProfileImageFile(null);
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

  const { errors, isSubmitting } = form.formState;
  return (
    <Form {...form}>
      <form
        className="w-full max-w-3xl py-4"
        onSubmit={form.handleSubmit(onSubmit)}
      >
        <Card className="w-full max-w-3xl">
          <CardContent className="space-y-4">
            <h1 className="text-2xl lg:text-3xl font-bold">
              Your Profile Information
            </h1>
            {profile === null && (
              <Alert variant={"destructive"}>
                Please Complete Your profile setup in order to access the
                platform
              </Alert>
            )}
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              <div className="space-y-2">
                <FormField
                  control={form.control}
                  name="name"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Name</FormLabel>
                      <FormControl>
                        <Input placeholder="Enter your name" {...field} />
                      </FormControl>
                      {errors.name && (
                        <FormMessage>{errors.name.message}</FormMessage>
                      )}
                    </FormItem>
                  )}
                />
              </div>
              <div className="space-y-2">
                <FormField
                  control={form.control}
                  name="facilityType"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Facility Type</FormLabel>
                      <FormControl>
                        <Input placeholder="Enter facility type" {...field} />
                      </FormControl>
                      {errors.facilityType && (
                        <FormMessage>{errors.facilityType.message}</FormMessage>
                      )}
                    </FormItem>
                  )}
                />
              </div>
              <div className="space-y-2">
                <FormField
                  control={form.control}
                  name="description"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Description</FormLabel>
                      <FormControl>
                        <Textarea
                          className="min-h-[100px]"
                          placeholder="Enter facility description"
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
              <div className="space-y-2">
                <FormField
                  control={form.control}
                  name="address"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Address</FormLabel>
                      <FormControl>
                        {/* <Input
                          placeholder="Enter facility address"
                          {...field}
                        /> */}
                        <ReactGoogleAutocomplete
                          id="location"
                          apiKey={GOOGLE_MAPS_API_KEY}
                          style={{
                            width: "100%",
                            height: "2.25rem",
                            borderRadius: ".375rem",
                            border: "1px solid rgba(0, 0, 0, 0.05)",
                            backgroundColor: "transparent",
                            padding: ".25rem .75rem",
                            fontSize: ".875rem",
                            boxShadow: "0 1px 2px 0 rgba(0, 0, 0, 0.05)",
                            transition: "color 0.15s ease-in-out",
                          }}
                          onPlaceSelected={(place) => {
                            const location = place.formatted_address;
                            const latitude = place.geometry.location.lat();
                            const longitude = place.geometry.location.lng();

                            form.setValue("address", location);
                            form.setValue("latitude", latitude);
                            form.setValue("longitude", longitude);
                          }}
                          options={{
                            types: ["address"],
                            componentRestrictions: { country: "ca" },
                          }}
                          defaultValue=""
                        />
                      </FormControl>
                      {errors.address && (
                        <FormMessage>{errors.address.message}</FormMessage>
                      )}
                    </FormItem>
                  )}
                />
              </div>
              <div className="space-y-2">
                <FormField
                  control={form.control}
                  name="city"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>City</FormLabel>
                      <FormControl>
                        <Input placeholder="Enter City" {...field} />
                      </FormControl>
                      {errors.city && (
                        <FormMessage>{errors.city.message}</FormMessage>
                      )}
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="state"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>State/Province</FormLabel>
                      <FormControl>
                        <Input
                          placeholder="Enter State or Province"
                          {...field}
                        />
                      </FormControl>
                      {errors.state && (
                        <FormMessage>{errors.state.message}</FormMessage>
                      )}
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="country"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Country</FormLabel>
                      <FormControl>
                        <Input placeholder="Enter Country" {...field} />
                      </FormControl>
                      {errors.country && (
                        <FormMessage>{errors.country.message}</FormMessage>
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

export default FacilityProfileForm;
