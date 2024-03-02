import { formatCurrency, getFormattedDate } from "@/lib/utils";
import JobCardFavoriteIcon from "./job-card-favorite-icon";
import { HandleFavoriteChange } from "./jobs-display-tabs";

export interface Job {
  id: string;
  position: string;
  location: string;
  startDate: string;
  duration: string;
  shift: string;
  startTime: string;
  endTime: string;
  weeklyPay: number;
  isFavorite?: boolean;
  createdAt: string;
}

interface JobCardProps extends Job {
  handleFavoriteChange: (input: HandleFavoriteChange) => void;
}

const JobCard: React.FC<JobCardProps> = (props) => {
  const {
    id,
    position,
    location,
    startDate,
    duration,
    shift,
    startTime,
    endTime,
    weeklyPay,
    isFavorite,
    createdAt,
    handleFavoriteChange,
  } = props;

  return (
    <div className="flex p-5 hover:bg-slate-100">
      <div className="flex flex-col w-3/4">
        <p className="flex font-bold text-lg">{position}</p>
        <p>{location}</p>
        <p>
          {startDate} - <span className="tracking-wider">{duration}</span>
        </p>
        <p>
          {shift} Shifts,
          <span className="tracking-wide">{startTime}</span> - {endTime}
        </p>
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
          <span className="text-lg font-bold">{formatCurrency(weeklyPay)}</span>{" "}
          /week
        </p>
        <div className="text-sm text-gray-400 mt-2">
          Posted on: {getFormattedDate(createdAt)}
        </div>
      </div>
    </div>
  );
};

export default JobCard;
