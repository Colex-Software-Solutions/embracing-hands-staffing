import React from "react";
import { useForm, Controller } from "react-hook-form";
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
import { Loader } from "lucide-react";
import { useToast } from "@/app/components/ui/use-toast";
import axios from "axios";
import { StepComponentProps } from "../MultiStepForm";

const referenceSchema = z.object({
  references: z
    .array(
      z.object({
        firstname: z.string().min(1, "First Name is required"),
        lastname: z.string().min(1, "Last Name is required"),
        address: z.string().min(1, "Address is required"),
        phone: z.string().min(1, "Phone Number is required"),
      })
    )
    .length(3, "You must provide exactly 3 references"),
});

type ReferenceFormValues = z.infer<typeof referenceSchema>;

const ProfessionalReferences: React.FC<StepComponentProps> = ({
  userId,
  isInitialSetup,
  profile,
  onNext,
}) => {
  const form = useForm<ReferenceFormValues>({
    resolver: zodResolver(referenceSchema),
    defaultValues: {
      references: [{}, {}, {}].map((_, index) => ({
        firstname: profile?.references?.[index]?.firstname || "",
        lastname: profile?.references?.[index]?.lastname || "",
        address: profile?.references?.[index]?.address || "",
        phone: profile?.references?.[index]?.phone || "",
      })),
    },
  });

  const { toast } = useToast();
  const { errors, isSubmitting } = form.formState;

  const onSubmit = async (data: ReferenceFormValues) => {
    try {
      const res = await axios.post(`/api/staff/${userId}`, data);
      toast({
        title: "References Updated Successfully",
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

  return (
    <Form {...form}>
      <form
        className="w-full max-w-4xl py-4"
        onSubmit={form.handleSubmit(onSubmit)}
      >
        <Card className="py-2">
          <CardContent className="space-y-4">
            <h1 className="text-2xl text-secondary-foreground lg:text-3xl font-bold">
              Professional References
            </h1>
            {form.watch("references").map((_, index) => (
              <div key={index} className="space-y-4">
                <h1 className="text-xl md:text-2xl">Reference {index + 1}</h1>
                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                  <FormField
                    control={form.control}
                    name={`references.${index}.firstname`}
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>First Name</FormLabel>
                        <FormControl>
                          <Input placeholder="Enter first name" {...field} />
                        </FormControl>
                        {errors.references?.[index]?.firstname && (
                          <FormMessage>
                            {errors.references?.[index]?.firstname?.message}
                          </FormMessage>
                        )}
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name={`references.${index}.lastname`}
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Last Name</FormLabel>
                        <FormControl>
                          <Input placeholder="Enter last name" {...field} />
                        </FormControl>
                        {errors.references?.[index]?.lastname && (
                          <FormMessage>
                            {errors.references?.[index]?.firstname?.message}
                          </FormMessage>
                        )}
                      </FormItem>
                    )}
                  />
                </div>
                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                  <FormField
                    control={form.control}
                    name={`references.${index}.address`}
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Address</FormLabel>
                        <FormControl>
                          <Input placeholder="Enter address" {...field} />
                        </FormControl>
                        {errors.references?.[index]?.address && (
                          <FormMessage>
                            {errors.references?.[index]?.firstname?.message}
                          </FormMessage>
                        )}
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name={`references.${index}.phone`}
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Phone Number</FormLabel>
                        <FormControl>
                          <Input placeholder="Enter phone number" {...field} />
                        </FormControl>
                        {errors.references?.[index]?.phone && (
                          <FormMessage>
                            {errors.references?.[index]?.firstname?.message}
                          </FormMessage>
                        )}
                      </FormItem>
                    )}
                  />
                </div>
              </div>
            ))}
          </CardContent>
          <CardFooter>
            <Button disabled={isSubmitting} type="submit" className="ml-auto">
              {isSubmitting && <Loader />}Save and Next Step
            </Button>
          </CardFooter>
        </Card>
      </form>
    </Form>
  );
};

export default ProfessionalReferences;
