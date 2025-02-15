import { jobPostProvider } from "@/app/providers/jobPostProvider";
import CreateForm from "../components/create-invoice/create-form";
import { CreateInvoiceFormValues } from "../../../data/schema";
import { createInvoiceSchema } from "../../../data/schema";
import { invoiceProvider } from "@/app/providers/invoiceProvider";
import {
  formatTime,
  getDifferentialHoursFromHoursWorked,
  getSkillPayAmount,
} from "@/lib/utils";

interface CreateInvoicePageProps {
  params: {
    jobId: string;
  };
}

export interface CreateInvoiceData {
  facilityName: string;
  facilityAddress: string;
  shifts: CreateInvoiceShift[];
  tag: string;
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
    tag: input.tags[0],
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

const transformShifts = (shifts: CreateInvoiceShift[], tag: string) => {
  return shifts.map((shift) => {
    return {
      startDate: shift.start,
      endDate: shift.end,
      serviceDetails: "N/A",
      employee: `${shift.staffProfile.firstname} ${shift.staffProfile.lastname}`,
      in: formatTime(shift.clockInTime),
      out: formatTime(shift.clockOutTime),
      hourlyRate: getSkillPayAmount(tag, shift.clockInTime),
    };
  });
};

const CreateInvoicePage = async ({ params }: CreateInvoicePageProps) => {
  const { jobId } = params;
  const createInvoiceData = await getCreateInvoiceData(jobId);
  const newInvoiceNumber = await invoiceProvider.getNewInvoiceNumberByJobPostId(
    jobId
  );

  if (!createInvoiceData) {
    return (
      <div className="flex-col w-full">
        <p>Failed to load invoice data</p>
      </div>
    );
  }

  const defaultValues: Partial<CreateInvoiceFormValues> = {
    facilityName: createInvoiceData.facilityName,
    facilityAddress: createInvoiceData.facilityAddress,
    invoiceNumber: newInvoiceNumber,
    shifts: transformShifts(
      createInvoiceData.shifts || [],
      createInvoiceData.tag
    ),
    cardPayment: false,
    latePayment: false,
  };

  return (
    <div className="flex-col w-full">
      <CreateForm
        jobId={jobId}
        defaultValues={defaultValues}
        createInvoiceData={createInvoiceData}
      />
    </div>
  );
};

export default CreateInvoicePage;
