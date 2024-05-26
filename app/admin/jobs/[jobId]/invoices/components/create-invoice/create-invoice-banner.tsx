import { X } from "lucide-react";
import Link from "next/link";
import { Check } from "lucide-react";
import { Button } from "@/app/components/ui/button";
import { Dispatch, SetStateAction } from "react";
import { CreateInvoiceFormValues } from "@/app/admin/jobs/data/schema";

interface CreateInvoiceBannerProps {
  jobId: string;
  isDisabled?: boolean;
  setIsLoading: Dispatch<SetStateAction<boolean>>;
  setSubmit: Dispatch<SetStateAction<boolean>>;
}

const CreateInvoiceBanner: React.FC<CreateInvoiceBannerProps> = ({
  jobId,
  isDisabled,
  setIsLoading,
  setSubmit,
}) => {
  return (
    <div className="flex justify-between w-full p-3 bg-secondary">
      <div className="flex gap-2">
        <Link href={`/admin/jobs/${jobId}/invoices`}>
          <X width={18} />
        </Link>

        <div className="text-gray-500">|</div>
        <p>Create a new invoice</p>
      </div>
      <Button
        variant="default"
        disabled={isDisabled}
        onClick={() => {
          setIsLoading(true);
          setSubmit(true);
        }}
      >
        Create invoice <Check className="ml-2" />
      </Button>
    </div>
  );
};

export default CreateInvoiceBanner;
