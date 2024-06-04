import { Metadata } from "next";
import { jobPostProvider } from "@/app/providers/jobPostProvider";
import { getServerSession } from "@/lib/getServerSession";
import JobPostsManager from "./components/JobPostsManager";
import Script from "next/script";
import { Loader } from "@googlemaps/js-api-loader";

const loader = new Loader({
  apiKey: `${process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY}`,
  version: "weekly",
});

export const metadata: Metadata = {
  title: "Jobs",
  description: "Facility can view all their job posts",
};

export interface FacilityJobPost {
  id: string;
  facilityName: string;
  title: string;
  startDate: string;
  endDate: string;
  createdAt: string;
}

const mapFetchedJobPostsToFacilityJobPosts = (
  fetchedJobPosts: any[]
): FacilityJobPost[] =>
  fetchedJobPosts.map((fetchedJobPost) => {
    return {
      id: fetchedJobPost.id,
      title: fetchedJobPost.title,
      facilityName: fetchedJobPost.facilityProfile.name,
      startDate: fetchedJobPost.startDate,
      endDate: fetchedJobPost.endDate,
      createdAt: fetchedJobPost.createdAt,
    };
  });

async function getJobPosts() {
  try {
    const jobPosts = await jobPostProvider.getAllJobPosts();

    return mapFetchedJobPostsToFacilityJobPosts(jobPosts);
  } catch (error) {
    console.log(error);
    console.error("server error");
    return [];
  }
}

export default async function JobsPage() {
  const session = await getServerSession();
  const jobPosts = await getJobPosts();

  return (
    <>
      <script
        async
        src={`https://maps.googleapis.com/maps/api/js?key=${process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY}&libraries=places`}
        // strategy="afterInteractive"
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
