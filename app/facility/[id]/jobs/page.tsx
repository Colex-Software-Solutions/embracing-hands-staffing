import { Metadata } from "next";
import { jobPostProvider } from "@/app/providers/jobPostProvider";
import { getServerSession } from "@/lib/getServerSession";
import dynamic from "next/dynamic";
import Script from "next/script";

const JobPostsManager = dynamic(() => import("./components/JobPostsManager"), {
  ssr: false,
});

export const metadata: Metadata = {
  title: "Jobs",
  description: "Facility can view all their job posts",
};

async function getJobPosts(id: string) {
  try {
    const jobPosts = await jobPostProvider.getJobPostsPerFacility(id);
    return jobPosts;
  } catch (error) {
    console.log(error);
    console.error("server error");
    return [];
  }
}

export default async function JobsPage() {
  const session = await getServerSession();
  if (session?.user.status !== "APPROVED") {
    return (
      <h2 className="text-2xl font-bold tracking-tight">
        You are not allowed to access this page until you get approved by admin
      </h2>
    );
  }
  const jobPosts = await getJobPosts(session?.user?.facilityProfile?.id);

  return (
    <>
      <div className="h-full flex-1 flex-col space-y-8 p-8 flex">
        <div className="flex items-center justify-between space-y-2">
          <div>
            <h2 className="text-2xl font-bold tracking-tight">Job Posts</h2>
            <p className="text-muted-foreground">
              Manage current and previous job posts here.
            </p>
          </div>
        </div>

        <JobPostsManager initialJobPosts={jobPosts} />
      </div>
    </>
  );
}
