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
import { StepComponentProps } from "../MultiStepForm";
import { useToast } from "@/app/components/ui/use-toast";
import { Input } from "@/app/components/ui/input";
import CustomDatePicker from "../DatePicker";
import { Loader } from "lucide-react";
import axios from "axios";

const positionSchema = z.object({
  position: z.string().min(1, "Position is required"),
  availableStartDate: z.date({
    required_error: "Available Start Date is required",
    invalid_type_error: "Invalid date format",
  }),
  desiredPay: z.preprocess((val) => Number(val), z.number().optional()),
  employmentDesired: z.enum(["Full Time", "Part Time"]),
});

type PositionFormValues = z.infer<typeof positionSchema>;

const PositionDetails: React.FC<StepComponentProps> = ({
  userId,
  isInitialSetup,
  profile,
  onNext,
}) => {
  const defaultValues: Partial<PositionFormValues> = {
    position: profile?.position || "",
    availableStartDate: profile?.availableStartDate
      ? new Date(profile?.availableStartDate)
      : undefined,
    desiredPay: profile?.desiredPay || 0,
    employmentDesired:
      profile?.employmentDesired === "Full Time" ? "Full Time" : "Part Time",
  };

  const form = useForm<PositionFormValues>({
    resolver: zodResolver(positionSchema),
    defaultValues,
  });

  const { toast } = useToast();
  const { errors, isSubmitting } = form.formState;

  const onSubmit = async (data: PositionFormValues) => {
    try {
      const res = await axios.post(`/api/staff/${userId}`, data, {
        headers: {
          "Content-Type": "application/json",
        },
      });

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

  return (
    <Form {...form}>
      <form
        className="w-full max-w-4xl py-4"
        onSubmit={form.handleSubmit(onSubmit)}
      >
        <Card className="py-2">
          <CardContent className="space-y-4">
            <h1 className="text-2xl text-secondary-foreground lg:text-3xl font-bold">
              Position Details
            </h1>
            <FormField
              control={form.control}
              name="position"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Position</FormLabel>
                  <FormControl>
                    <Input placeholder="Enter your position" {...field} />
                  </FormControl>
                  {errors.position && (
                    <FormMessage>{errors.position.message}</FormMessage>
                  )}
                </FormItem>
              )}
            />
            <Controller
              name="availableStartDate"
              control={form.control}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Available Start Date</FormLabel>
                  <CustomDatePicker
                    selectedDate={field.value}
                    onDateChange={field.onChange}
                    disabled={(date) => date < new Date()}
                  />
                  {errors.availableStartDate && (
                    <FormMessage>
                      {errors.availableStartDate.message}
                    </FormMessage>
                  )}
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="desiredPay"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Desired Hourly Pay (optional)</FormLabel>
                  <FormControl>
                    <Input
                      type="number"
                      placeholder="Enter your desired pay"
                      {...field}
                    />
                  </FormControl>
                  {errors.desiredPay && (
                    <FormMessage>{errors.desiredPay.message}</FormMessage>
                  )}
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="employmentDesired"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Employment Desired</FormLabel>
                  <FormControl>
                    <select {...field}>
                      <option value="Full Time">Full Time</option>
                      <option value="Part Time">Part Time</option>
                    </select>
                  </FormControl>
                  {errors.employmentDesired && (
                    <FormMessage>
                      {errors.employmentDesired.message}
                    </FormMessage>
                  )}
                </FormItem>
              )}
            />
          </CardContent>
          <CardFooter>
            {/* <Button
              disabled={isSubmitting}
              type="button"
              onClick={onBack}
              className="mr-4"
            >
              Back
            </Button> */}
            <Button disabled={isSubmitting} type="submit" className="ml-auto">
              {isSubmitting && <Loader />}Save and Next Step
            </Button>
          </CardFooter>
        </Card>
      </form>
    </Form>
  );
};

export default PositionDetails;
