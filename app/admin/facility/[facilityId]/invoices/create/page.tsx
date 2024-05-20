import CreateInvoiceBanner from "../components/create-invoice/create-invoice-banner";
import CreateInvoiceForm from "../components/create-invoice/create-invoice-form";

interface CreateInvoicePageProps {
  params: {
    facilityId: string;
  };
}

const CreateInvoicePage = ({ params }: CreateInvoicePageProps) => {
  const { facilityId } = params;

  return (
    <div className="flex-col w-full">
      <CreateInvoiceBanner facilityId={facilityId} />
      <CreateInvoiceForm />
    </div>
  );
};

export default CreateInvoicePage;
