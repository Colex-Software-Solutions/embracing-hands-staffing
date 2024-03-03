import JobsDisplayContainer from "@/app/components/jobs";
import { jobPostProvider } from "@/app/providers/jobPostProvider";
import { weeksBetween } from "@/lib/utils";

export interface Job {
  id: string;
  title: string;
  location: string;
  startDate: Date;
  duration: string;
  shift: string;
  paymentPerDay: number;
  isFavorite?: boolean;
  createdAt: Date;
}

interface FetchedJobPost {
  id: string;
  title: string;
  location: string;
  paymentPerDay: number;
  shifts: string;
  startDate: Date;
  endDate: Date;
  createdAt: Date;
}

const mapFetchedJobPostToJobPost = (
  fetchedJobPosts: FetchedJobPost[]
): Job[] => {
  return fetchedJobPosts.map((fetchedJobPost) => {
    return {
      id: fetchedJobPost.id,
      title: fetchedJobPost.title,
      location: fetchedJobPost.location,
      paymentPerDay: fetchedJobPost.paymentPerDay,
      shift: fetchedJobPost.shifts,
      createdAt: fetchedJobPost.createdAt,
      duration: weeksBetween(fetchedJobPost.startDate, fetchedJobPost.endDate),
      startDate: fetchedJobPost.startDate,
      isFavorite: false,
    };
  });
};

const FindJobsPage = async () => {
  const fetchedJobPosts =
    (await jobPostProvider.getAllJobPosts()) as FetchedJobPost[];
  const jobs = mapFetchedJobPostToJobPost(fetchedJobPosts);

  console.log({ jobs });
  return (
    <div className="flex justify-center">
      <JobsDisplayContainer initialJobs={jobs} />
    </div>
  );
};

export default FindJobsPage;
