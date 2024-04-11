import { formatCurrency, formatDate } from "@/lib/utils";
import JobCardFavoriteIcon from "./job-card-favorite-icon";
import { HandleFavoriteChange } from "./jobs-display-tabs";
import { Job } from "@/app/(staff)/find-jobs/[id]/page";
import Link from "next/link";
import JobSkillTag from "../job-skill-tag";

interface JobCardProps extends Job {
  handleFavoriteChange: (input: HandleFavoriteChange) => void;
}

const JobCard: React.FC<JobCardProps> = (props) => {
  const {
    id,
    title,
    location,
    startDate,
    duration,
    shift,
    paymentPerDay,
    isFavorite,
    createdAt,
    tags,
    handleFavoriteChange,
  } = props;

  return (
    <Link href={`/job-posts/${id}`} className="flex p-5 hover:bg-slate-100">
      <div className="flex flex-col w-3/4">
        <p className="flex font-bold text-lg">{title}</p>
        <p>{location}</p>
        <p>
          {startDate} - <span className="tracking-wider">{duration}</span>
        </p>
        <p>{shift}</p>
        <div className="flex gap-2 flex-wrap">
          {tags.map((tag) => (
            <JobSkillTag>{tag}</JobSkillTag>
          ))}
        </div>
      </div>
      <div className="flex flex-col w-1/4 items-end">
        <div
          onClick={() =>
            handleFavoriteChange({ id, isCurrentFavorite: isFavorite ?? false })
          }
        >
          <JobCardFavoriteIcon isFavorite={isFavorite || false} />
        </div>
        <p className="text-green-800 mt-5">
          <span className="text-lg font-bold">
            {formatCurrency(paymentPerDay)}
          </span>{" "}
          /day
        </p>
        <div className="text-sm text-gray-400 mt-2">
          Posted on: {formatDate(createdAt)}
        </div>
      </div>
    </Link>
  );
};

export default JobCard;
