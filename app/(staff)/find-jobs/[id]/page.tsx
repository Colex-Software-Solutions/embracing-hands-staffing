import JobsDisplayContainer from "@/app/components/jobs";
import { blockNurseProvider } from "@/app/providers/blockNurseProvider";
import { jobPostProvider } from "@/app/providers/jobPostProvider";
import { staffProvider } from "@/app/providers/staffProvider";
import { weeksBetween } from "@/lib/utils";
import { BlockedNurse, StaffProfile } from "@prisma/client";
import { redirect } from "next/navigation";

export interface Job {
  id: string;
  title: string;
  location: string;
  startDate: string;
  duration: string;
  shift: string;
  isFavorite?: boolean;
  createdAt: Date;
  tags: string[];
}

interface FetchedJobPost {
  id: string;
  title: string;
  location: string;
  shiftsTime: string;
  startDate: string;
  endDate: string;
  createdAt: Date;
  tags: string[];
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
        shift: fetchedJobPost.shiftsTime,
        createdAt: fetchedJobPost.createdAt,
        duration: weeksBetween(
          fetchedJobPost.startDate,
          fetchedJobPost.endDate
        ),
        startDate: fetchedJobPost.startDate,
        isFavorite: staffProfile.favoriteJobPostIds.includes(fetchedJobPost.id),
        tags: fetchedJobPost.tags,
      };
    });
  }

  return [];
};

const FindJobsPage = async ({ params }: { params: { id: string } }) => {
  const staffProfile = await staffProvider.getStaffProfile(params.id);
  if (!staffProfile?.profileSetupComplete) {
    redirect(`/staff/${params.id}/profile`);
  }
  const fetchedJobPosts = (await jobPostProvider.getAllValidJobPosts(
    staffProfile?.id
  )) as FetchedJobPost[];
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
        userTags={staffProfile.skills}
      />
    </div>
  );
};

export default FindJobsPage;
