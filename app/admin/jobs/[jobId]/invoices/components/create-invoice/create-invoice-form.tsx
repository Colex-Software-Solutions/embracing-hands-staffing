"use client";
import { z } from "zod";
import { CreateInvoiceData, CreateInvoiceShift } from "../../create/page";
import InvoicePreview from "./invoice-preview";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/app/components/ui/form";
import { Input } from "@/app/components/ui/input";
import { useFieldArray, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "@/app/components/ui/use-toast";
import { Button } from "@/app/components/ui/button";
import { Plus } from "lucide-react";

const shiftSchema = z.object({
  dateOfService: z.date({
    required_error: "Date of Service cannot be empty.",
    invalid_type_error: "Invalid date format.",
  }),
  serviceDetails: z.string().min(1, {
    message: "Service Details cannot be empty.",
  }),
  employee: z.string().min(1, {
    message: "Employee cannot be empty.",
  }),
  in: z.string().min(1, {
    message: "In time cannot be empty.",
  }),
  out: z.string().min(1, {
    message: "Out time cannot be empty.",
  }),
  hoursWorked: z.number().min(0, {
    message: "Hours Worked cannot be negative.",
  }),
});

const createInvoiceSchema = z.object({
  facilityName: z.string().min(1, {
    message: "Facility name cannot be empty.",
  }),
  facilityAddress: z.string().min(1, {
    message: "Address cannot be empty.",
  }),
  shifts: z.array(shiftSchema),
});

type CreateInvoiceFormValues = z.infer<typeof createInvoiceSchema>;

interface CreateInvoiceFormProps {
  createInvoiceData: CreateInvoiceData;
}

const transformShifts = (shifts: CreateInvoiceShift[]) => {
  return shifts.map((shift) => ({
    dateOfService: shift.start,
    serviceDetails: "N/A",
    employee: `${shift.staffProfile.firstname} ${shift.staffProfile.lastname}`,
    in: shift.clockInTime.toISOString().split("T")[1].slice(0, 5),
    out: shift.clockOutTime.toISOString().split("T")[1].slice(0, 5),
    hoursWorked:
      (shift.clockOutTime.getTime() - shift.clockInTime.getTime()) /
      (1000 * 60 * 60),
  }));
};

const CreateInvoiceForm: React.FC<CreateInvoiceFormProps> = ({
  createInvoiceData,
}) => {
  const defaultValues: Partial<CreateInvoiceFormValues> = {
    facilityName: createInvoiceData.facilityName,
    facilityAddress: createInvoiceData.facilityAddress,
    shifts: transformShifts(createInvoiceData.shifts || []),
  };

  const form = useForm<CreateInvoiceFormValues>({
    resolver: zodResolver(createInvoiceSchema),
    defaultValues,
    mode: "onChange",
  });

  const { fields, append, remove } = useFieldArray({
    control: form.control,
    name: "shifts",
  });

  function onSubmit(data: any) {
    toast({
      title: "You submitted the following values:",
      description: (
        <pre className="mt-2 w-[340px] rounded-md bg-slate-950 p-4">
          <code className="text-white">{JSON.stringify(data, null, 2)}</code>
        </pre>
      ),
    });
  }

  return (
    <div className="flex bg-gray-100">
      <div className="w-1/3">
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="p-5 space-y-2"
          >
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
            <p className="font-bold text-xl mt-4">Shifts</p>
            <div className="overflow-scroll h-96 shadow-inner">
              {fields.map((field, index) => (
                <div key={field.id} className="border p-2 my-2">
                  <p>Shift #{index + 1}</p>
                  {/* <FormField
                    control={form.control}
                    name={`shifts.${index}.dateOfService`}
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Date of Service</FormLabel>
                        <FormControl>
                          <Input
                            className="bg-white"
                            placeholder="Date of Service"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  /> */}
                  <FormField
                    control={form.control}
                    name={`shifts.${index}.dateOfService`}
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Date of Service</FormLabel>
                        <FormControl>
                          <Input
                            type="date"
                            className="bg-white w-fit"
                            placeholder="Date of Service"
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
                    <FormField
                      control={form.control}
                      name={`shifts.${index}.hoursWorked`}
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Hours Worked</FormLabel>
                          <FormControl>
                            <Input
                              type="number"
                              step="0.01"
                              className="bg-white"
                              placeholder="Hours Worked"
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
                  </div>

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
                onClick={() =>
                  append({
                    dateOfService: new Date(),
                    serviceDetails: "",
                    employee: "",
                    in: "",
                    out: "",
                    hoursWorked: 0,
                  })
                }
              >
                <Plus className="text-primary" />
              </Button>
            </div>

            {/* <Button type="submit">Update profile</Button> */}
          </form>
        </Form>
      </div>
      <div className="w-2/3">
        <InvoicePreview
          facilityName={form.watch("facilityName")}
          facilityAddress={form.watch("facilityAddress")}
          shifts={form.watch("shifts")}
          createInvoiceData={createInvoiceData}
        />
      </div>
    </div>
  );
};

export default CreateInvoiceForm;
