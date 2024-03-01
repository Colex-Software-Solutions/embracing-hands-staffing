import { Metadata } from "next";
import { jobPostProvider } from "@/app/providers/jobPostProvider";
import { getServerSession } from "@/lib/getServerSession";
import JobPostsManager from "./components/JobPostsManager";

export const metadata: Metadata = {
  title: "Staff",
  description: "Allows admin user to view and manage staff users.",
};

export interface StaffUser {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  status: string;
  phone: string;
}

async function getJobPosts(id: string) {
  try {
    const jobPosts = await jobPostProvider.getJobPostsPerFacility(id);
    return jobPosts;
  } catch (error) {
    console.error("server error");
    return [];
  }
}

export default async function StaffPage() {
  const session = await getServerSession();
  const jobPosts = await getJobPosts(session?.user?.facilityProfile.id);

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
