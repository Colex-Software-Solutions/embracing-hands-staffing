import { jobPostProvider } from "@/app/providers/jobPostProvider";
import CreateForm from "../components/create-invoice/create-form";
import { CreateInvoiceFormValues } from "../../../data/schema";
import { createInvoiceSchema } from "../../../data/schema";
import { invoiceProvider } from "@/app/providers/invoiceProvider";
import { getSkillPayAmount } from "@/lib/utils";

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
  skills: string[];
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

const transformShifts = (shifts: CreateInvoiceShift[]) => {
  return shifts.map((shift) => ({
    dateOfService: shift.start,
    serviceDetails: "N/A",
    employee: `${shift.staffProfile.firstname} ${shift.staffProfile.lastname}`,
    in: shift.clockInTime.toISOString().split("T")[1].slice(0, 5),
    out: shift.clockOutTime.toISOString().split("T")[1].slice(0, 5),
    hourlyRate: getSkillPayAmount(
      shift.staffProfile.skills[0],
      shift.clockInTime
    ), // TODO to update when skills is updated to only 1 skill
    hoursWorked: parseFloat(
      (
        (shift.clockOutTime.getTime() - shift.clockInTime.getTime()) /
        (1000 * 60 * 60)
      ).toFixed(2)
    ),
  }));
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
    shifts: transformShifts(createInvoiceData.shifts || []),
    cardPayment: false,
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
