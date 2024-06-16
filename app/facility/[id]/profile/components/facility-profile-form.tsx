"use client";
import React, { useEffect, useRef, useState } from "react";
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
import GooglePlacesAutocomplete, {
  geocodeByAddress,
} from "react-places-autocomplete";
import PdfViewerModal from "@/app/components/modals/pdf-viewer-modal";
import SignatureCanvas from "react-signature-canvas";

const profileSchema = z.object({
  name: z.string().min(1, "Name is required"),
  facilityType: z.string().min(1, "Facility Type is required"),
  description: z.string().optional(),
  address: z.string().optional(),
  country: z.string().min(3, "Country is required"),
  state: z
    .string()
    .min(1, "State/Province is required")
    .min(3, "Please enter full state/province name and not the shortcut"),
  city: z.string().min(3, "City is required"),
  latitude: z.number().optional(),
  longitude: z.number().optional(),
  signature: z.any(),
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
    signature: "",
  };
  const form = useForm<ProfileFormValues>({
    resolver: zodResolver(profileSchema),
    defaultValues,
  });
  const [profileImageFile, setProfileImageFile] = useState<null | File>();
  const [profileImageUrl, setProfileImageUrl] = useState(profile?.profileImage);
  const [location, setLocation] = useState<string>(defaultValues.address || "");
  const [locationError, setLocationError] = useState<boolean>(false);
  const { toast } = useToast();

  const [signatureDataUrl, setSignatureDataUrl] = useState<string | null>(null);
  const [showContractModal, setShowContractModal] = useState(false);
  const signaturePadRef = useRef<SignatureCanvas>(null);

  const handleViewContract = () => {
    setShowContractModal(true);
  };

  const handleClearSignature = () => {
    signaturePadRef.current?.clear();
    setSignatureDataUrl(null);
  };

  const handleSaveSignature = () => {
    if (signaturePadRef.current) {
      if (signaturePadRef.current.isEmpty()) {
        toast({
          title: "Error",
          description: "Please provide a signature before saving.",
          variant: "destructive",
        });
        return;
      }
      const dataUrl = signaturePadRef.current.toDataURL();
      setSignatureDataUrl(dataUrl);
    }
  };

  const verifyAddress = async () => {
    try {
      const results = await geocodeByAddress(location);

      const latitude = results[0].geometry.location.lat();
      const longitude = results[0].geometry.location.lng();

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

  const handleProfileImageChange = (event: any) => {
    const file = event.target.files[0];
    if (file && /^(image\/jpeg|image\/png|image\/svg\+xml)$/.test(file.type)) {
      setProfileImageFile(file);
    } else {
      alert("Only JPEG, PNG, or SVG files are allowed.");
      event.target.value = "";
    }
  };

  const [generatedPdfUrl, setGeneratedPdfUrl] = useState<string | null>(null);

  const onSubmit = async (data: ProfileFormValues) => {
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

    const formData = new FormData();
    formData.append("name", data.name);
    formData.append("address", location);
    formData.append("description", data.description ?? "");
    formData.append("facilityType", data.facilityType);
    formData.append("country", data.country);
    formData.append("state", data.state);
    formData.append("city", data.city);
    formData.append("latitude", latitude.toString());
    formData.append("longitude", longitude.toString());

    if (profileImageFile) formData.append("profileImage", profileImageFile);
    if (!profile?.contractSignatureUrl) {
      if (!signatureDataUrl) {
        toast({
          title: "Error!",
          description:
            "Please review and sign the contract and save your signature",
          variant: "destructive",
        });
        return;
      }
      formData.append("contractSignatureUrl", signatureDataUrl);
    }

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
            {/* Contract review and signing section */}
            {!profile?.contractSignatureUrl && (
              <div className="space-y-4">
                <h2 className="text-lg font-bold">Review and Sign Contract</h2>
                <div className="flex justify-between items-center">
                  <p className="text-sm">
                    Review and sign the contract with Embracing Hands Staffing.
                  </p>
                  <Button
                    type="button"
                    variant="link"
                    onClick={handleViewContract}
                  >
                    View Contract
                  </Button>
                </div>
                {signatureDataUrl && (
                  <div className="border border-gray-300 p-2">
                    <img src={signatureDataUrl} alt="Signature" />
                    <Button
                      type="button"
                      variant="outline"
                      onClick={handleClearSignature}
                    >
                      Clear
                    </Button>
                  </div>
                )}
                <FormField
                  control={form.control}
                  name="signature"
                  render={({ field }) => (
                    <FormItem>
                      <FormControl>
                        <div className="border p-2">
                          <Label>Sign here</Label>
                          <SignatureCanvas
                            penColor="black"
                            canvasProps={{
                              width: 500,
                              height: 200,
                              className: "sigCanvas",
                            }}
                            ref={signaturePadRef}
                          />
                        </div>
                      </FormControl>
                    </FormItem>
                  )}
                />
                <div>
                  <Button type="button" onClick={handleSaveSignature}>
                    Save Signature
                  </Button>
                </div>
              </div>
            )}
            {/* Contract modal */}
            <PdfViewerModal
              isOpen={showContractModal}
              documentUrl={`/facility/${userId}/pdf`}
              onClose={() => setShowContractModal(false)}
            ></PdfViewerModal>
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
