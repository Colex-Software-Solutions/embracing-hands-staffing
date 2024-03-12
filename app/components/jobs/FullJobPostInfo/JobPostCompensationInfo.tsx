import { formatCurrency } from "@/lib/utils";
import { JobPostCompensationInfoType } from "./FullJobPostInfo";

interface JobPostCompensationInfoProps extends JobPostCompensationInfoType {}

const JobPostCompensationInfo: React.FC<JobPostCompensationInfoProps> = ({
  title,
  descriptions,
  amount,
}) => {
  return (
    <div className="flex flex-col">
      <div className="flex justify-between">
        <p>{title}</p>
        <p>{formatCurrency(amount, 2)}</p>
      </div>
      {descriptions.map((description) => (
        <p className="text-gray-500">{description}</p>
      ))}
    </div>
  );
};

export default JobPostCompensationInfo;
