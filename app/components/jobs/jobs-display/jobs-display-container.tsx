"use client";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../../ui/select";
import { useEffect, useState } from "react";
import JobDisplayTabs from "./jobs-display-tabs";
import { Job } from "@/app/(staff)/find-jobs/[id]/page";

const sortByNewestToOldest = (jobs: Job[]): Job[] =>
  jobs.sort(
    (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
  );

const sortByOldestToNewest = (jobs: Job[]): Job[] =>
  jobs.sort(
    (a, b) => new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime()
  );

const sortByRelevance = (jobPosts: Job[], userTags: string[]): Job[] => {
  const commonElementsCount = (array: string[]): number => {
    return array.filter((element) => userTags.includes(element)).length;
  };

  const sortedJobs = jobPosts.sort(
    (a, b) => commonElementsCount(b.tags) - commonElementsCount(a.tags)
  );
  return sortedJobs;
};

// const fetchedJobs: Job[] = sampleData as Job[];

interface JobsDisplayContainerProps {
  initialJobs: Job[];
  favoriteJobPostIds: string[];
  staffProfileId: string;
  userTags: string[];
}

const JobsDisplayContainer: React.FC<JobsDisplayContainerProps> = ({
  initialJobs,
  favoriteJobPostIds,
  staffProfileId,
  userTags,
}) => {
  const [sortValue, setSortValue] = useState("relevance");
  const [window, setWindow] = useState<"jobs" | "favorites">("jobs");
  const [jobs, setJobs] = useState<Job[]>(initialJobs);

  const getResults = () => {
    if (window === "favorites") {
      return jobs.filter((job) => job.isFavorite === true).length;
    }

    return jobs.length;
  };

  const sortJobs = () => {
    let sortedJobs = [...jobs];

    if (sortValue === "newest") {
      sortedJobs = sortByNewestToOldest([...jobs]);
    }

    if (sortValue === "oldest") {
      sortedJobs = sortByOldestToNewest([...jobs]);
    }

    if (sortValue === "relevance") {
      sortedJobs = sortByRelevance([...jobs], userTags);
    }

    setJobs(sortedJobs);
  };

  useEffect(() => {
    sortJobs();
  }, [sortValue]);

  return (
    <div className="flex flex-col w-full max-w-3xl">
      <div className="flex justify-between p-3 items-center">
        <div className="text-gray-500 text-sm">{getResults()} results</div>
        <div className="flex text-sm items-center">
          Sort by
          <Select value={sortValue} onValueChange={setSortValue}>
            <SelectTrigger className="w-fit border-none shadow-none font-bold focus:ring-0 p-1">
              <SelectValue defaultValue="dark" placeholder="Theme" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="relevance">relevance</SelectItem>
              <SelectItem value="newest">newest to oldest</SelectItem>
              <SelectItem value="oldest">oldest to newest</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>
      <JobDisplayTabs
        jobs={jobs}
        window={window}
        setWindow={setWindow}
        setJobs={setJobs}
        staffProfileId={staffProfileId}
      />
    </div>
  );
};

export default JobsDisplayContainer;
