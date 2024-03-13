import { FetchedJobPost } from "@/app/(staff)/job-posts/[id]/page";
import { Briefcase, ParkingCircle, Shirt } from "lucide-react";

interface FullJobPostAdditionalDetailsProps extends FetchedJobPost {}

const FullJobPostAdditionalDetails: React.FC<
  FullJobPostAdditionalDetailsProps
> = (props) => {
  const { description, experience, parkingPay, scrubsProvided } = props;

  return (
    <div className="flex flex-col">
      <p className="text-xl">Additional Job Details</p>
      <p>{description}</p>
      <div className="flex flex-col gap-2 mt-2">
        <div className="flex gap-5">
          <Briefcase /> {experience}
        </div>
        <div className="flex gap-5">
          <ParkingCircle /> {parkingPay}
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
