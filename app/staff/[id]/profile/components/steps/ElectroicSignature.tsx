import React, { useRef, useState } from "react";
import { useForm, Controller } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import SignatureCanvas from "react-signature-canvas";
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
import { StepComponentProps } from "../MultiStepForm";
import { format } from "date-fns";
import { useToast } from "@/app/components/ui/use-toast";
import axios from "axios";
import PdfViewerModal from "@/app/components/modals/pdf-viewer-modal";
import { Switch } from "@/app/components/ui/switch";
import { Checkbox } from "@/app/components/ui/checkbox";

const electronicSignatureSchema = z.object({
  electronicSignatureDisclaimer: z.string().nonempty("Signature is required"),
  signatureDate: z.string().nonempty("Date is required"),
});

type ElectronicSignatureFormValues = z.infer<typeof electronicSignatureSchema>;

const ElectronicSignature: React.FC<StepComponentProps> = ({
  userId,
  profile,
  onNext,
}) => {
  const { toast } = useToast();
  const [isConsentFormViewed, setIsConsentFormViewed] =
    useState<boolean>(false);
  const [consentFormToggle, setConsentFormToggle] = useState<boolean>(false);
  const [showEmployeeConsent, setShowEmployeeConsent] =
    useState<boolean>(false);
  const form = useForm<ElectronicSignatureFormValues>({
    resolver: zodResolver(electronicSignatureSchema),
    defaultValues: {
      electronicSignatureDisclaimer: "",
      signatureDate: format(new Date(), "yyyy-MM-dd"),
    },
  });

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = form;
  const signaturePadRef = useRef<SignatureCanvas>(null);

  const handleClear = () => {
    signaturePadRef.current?.clear();
  };

  const handleSave = async (data: ElectronicSignatureFormValues) => {
    if (!isConsentFormViewed || !consentFormToggle) {
      toast({
        title: "Please review and check the consent form.",
        variant: "destructive",
      });
      return;
    }
    if (signaturePadRef.current?.isEmpty()) {
      form.setError("electronicSignatureDisclaimer", {
        type: "manual",
        message: "Signature is required",
      });
      return;
    }

    const signatureImage = signaturePadRef.current?.toDataURL();

    const formData = {
      signatureDate: new Date(data.signatureDate),
      electronicSignatureDisclaimer: signatureImage,
      profileSetupComplete: true,
    };

    try {
      const res = await axios.post(`/api/staff/${userId}`, formData);
      toast({
        title: "Congratulations.You are now ready to find a job!",
        variant: "default",
      });
      onNext(res.data.profile);
    } catch (error: any) {
      console.error("Failed to save the signature", error);
      toast({
        title: "Server Side Error",
        description: error?.response?.statusText,
        variant: "destructive",
      });
    }
  };

  return (
    <Form {...form}>
      <form
        onSubmit={handleSubmit(handleSave)}
        className="w-full max-w-4xl py-4"
      >
        <Card className="py-2">
          <CardContent className="space-y-4">
            <h1 className="text-2xl text-secondary-foreground lg:text-3xl font-bold">
              Electronic Signature
            </h1>
            <div className="flex justify-between items-center">
              <p className="text-sm">
                <Checkbox
                  checked={consentFormToggle}
                  onCheckedChange={() =>
                    setConsentFormToggle(!consentFormToggle)
                  }
                />{" "}
                I unknowledge that I have read and agreed to the consent form
                <Button
                  className="mx-0 px-2"
                  type="button"
                  variant="link"
                  onClick={() => {
                    setShowEmployeeConsent(true);
                    setIsConsentFormViewed(true);
                  }}
                >
                  Here
                </Button>
              </p>
            </div>
            <FormField
              control={control}
              name="signatureDate"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Date</FormLabel>
                  <FormControl>
                    <Input type="date" readOnly value={field.value} />
                  </FormControl>
                  <FormMessage>{errors.signatureDate?.message}</FormMessage>
                </FormItem>
              )}
            />
            <FormField
              control={control}
              name="electronicSignatureDisclaimer"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Signature</FormLabel>
                  <FormControl>
                    <div className="border p-2">
                      <SignatureCanvas
                        penColor="black"
                        canvasProps={{
                          width: 500,
                          height: 200,
                          className: "sigCanvas",
                        }}
                        ref={signaturePadRef}
                        onEnd={() => {
                          const signatureDataUrl =
                            signaturePadRef.current?.toDataURL() || "";
                          field.onChange(signatureDataUrl);
                        }}
                      />
                    </div>
                  </FormControl>
                  <FormMessage>
                    {errors.electronicSignatureDisclaimer?.message}
                  </FormMessage>
                  <Button
                    variant="outline"
                    type="button"
                    onClick={handleClear}
                    className="mt-2"
                  >
                    Clear
                  </Button>
                </FormItem>
              )}
            />
          </CardContent>
          <PdfViewerModal
            isOpen={showEmployeeConsent}
            documentUrl={`/employee_consent.pdf`}
            onClose={() => setShowEmployeeConsent(false)}
          ></PdfViewerModal>
          <CardFooter>
            <Button
              disabled={form.formState.isSubmitting}
              type="submit"
              className="ml-auto"
            >
              {form.formState.isSubmitting ? "Saving..." : "Save Profile"}
            </Button>
          </CardFooter>
        </Card>
      </form>
    </Form>
  );
};

export default ElectronicSignature;
