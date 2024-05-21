"use client";
import React, { useState } from "react";
import CreateInvoiceBanner from "./create-invoice-banner";
import CreateInvoiceForm from "./create-invoice-form";
import { CreateInvoiceData } from "../../create/page";
import { CreateInvoiceFormValues } from "../../../../data/schema";
import { Loader } from "lucide-react";

interface CreateFormProps {
  jobId: string;
  createInvoiceData: CreateInvoiceData;
  defaultValues: Partial<CreateInvoiceFormValues>;
}

const CreateForm: React.FC<CreateFormProps> = ({
  jobId,
  createInvoiceData,
  defaultValues,
}) => {
  const [isDisabled, setIsDisabled] = useState<boolean>(
    defaultValues.shifts?.length === 0
  );
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [submit, setSubmit] = useState(false);

  return (
    <div className="relative">
      {isLoading && (
        <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <Loader className="text-white animate-spin" size={48} />
        </div>
      )}
      <CreateInvoiceBanner
        jobId={jobId}
        isDisabled={isDisabled}
        setIsLoading={setIsLoading}
        setSubmit={setSubmit}
      />
      <CreateInvoiceForm
        jobId={jobId}
        createInvoiceData={createInvoiceData}
        defaultValues={defaultValues}
        setIsDisabled={setIsDisabled}
        submit={submit}
        setIsLoading={setIsLoading}
        setSubmit={setSubmit}
      />
    </div>
  );
};

export default CreateForm;
