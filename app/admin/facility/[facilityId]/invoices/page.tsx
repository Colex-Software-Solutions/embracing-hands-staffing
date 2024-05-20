import { Button } from "@/app/components/ui/button";
import Link from "next/link";

interface FacilityInvoicesPageProps {
  params: {
    facilityId: string;
  };
}

const FacilityInvoicesPage = ({ params }: FacilityInvoicesPageProps) => {
  const { facilityId } = params;

  return (
    <div>
      <h1>Invoices for Facility {facilityId}</h1>
      <Link href={`/admin/facility/${facilityId}/invoices/create`}>
        <Button variant="default">New Invoice</Button>
      </Link>
    </div>
  );
};

export default FacilityInvoicesPage;
