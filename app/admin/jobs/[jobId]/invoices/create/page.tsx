import { jobPostProvider } from "@/app/providers/jobPostProvider";
import CreateInvoiceBanner from "../components/create-invoice/create-invoice-banner";
import CreateInvoiceForm from "../components/create-invoice/create-invoice-form";
import { differenceInHours } from "date-fns";

interface CreateInvoicePageProps {
  params: {
    jobId: string;
  };
}

export interface CreateInvoiceData {
  facilityName: string;
  facilityAddress: string;
  shifts: CreateInvoiceShift[];
}

interface CreateInvoiceShiftStaffProfile {
  firstname: string;
  lastname: string;
}

export interface CreateInvoiceShift {
  id: string;
  jobPostId: string;
  staffProfileId: string;
  staffProfile: CreateInvoiceShiftStaffProfile;
  start: Date;
  end: Date;
  status: string;
  clockInTime: Date;
  clockOutTime: Date;
  createdAt: Date;
  updatedAt: Date;
}

const mapFetchedDataToCreateInvoiceData = (input: any): CreateInvoiceData => {
  return {
    facilityName: input.facilityProfile.name,
    facilityAddress: input.facilityProfile.address,
    shifts: input.shifts,
  };
};

async function getCreateInvoiceData(id: string) {
  try {
    const jobPosts = await jobPostProvider.getJobPostInvoiceDataById(id);

    return mapFetchedDataToCreateInvoiceData(jobPosts);
  } catch (error) {
    console.log(error);
    console.error("server error");
    return;
  }
}

const CreateInvoicePage = async ({ params }: CreateInvoicePageProps) => {
  const { jobId } = params;
  const createInvoiceData = await getCreateInvoiceData(jobId);

  if (!createInvoiceData) {
    return (
      <div className="flex-col w-full">
        <p>Failed to load invoice data</p>
      </div>
    );
  }
  console.log(createInvoiceData.shifts);

  return (
    <div className="flex-col w-full">
      <CreateInvoiceBanner jobId={jobId} />
      <CreateInvoiceForm createInvoiceData={createInvoiceData} />
    </div>
  );
};

export default CreateInvoicePage;
