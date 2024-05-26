import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Card, CardContent, CardFooter } from "@/app/components/ui/card";
import { Button } from "@/app/components/ui/button";
import {
  Form,
  FormControl,
  FormLabel,
  FormMessage,
  FormItem,
  FormField,
} from "@/app/components/ui/form";
import { Input } from "@/app/components/ui/input";
import { Switch } from "@/app/components/ui/switch";
import { Loader, TrashIcon } from "lucide-react";
import axios from "axios";
import { useToast } from "@/app/components/ui/use-toast";
import { Label } from "@/app/components/ui/label";
import { StepComponentProps } from "../MultiStepForm";
import DocumentsSection from "../DocumentsSection";
import { Alert } from "@/app/components/ui/alert";
import CustomDatePicker from "../DatePicker";

const certificationsSchema = z.object({
  hasBLS: z.boolean(),
  hasPALS: z.boolean(),
  hasACLS: z.boolean(),
  hasOtherCertifications: z.boolean(),
});

type CertificationsFormValues = z.infer<typeof certificationsSchema>;

const Certifications: React.FC<StepComponentProps> = ({
  userId,
  isInitialSetup,
  profile,
  documents,
  onNext,
}) => {
  const [blsFile, setBlsFile] = useState<File | null>(null);
  const [blsExpiry, setBlsExpiry] = useState<Date | undefined>(undefined);
  const [palsFile, setPalsFile] = useState<File | null>(null);
  const [palsExpiry, setPalsExpiry] = useState<Date | undefined>(undefined);
  const [aclsFile, setAclsFile] = useState<File | null>(null);
  const [aclsExpiry, setAclsExpiry] = useState<Date | undefined>(undefined);
  const [otherCertFiles, setOtherCertFiles] = useState<File[]>([]);
  const [otherCertExpiries, setOtherCertExpiries] = useState<
    (Date | undefined)[]
  >([]);

  const form = useForm<CertificationsFormValues>({
    resolver: zodResolver(certificationsSchema),
    defaultValues: {
      hasBLS: false,
      hasPALS: false,
      hasACLS: false,
      hasOtherCertifications: false,
    },
  });

  const { toast } = useToast();
  const { errors, isSubmitting } = form.formState;

  const onSubmit = async (data: CertificationsFormValues) => {
    const filesToUpload = [];
    if (data.hasBLS && !blsFile) {
      toast({
        title: "Validation Error",
        description: "BLS Certification file is required.",
        variant: "destructive",
      });
      return;
    } else if (blsFile) {
      filesToUpload.push({
        file: blsFile,
        name: "BLS Certification",
        expiryDate: blsExpiry,
      });
    }

    if (data.hasPALS && !palsFile) {
      toast({
        title: "Validation Error",
        description: "PALS Certification file is required.",
        variant: "destructive",
      });
      return;
    } else if (palsFile) {
      filesToUpload.push({
        file: palsFile,
        name: "PALS Certification",
        expiryDate: palsExpiry,
      });
    }

    if (data.hasACLS && !aclsFile) {
      toast({
        title: "Validation Error",
        description: "ACLS Certification file is required.",
        variant: "destructive",
      });
      return;
    } else if (aclsFile) {
      filesToUpload.push({
        file: aclsFile,
        name: "ACLS Certification",
        expiryDate: aclsExpiry,
      });
    }

    if (data.hasOtherCertifications && otherCertFiles.length === 0) {
      toast({
        title: "Validation Error",
        description: "At least one other certification file is required.",
        variant: "destructive",
      });
      return;
    } else {
      otherCertFiles.forEach((file, index) => {
        filesToUpload.push({
          file,
          name: file.name,
          expiryDate: otherCertExpiries[index],
        });
      });
    }

    try {
      const fileUploadPromises = filesToUpload.map(
        ({ file, name, expiryDate }) => {
          const formData = new FormData();
          formData.append("documentFile", file as File);
          formData.append("userId", userId);
          formData.append("name", name);
          if (expiryDate) {
            formData.append("expiryDate", expiryDate.toISOString());
          }

          return axios.post(`/api/document`, formData);
        }
      );

      await Promise.all(fileUploadPromises);

      filesToUpload.length > 0 &&
        toast({
          title: "Certifications Updated Successfully",
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
    }
  };

  const handleFileChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    setFile: React.Dispatch<React.SetStateAction<File | null>>
  ) => {
    const file = e.target.files && e.target.files[0];
    setFile(file);
  };

  const handleOtherCertFileChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const files = e.target.files;
    if (files) {
      const validFiles = Array.from(files);
      setOtherCertFiles([...otherCertFiles, ...validFiles]);
      setOtherCertExpiries([
        ...otherCertExpiries,
        ...new Array(validFiles.length).fill(undefined),
      ]);
    }
  };

  const handleOtherCertExpiryChange = (
    index: number,
    date: Date | undefined
  ) => {
    setOtherCertExpiries((prev) => {
      const newExpiries = [...prev];
      newExpiries[index] = date;
      return newExpiries;
    });
  };

  const removeOtherCertFile = (index: number) => {
    setOtherCertFiles(otherCertFiles.filter((_, i) => i !== index));
    setOtherCertExpiries(otherCertExpiries.filter((_, i) => i !== index));
  };

  return (
    <>
      {isInitialSetup ? (
        <Form {...form}>
          <form
            className="w-full max-w-4xl py-4"
            onSubmit={form.handleSubmit(onSubmit)}
          >
            <Card className="py-2">
              <CardContent className="space-y-4">
                <h1 className="text-2xl text-secondary-foreground lg:text-3xl font-bold">
                  Certifications and Licensure
                </h1>
                <FormField
                  control={form.control}
                  name="hasBLS"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Do you have BLS Certification?</FormLabel>
                      <FormControl>
                        <Switch
                          checked={field.value}
                          onCheckedChange={field.onChange}
                        />
                      </FormControl>
                      {field.value && (
                        <div className="mt-2">
                          <Label htmlFor="blsFile">
                            Upload BLS Certification Card
                          </Label>
                          <Input
                            type="file"
                            onChange={(e) => handleFileChange(e, setBlsFile)}
                          />
                          <div className="mt-2">
                            <Label>Expiry Date (optional)</Label>
                            <CustomDatePicker
                              selectedDate={blsExpiry}
                              onDateChange={setBlsExpiry}
                              disabled={() => false}
                            />
                          </div>
                        </div>
                      )}
                      {errors.hasBLS && (
                        <FormMessage>{errors.hasBLS.message}</FormMessage>
                      )}
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="hasPALS"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Do you have PALS Certification?</FormLabel>
                      <FormControl>
                        <Switch
                          checked={field.value}
                          onCheckedChange={field.onChange}
                        />
                      </FormControl>
                      {field.value && (
                        <div className="mt-2">
                          <Label htmlFor="palsFile">
                            Upload PALS Certification Card
                          </Label>
                          <Input
                            type="file"
                            onChange={(e) => handleFileChange(e, setPalsFile)}
                          />
                          <div className="mt-2">
                            <Label>Expiry Date (optional)</Label>
                            <CustomDatePicker
                              selectedDate={palsExpiry}
                              onDateChange={setPalsExpiry}
                              disabled={() => false}
                            />
                          </div>
                        </div>
                      )}
                      {errors.hasPALS && (
                        <FormMessage>{errors.hasPALS.message}</FormMessage>
                      )}
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="hasACLS"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Do you have ACLS Certification?</FormLabel>
                      <FormControl>
                        <Switch
                          checked={field.value}
                          onCheckedChange={field.onChange}
                        />
                      </FormControl>
                      {field.value && (
                        <div className="mt-2">
                          <Label htmlFor="aclsFile">
                            Upload ACLS Certification Card
                          </Label>
                          <Input
                            type="file"
                            onChange={(e) => handleFileChange(e, setAclsFile)}
                          />
                          <div className="mt-2">
                            <Label>Expiry Date (optional)</Label>
                            <CustomDatePicker
                              selectedDate={aclsExpiry}
                              onDateChange={setAclsExpiry}
                              disabled={() => false}
                            />
                          </div>
                        </div>
                      )}
                      {errors.hasACLS && (
                        <FormMessage>{errors.hasACLS.message}</FormMessage>
                      )}
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="hasOtherCertifications"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>
                        Do you have any other Certifications?
                      </FormLabel>
                      <FormControl>
                        <Switch
                          checked={field.value}
                          onCheckedChange={field.onChange}
                        />
                      </FormControl>
                      {field.value && (
                        <div className="mt-2 space-y-2">
                          <Label htmlFor="otherCertFiles">
                            Upload Other Certifications
                          </Label>
                          <Input
                            type="file"
                            multiple
                            onChange={handleOtherCertFileChange}
                          />
                          <div className="space-y-2">
                            {otherCertFiles.map((file, index) => (
                              <div
                                key={index}
                                className="flex items-center space-x-2"
                              >
                                <p className="text-sm">{file.name}</p>
                                <button
                                  type="button"
                                  onClick={() => removeOtherCertFile(index)}
                                >
                                  <TrashIcon className="h-5 w-5 text-red-600" />
                                </button>
                                <CustomDatePicker
                                  selectedDate={otherCertExpiries[index]}
                                  onDateChange={(date) =>
                                    handleOtherCertExpiryChange(index, date)
                                  }
                                  disabled={() => false}
                                />
                              </div>
                            ))}
                          </div>
                        </div>
                      )}
                      {errors.hasOtherCertifications && (
                        <FormMessage>
                          {errors.hasOtherCertifications.message}
                        </FormMessage>
                      )}
                    </FormItem>
                  )}
                />
              </CardContent>
              <CardFooter>
                <Button
                  disabled={isSubmitting}
                  type="submit"
                  className="ml-auto"
                >
                  {isSubmitting && <Loader />}Save and Next Step
                </Button>
              </CardFooter>
            </Card>
          </form>
        </Form>
      ) : (
        <Card className="py-2">
          <CardContent className="space-y-4">
            <h1 className="text-2xl text-secondary-foreground lg:text-3xl font-bold">
              Certifications and Licensure
            </h1>
            {documents ? (
              <DocumentsSection
                documents={documents}
                userId={userId}
                edit={true}
              />
            ) : (
              <Alert>
                Could not find any associated Documents and certifications,
                Please refresh your profile and try again{" "}
              </Alert>
            )}
          </CardContent>
        </Card>
      )}
    </>
  );
};

export default Certifications;
