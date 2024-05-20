import { Button } from "@/app/components/ui/button";
import { jobPostProvider } from "@/app/providers/jobPostProvider";
import Link from "next/link";

interface FacilityInvoicesPageProps {
  params: {
    jobId: string;
  };
}

const FacilityInvoicesPage = async ({ params }: FacilityInvoicesPageProps) => {
  const { jobId } = params;

  return (
    <div>
      <h1>Invoices for Facility {jobId}</h1>
      <Link href={`/admin/jobs/${jobId}/invoices/create`}>
        <Button variant="default">New Invoice</Button>
      </Link>
    </div>
  );
};

export default FacilityInvoicesPage;
