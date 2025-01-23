import { FetchedJobPost } from "@/app/(staff)/job-posts/[id]/page";
import { formatDate } from "@/lib/utils";
import FullJobPostDivider from "./FullJobPostDivider";
import { Calendar, Clock, Home, MapPin, SquareUser } from "lucide-react";
import { ReactNode } from "react";
import JobPostInfo from "./JobPostInfo";
import FullJobPostCTAButtons from "./FullJobPostCTAButtons";
import FullJobPostAdditionalDetails from "./FullJobPostAdditionalDetails";

export interface JobPostInfoType {
  title: string;
  descriptions: string[];
  icon: ReactNode;
}

interface FullJobPostInfoProps {
  jobPost: FetchedJobPost;
}

const FullJobPostInfo: React.FC<FullJobPostInfoProps> = ({ jobPost }) => {
  const jobPostsInfo: JobPostInfoType[] = [
    {
      title: "Location",
      descriptions: [jobPost.location],
      icon: <MapPin />,
    },
    {
      title: "Tentative Start Date",
      descriptions: [formatDate(new Date(jobPost.startDate))],
      icon: <Calendar />,
    },
    {
      title: "Shift",
      descriptions: [jobPost.shiftsTime, "Actual shift times may vary"],
      icon: <Clock />,
    },
    {
      title: "Patient Population",
      descriptions: [jobPost.patientPopulation],
      icon: <SquareUser />,
    },
  ];

  return (
    <div className="flex flex-col w-full max-w-2xl p-5 mb-20">
      <p className="text-gray-500">{jobPost.title}</p>
      <FullJobPostDivider />
      <div className="flex flex-col gap-5">
        {jobPostsInfo.map((jobPostInfo) => (
          <JobPostInfo key={jobPostInfo.title} {...jobPostInfo} />
        ))}
      </div>
      {/* <FullJobPostDivider />
      <FullJobPostCTAButtons
        jobPostId={jobPost.id}
        facilityProfile={jobPost.facilityProfile}
      /> */}
      <FullJobPostDivider />
      <FullJobPostAdditionalDetails {...jobPost} />
    </div>
  );
};

export default FullJobPostInfo;
