import { X } from "lucide-react";
import Link from "next/link";

interface CreateInvoiceBannerProps {
  jobId: string;
}

const CreateInvoiceBanner: React.FC<CreateInvoiceBannerProps> = ({ jobId }) => {
  return (
    <div className="flex justify-between w-full p-3 bg-secondary">
      <div className="flex gap-2">
        <Link href={`/admin/jobs/${jobId}/invoices`}>
          <X width={18} />
        </Link>

        <div className="text-gray-500">|</div>
        <p>Create a new invoice</p>
      </div>
    </div>
  );
};

export default CreateInvoiceBanner;
