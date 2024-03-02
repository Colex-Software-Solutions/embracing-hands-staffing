"use client";
import JobCard, { Job } from "./job-card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../../ui/select";
import { useEffect, useState } from "react";
import JobDisplayTabs from "./jobs-display-tabs";
import sampleData from "./sampleData.json";

const sortByNewestToOldest = (jobs: Job[]): Job[] =>
  jobs.sort(
    (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
  );

const sortByOldestToNewest = (jobs: Job[]): Job[] =>
  jobs.sort(
    (a, b) => new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime()
  );

const sortByPay = (jobs: Job[]): Job[] =>
  jobs.sort((a, b) => b.weeklyPay - a.weeklyPay);

const fetchedJobs: Job[] = sampleData as Job[];

const JobsDisplayContainer = () => {
  const [sortValue, setSortValue] = useState("relevance");
  const [window, setWindow] = useState<"jobs" | "favorites">("jobs");
  const [jobs, setJobs] = useState<Job[]>(fetchedJobs);

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

    if (sortValue === "pay") {
      sortedJobs = sortByPay([...jobs]);
    }

    setJobs(sortedJobs);
  };

  useEffect(() => {
    sortJobs();
  }, [fetchedJobs, sortValue]);

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
              <SelectItem value="pay">pay</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>
      <JobDisplayTabs
        jobs={jobs}
        window={window}
        setWindow={setWindow}
        setJobs={setJobs}
      />
    </div>
  );
};

export default JobsDisplayContainer;
