import { Dispatch, SetStateAction } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../../ui/tabs";
import EmptyTabContent from "./empty-tab-content";
import JobCard from "./job-card";
import { Job } from "@/app/(staff)/find-jobs/page";
import axios from "axios";

interface JobDisplayTabsProps {
  jobs: Job[];
  window: "jobs" | "favorites";
  setWindow: Dispatch<SetStateAction<"jobs" | "favorites">>;
  setJobs: Dispatch<SetStateAction<Job[]>>;
  favoriteJobPostIds: string[];
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
  favoriteJobPostIds,
}) => {
  const favoriteJobs = jobs.filter((job) => job.isFavorite === true);

  const handleChange = (newWindow: string) => {
    if (newWindow === "jobs" || newWindow === "favorites") {
      setWindow(newWindow);
    }
  };

  const handleFavoriteChange = async (input: HandleFavoriteChange) => {
    let newFavoriteJobsArray: string[];

    if (input.isCurrentFavorite) {
      newFavoriteJobsArray = favoriteJobPostIds.filter(
        (favoriteJobPostId: string) => favoriteJobPostId !== input.id
      );
    } else {
      newFavoriteJobsArray = [...favoriteJobPostIds, input.id];
    }

    const response = await axios.put(
      `/api/staff/${"65d0e2ee5075704385a8e95b"}`,
      {
        favoriteJobPostIds: newFavoriteJobsArray,
      }
    );

    if (response.data.success) {
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
    }
  };

  return (
    <Tabs value={window} onValueChange={handleChange}>
      <TabsList className="w-full flex gap-5">
        <TabsTrigger className="w-1/2 text-center" value="jobs">
          Jobs
        </TabsTrigger>
        <TabsTrigger className="w-1/2 text-center" value="favorites">
          Favorite(s)
        </TabsTrigger>
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
