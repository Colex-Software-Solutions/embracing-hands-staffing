import { FullJobPostInfo } from "@/app/components/jobs/FullJobPostInfo";
import { StartApplicationModal } from "@/app/components/modals/startApplicationModal";
import { jobPostProvider } from "@/app/providers/jobPostProvider";

export interface FetchedJobPost {
  id: string;
  facilityId: string;
  title: string;
  description: string;
  paymentPerDay: number;
  parkingPay: number;
  scrubsProvided: boolean;
  experience: string;
  location: string;
  shifts: string;
  startDate: Date;
  endDate: Date;
  housing: string;
  procedures: string[];
  patientPopulation: string;
  mie: number;
  bonus: number;
  tags: string[];
  createdAt: Date;
}

const JobPostPage = async ({ params }: { params: { id: string } }) => {
  const jobPostId = params.id;
  const jobPost = (await jobPostProvider.getJobPostById(
    jobPostId
  )) as FetchedJobPost;

  return (
    <div className="flex justify-center relative">
      <FullJobPostInfo jobPost={jobPost} />
      <div className="flex justify-center fixed inset-x-0 bottom-0 bg-white py-5 shadow-lg">
        <StartApplicationModal jobPostId={jobPostId} />
      </div>
    </div>
  );
};

export default JobPostPage;
