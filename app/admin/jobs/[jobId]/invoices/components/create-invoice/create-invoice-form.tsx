"use client";
import { z } from "zod";
import { CreateInvoiceData } from "../../create/page";
import InvoicePreview from "./invoice-preview";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/app/components/ui/form";
import { Input } from "@/app/components/ui/input";
import { Controller, useFieldArray, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "@/app/components/ui/use-toast";
import { Button } from "@/app/components/ui/button";
import { Plus } from "lucide-react";
import {
  CreateInvoiceFormValues,
  createInvoiceSchema,
} from "@/app/admin/jobs/data/schema";
import { Dispatch, SetStateAction, useEffect } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";
import { Checkbox } from "@/app/components/ui/checkbox";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/app/components/ui/select";

interface CreateInvoiceFormProps {
  jobId: string;
  createInvoiceData: CreateInvoiceData;
  defaultValues: Partial<CreateInvoiceFormValues>;
  setIsDisabled: Dispatch<SetStateAction<boolean>>;
  setIsLoading: Dispatch<SetStateAction<boolean>>;
  setSubmit: Dispatch<SetStateAction<boolean>>;
  submit: boolean;
}

const CreateInvoiceForm: React.FC<CreateInvoiceFormProps> = ({
  jobId,
  createInvoiceData,
  defaultValues,
  setIsDisabled,
  setIsLoading,
  setSubmit,
  submit,
}) => {
  const router = useRouter();
  const form = useForm<CreateInvoiceFormValues>({
    resolver: zodResolver(createInvoiceSchema),
    defaultValues,
    mode: "onChange",
  });

  const { fields, append, remove } = useFieldArray({
    control: form.control,
    name: "shifts",
  });

  useEffect(() => {
    const subscription = form.watch((value) => {
      const validationResult = createInvoiceSchema.safeParse(value);
      setIsDisabled(
        !validationResult.success || form.watch("shifts").length === 0
      );
    });
    return () => subscription.unsubscribe();
  }, [form.watch, setIsDisabled]);

  const onSubmit = async (data: CreateInvoiceFormValues) => {
    try {
      await axios.post(`/api/invoices/${jobId}`, data);

      router.push(`/admin/jobs/${jobId}/invoices`);
    } catch (error) {
      toast({
        title: "Failed to save invoice.",
        variant: "destructive",
      });
    }

    setIsLoading(false);
    setSubmit(false);
  };

  useEffect(() => {
    if (submit) {
      form.handleSubmit(onSubmit)();
    }
  }, [submit]);

  return (
    <div className="flex bg-gray-100">
      <div className="w-1/3">
        <Form {...form}>
          <form className="p-5 space-y-2">
            <p className="font-bold text-xl">Bill To</p>
            <FormField
              control={form.control}
              name="facilityName"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Input
                      className="bg-white"
                      placeholder="Facility Name"
                      {...field}
                    />
                  </FormControl>

                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="facilityAddress"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Input
                      className="bg-white"
                      placeholder="Facility Address"
                      {...field}
                    />
                  </FormControl>

                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="cardPayment"
              render={() => (
                <FormItem className="flex items-center  gap-2">
                  <div className="font-bold mt-2">Card Payment</div>
                  <Controller
                    name="cardPayment"
                    control={form.control}
                    render={({ field: { onChange, value } }) => (
                      <Checkbox
                        className="mb-5"
                        checked={value}
                        onCheckedChange={(checked) => onChange(checked)}
                      />
                    )}
                  />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="latePayment"
              render={() => (
                <FormItem className="flex items-center  gap-2">
                  <div className="font-bold mt-2">Apply Late Payment Fee</div>
                  <Controller
                    name="latePayment"
                    control={form.control}
                    render={({ field: { onChange, value } }) => (
                      <Checkbox
                        className="mb-5"
                        checked={value}
                        onCheckedChange={(checked) => onChange(checked)}
                      />
                    )}
                  />
                </FormItem>
              )}
            />

            {form.watch("latePayment") && ( // Only show if latePayment is checked
              <FormField
                control={form.control}
                name="latePaymentMonths"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Late Payment Duration</FormLabel>
                    <FormControl>
                      <Select
                        onValueChange={(value) => field.onChange(Number(value))} // Convert value to number
                        value={field.value ? String(field.value) : ""} // Convert the value back to a string for Select
                      >
                        <SelectTrigger className="w-full">
                          <SelectValue placeholder="Select months" />
                        </SelectTrigger>
                        <SelectContent>
                          {[...Array(6)].map((_, i) => {
                            const monthCount = i + 1;
                            return (
                              <SelectItem
                                key={monthCount}
                                value={String(monthCount)}
                              >
                                {monthCount}{" "}
                                {monthCount === 1 ? "month" : "months"}
                              </SelectItem>
                            );
                          })}
                        </SelectContent>
                      </Select>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            )}

            <p className="font-bold text-xl mt-4">Shifts</p>
            <div className="overflow-scroll h-96 shadow-inner">
              {fields.map((field, index) => (
                <div key={field.id} className="border p-2 my-2">
                  <p>Shift #{index + 1}</p>
                  <FormField
                    control={form.control}
                    name={`shifts.${index}.startDate`}
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Start Date</FormLabel>
                        <FormControl>
                          <Input
                            type="date"
                            className="bg-white w-fit"
                            placeholder="Start Date"
                            value={
                              field.value
                                ? new Date(field.value)
                                    .toISOString()
                                    .split("T")[0]
                                : ""
                            }
                            onChange={(e) => {
                              field.onChange(e.target.valueAsDate);
                            }}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name={`shifts.${index}.endDate`}
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>End Date</FormLabel>
                        <FormControl>
                          <Input
                            type="date"
                            className="bg-white w-fit"
                            placeholder="End Date"
                            value={
                              field.value
                                ? new Date(field.value)
                                    .toISOString()
                                    .split("T")[0]
                                : ""
                            }
                            onChange={(e) =>
                              field.onChange(e.target.valueAsDate)
                            }
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name={`shifts.${index}.serviceDetails`}
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Service Details</FormLabel>
                        <FormControl>
                          <Input
                            className="bg-white"
                            placeholder="Service Details"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name={`shifts.${index}.employee`}
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Employee</FormLabel>
                        <FormControl>
                          <Input
                            className="bg-white"
                            placeholder="Employee"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <div className="flex gap-2 mt-2">
                    <FormField
                      control={form.control}
                      name={`shifts.${index}.in`}
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>In</FormLabel>
                          <FormControl>
                            <Input
                              className="bg-white"
                              placeholder="In Time"
                              {...field}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name={`shifts.${index}.out`}
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Out</FormLabel>
                          <FormControl>
                            <Input
                              className="bg-white"
                              placeholder="Out Time"
                              {...field}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                  <FormField
                    control={form.control}
                    name={`shifts.${index}.hourlyRate`}
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Hourly Rate</FormLabel>
                        <FormControl>
                          <Input
                            type="number"
                            step="0.01"
                            className="bg-white"
                            placeholder="Hourly Rate"
                            value={field.value}
                            onChange={(e) =>
                              field.onChange(parseFloat(e.target.value))
                            }
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <Button
                    onClick={() => remove(index)}
                    variant="destructive"
                    className="mt-2"
                  >
                    Remove Shift
                  </Button>
                </div>
              ))}
              <Button
                variant="secondary"
                className="w-full"
                type="button"
                onClick={() =>
                  append({
                    startDate: new Date(),
                    endDate: new Date(),
                    serviceDetails: "",
                    employee: "",
                    in: "",
                    out: "",
                    hourlyRate: 0,
                  })
                }
              >
                <Plus className="text-primary" />
              </Button>
            </div>
          </form>
        </Form>
      </div>
      <div className="w-2/3">
        <InvoicePreview
          facilityName={form.watch("facilityName")}
          facilityAddress={form.watch("facilityAddress")}
          shifts={form.watch("shifts")}
          isCardPayment={form.watch("cardPayment")}
          latePaymentMonths={
            form.watch("latePayment") ? form.watch("latePaymentMonths") : 0
          }
          invoiceNumber={defaultValues.invoiceNumber || 0}
        />
      </div>
    </div>
  );
};

export default CreateInvoiceForm;
