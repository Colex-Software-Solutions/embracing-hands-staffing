import { FetchedJobPost } from "@/app/(staff)/job-posts/[id]/page";
import { formatCurrency, formatDate } from "@/lib/utils";
import FullJobPostDivider from "./FullJobPostDivider";
import { Calendar, Clock, Home, MapPin, SquareUser } from "lucide-react";
import { ReactNode } from "react";
import JobPostInfo from "./JobPostInfo";
import JobPostCompensationInfo from "./JobPostCompensationInfo";
import FullJobPostCTAButtons from "./FullJobPostCTAButtons";
import FullJobPostAdditionalDetails from "./FullJobPostAdditionalDetails";

export interface JobPostInfoType {
  title: string;
  descriptions: string[];
  icon: ReactNode;
}

export interface JobPostCompensationInfoType {
  title: string;
  descriptions: string[];
  amount: number;
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
      descriptions: [formatDate(jobPost.startDate)],
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
    {
      title: "Housing/M&IE Stipends",
      descriptions: [
        "Non-taxable income for housing, meals & incidental expenses",
      ],
      icon: <Home />,
    },
  ];

  const jobPostsCompensationInfo: JobPostCompensationInfoType[] = [
    {
      title: "Tax Free Stipend",
      descriptions: [`M&IE: ${formatCurrency(jobPost.mie)}/day`],
      amount: jobPost.paymentPerDay * 5 * 0.7,
    },
    {
      title: "Taxable Income",
      descriptions: [],
      amount: jobPost.paymentPerDay * 5 * 0.3,
    },
    {
      title: "Estimated Weekly Pay",
      descriptions: ["40 hrs/week"],
      amount: jobPost.paymentPerDay * 5,
    },
    {
      title: "Boost",
      descriptions: ["Sign on bonus"],
      amount: jobPost.bonus,
    },
  ];

  return (
    <div className="flex flex-col w-full max-w-2xl p-5 mb-20">
      <p className="font-bold text-xl">
        {formatCurrency(jobPost.paymentPerDay)}/day +{" "}
        {formatCurrency(jobPost.bonus)} Boost
      </p>
      <p className="text-gray-500">{jobPost.title}</p>
      <FullJobPostDivider />
      <div className="flex flex-col gap-5">
        {jobPostsInfo.map((jobPostInfo) => (
          <JobPostInfo key={jobPostInfo.title} {...jobPostInfo} />
        ))}
      </div>
      <FullJobPostDivider />
      <p className="text-xl">Compensation</p>
      <div className="flex flex-col gap-5 mt-5">
        {jobPostsCompensationInfo.map((jobPostCompensationInfo) => (
          <JobPostCompensationInfo
            key={jobPostCompensationInfo.title}
            {...jobPostCompensationInfo}
          />
        ))}
      </div>
      <FullJobPostCTAButtons
        jobPostId={jobPost.id}
        facilityProfile={jobPost.facilityProfile}
      />
      <FullJobPostDivider />
      <FullJobPostAdditionalDetails {...jobPost} />
    </div>
  );
};

export default FullJobPostInfo;
