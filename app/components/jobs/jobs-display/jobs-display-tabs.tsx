import { Dispatch, SetStateAction, useCallback, useRef } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../../ui/tabs";
import dynamic from "next/dynamic";
const EmptyTabContent = dynamic(() => import("./empty-tab-content"), {
  ssr: false,
});
const JobCard = dynamic(() => import("./job-card"), { ssr: false });
import { Job } from "@/app/(staff)/find-jobs/[id]/page";
import axios from "axios";
import { debounce } from "@/lib/utils";

interface JobDisplayTabsProps {
  jobs: Job[];
  window: "jobs" | "favorites";
  setWindow: Dispatch<SetStateAction<"jobs" | "favorites">>;
  setJobs: Dispatch<SetStateAction<Job[]>>;
  staffProfileId: string;
}

export interface HandleFavoriteChange {
  id: string;
  isCurrentFavorite: boolean;
}

const JobDisplayTabs: React.FC<JobDisplayTabsProps> = ({
  jobs,
  window,
  setWindow,
  setJobs,
  staffProfileId,
}) => {
  const jobsRef = useRef<Job[]>(jobs);
  jobsRef.current = jobs;

  const favoriteJobs = jobs.filter((job) => job.isFavorite === true);

  const handleChange = (newWindow: string) => {
    if (newWindow === "jobs" || newWindow === "favorites") {
      setWindow(newWindow);
    }
  };

  const updateJobsState = (input: HandleFavoriteChange) => {
    const updatedJobs = jobs.map((job) => {
      if (job.id === input.id) {
        return {
          ...job,
          isFavorite: !input.isCurrentFavorite,
        };
      }

      return job;
    });

    setJobs(updatedJobs);
  };

  const updateFavoriteJobPostsApi = async () => {
    let newFavoriteJobsArray: string[] = jobsRef.current
      .filter((job) => job.isFavorite === true)
      .map((job) => job.id);

    await axios.put(`/api/staff/${staffProfileId}`, {
      favoriteJobPostIds: newFavoriteJobsArray,
    });
  };

  const debouncedUpdateFavoriteJobPostsApi = useCallback(
    debounce(updateFavoriteJobPostsApi, 1500),
    []
  );

  const handleFavoriteChange = async (input: HandleFavoriteChange) => {
    updateJobsState(input);

    debouncedUpdateFavoriteJobPostsApi();
  };

  return (
    <Tabs value={window} onValueChange={handleChange}>
      <TabsList className="w-full flex gap-5">
        <TabsTrigger className="w-full text-center" value="jobs">
          Jobs
        </TabsTrigger>
        {/* <TabsTrigger className="w-1/2 text-center" value="favorites">
          Favorite(s)
        </TabsTrigger> */}
      </TabsList>
      <TabsContent value="jobs" className="max-h-screen h-2/3 overflow-scroll">
        {jobs.length > 0 ? (
          jobs.map((job) => {
            return (
              <JobCard
                key={job.id}
                {...job}
                handleFavoriteChange={handleFavoriteChange}
              />
            );
          })
        ) : (
          <EmptyTabContent />
        )}
      </TabsContent>
      <TabsContent
        value="favorites"
        className="max-h-screen h-2/3 overflow-scroll"
      >
        {favoriteJobs.length > 0 ? (
          favoriteJobs.map((job) => {
            return (
              <JobCard
                key={job.id}
                {...job}
                handleFavoriteChange={handleFavoriteChange}
              />
            );
          })
        ) : (
          <EmptyTabContent />
        )}
      </TabsContent>
    </Tabs>
  );
};

export default JobDisplayTabs;
