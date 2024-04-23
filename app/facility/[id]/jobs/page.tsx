import { Metadata } from "next";
import { jobPostProvider } from "@/app/providers/jobPostProvider";
import { getServerSession } from "@/lib/getServerSession";
import JobPostsManager from "./components/JobPostsManager";
import Script from "next/script";

export const metadata: Metadata = {
  title: "Jobs",
  description: "Facility can view all their job posts",
};

async function getJobPosts(id: string) {
  try {
    const jobPosts = await jobPostProvider.getJobPostsPerFacility(id);
    return jobPosts;
  } catch (error) {
    console.error("server error");
    return [];
  }
}

export default async function JobsPage() {
  const session = await getServerSession();
  const jobPosts = await getJobPosts(session?.user?.facilityProfile.id);

  return (
    <>
      <Script
        src={`https://maps.googleapis.com/maps/api/js?key=${process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY}&libraries=places`}
        strategy="beforeInteractive"
      />
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
