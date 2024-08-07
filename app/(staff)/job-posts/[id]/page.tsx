import { FullJobPostInfo } from "@/app/components/jobs/FullJobPostInfo";
import dynamic from "next/dynamic";
const StartApplicationModal = dynamic(
  () => import("@/app/components/modals/startApplicationModal")
);
import { jobApplicationProvider } from "@/app/providers/jobApplicationProvider";
import { jobPostProvider } from "@/app/providers/jobPostProvider";

interface UserProfile {
  email: string;
}

export interface FacilityProfile {
  name: string;
  user: UserProfile;
}

export interface AppliedStaffProfile {
  id: string;
}

export interface AppliedStaffProfileResponse {
  staffProfile: AppliedStaffProfile;
}

export interface FetchedJobPost {
  id: string;
  facilityId: string;
  title: string;
  description: string;
  scrubsProvided: boolean;
  location: string;
  shiftsTime: string;
  startDate: string;
  endDate: string;
  housing: string;
  procedures: string[];
  patientPopulation: string;
  tags: string[];
  createdAt: Date;
  facilityProfile: FacilityProfile;
}

const JobPostPage = async ({ params }: { params: { id: string } }) => {
  const jobPostId = params.id;
  const jobPost = (await jobPostProvider.getJobPostById(
    jobPostId
  )) as unknown as FetchedJobPost;

  const appliedStaffProfiles: AppliedStaffProfileResponse[] =
    await jobApplicationProvider.getJobApplicationStaffProfiles(jobPostId);

  return (
    <div className="flex justify-center relative">
      <FullJobPostInfo jobPost={jobPost} />
      <div className="flex justify-center fixed inset-x-0 bottom-0 bg-white py-5 shadow-lg">
        <StartApplicationModal
          jobPostId={jobPostId}
          appliedStaffProfiles={appliedStaffProfiles}
        />
      </div>
    </div>
  );
};

export default JobPostPage;
