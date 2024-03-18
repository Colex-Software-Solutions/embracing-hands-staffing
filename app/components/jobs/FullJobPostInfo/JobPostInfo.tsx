import { JobPostInfoType } from "./FullJobPostInfo";

interface JobPostInfoProps extends JobPostInfoType {}

const JobPostInfo: React.FC<JobPostInfoProps> = ({
  title,
  descriptions,
  icon,
}) => {
  return (
    <div className="flex">
      <div className="flex flex-col mt-1">{icon}</div>
      <div className="flex flex-col px-3">
        <p className="text-lg">{title}</p>
        {descriptions.map((description) => (
          <p className="text-gray-500">{description}</p>
        ))}
      </div>
    </div>
  );
};

export default JobPostInfo;
