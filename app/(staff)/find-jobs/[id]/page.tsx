import JobsDisplayContainer from "@/app/components/jobs";
import { jobPostProvider } from "@/app/providers/jobPostProvider";
import { staffProvider } from "@/app/providers/staffProvider";
import { weeksBetween } from "@/lib/utils";
import { StaffProfile } from "@prisma/client";
import { useSession } from "next-auth/react";

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
  fetchedJobPosts: FetchedJobPost[],
  staffProfile: StaffProfile | null
): Job[] => {
  if (staffProfile) {
    return fetchedJobPosts.map((fetchedJobPost) => {
      return {
        id: fetchedJobPost.id,
        title: fetchedJobPost.title,
        location: fetchedJobPost.location,
        paymentPerDay: fetchedJobPost.paymentPerDay,
        shift: fetchedJobPost.shifts,
        createdAt: fetchedJobPost.createdAt,
        duration: weeksBetween(
          fetchedJobPost.startDate,
          fetchedJobPost.endDate
        ),
        startDate: fetchedJobPost.startDate,
        isFavorite: staffProfile.favoriteJobPostIds.includes(fetchedJobPost.id),
      };
    });
  }

  return [];
};

const FindJobsPage = async ({ params }: { params: { id: string } }) => {
  const fetchedJobPosts =
    (await jobPostProvider.getAllValidJobPosts()) as FetchedJobPost[];
  const staffProfile = await staffProvider.getStaffProfile(params.id);
  const jobs = mapFetchedJobPostToJobPost(fetchedJobPosts, staffProfile);

  if (!staffProfile) {
    return (
      <div className="flex justify-center mt-10">
        <p className="bg-red-300 border-2 border-red-500 p-5 text-white">
          Profile information could not be retrieved
        </p>
      </div>
    );
  }

  return (
    <div className="flex justify-center">
      <JobsDisplayContainer
        initialJobs={jobs}
        favoriteJobPostIds={staffProfile.favoriteJobPostIds}
        staffProfileId={params.id}
      />
    </div>
  );
};

export default FindJobsPage;
