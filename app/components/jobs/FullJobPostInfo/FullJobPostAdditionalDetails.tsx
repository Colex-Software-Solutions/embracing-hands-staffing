import { FetchedJobPost } from "@/app/(staff)/job-posts/[id]/page";
import { Briefcase, ParkingCircle, Shirt } from "lucide-react";
import JobSkillTag from "../job-skill-tag";

interface FullJobPostAdditionalDetailsProps extends FetchedJobPost {}

const FullJobPostAdditionalDetails: React.FC<
  FullJobPostAdditionalDetailsProps
> = (props) => {
  const { description, experience, scrubsProvided, tags } = props;

  return (
    <div className="flex flex-col">
      <p className="text-xl">Additional Job Details</p>
      <div className="flex flex-wrap gap-2 mt-1">
        Tags:{" "}
        {tags.map((tag) => (
          <JobSkillTag>{tag}</JobSkillTag>
        ))}
      </div>
      <p>Description: {description}</p>
      <div className="flex flex-col gap-2 mt-2">
        <div className="flex gap-5">
          <Briefcase /> {experience}
        </div>
        <div className="flex gap-5">
          <Shirt />{" "}
          {scrubsProvided ? "Srubs are provided" : "Shrubs are NOT provided"}
        </div>
      </div>
    </div>
  );
};

export default FullJobPostAdditionalDetails;
