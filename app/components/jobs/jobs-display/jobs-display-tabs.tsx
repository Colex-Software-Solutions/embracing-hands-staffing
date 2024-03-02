import { Dispatch, SetStateAction } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../../ui/tabs";
import EmptyTabContent from "./empty-tab-content";
import JobCard, { Job } from "./job-card";

interface JobDisplayTabsProps {
  jobs: Job[];
  window: "jobs" | "favorites";
  setWindow: Dispatch<SetStateAction<"jobs" | "favorites">>;
  setJobs: Dispatch<SetStateAction<Job[]>>;
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
}) => {
  const favoriteJobs = jobs.filter((job) => job.isFavorite === true);

  const handleChange = (newWindow: string) => {
    if (newWindow === "jobs" || newWindow === "favorites") {
      setWindow(newWindow);
    }
  };

  const handleFavoriteChange = (input: HandleFavoriteChange) => {
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
              <JobCard {...job} handleFavoriteChange={handleFavoriteChange} />
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
              <JobCard {...job} handleFavoriteChange={handleFavoriteChange} />
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
