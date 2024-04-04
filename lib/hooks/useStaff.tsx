import { StaffProfile } from "@prisma/client";
import axios from "axios";
import { useState } from "react";

const useStaff = (userId: string) => {
  const [staffProfile, setStaffProfile] = useState<StaffProfile | null>(null);
  const [staffProfiles, setStaffProfiles] = useState<StaffProfile[]>([]);

  const fetchStaffProfile = async () => {
    axios
      .get("/api/users/staff", {
        params: {
          userId,
        },
      })
      .then((res) => {
        if (res.data.success) {
          setStaffProfile(res.data.user);
        }
      })
      .catch((err) => console.log(err));
  };

  const updateStaffProfileFavoriteJobs = async (
    userId: string,
    favoriteJobs: string[]
  ) => {
    axios
      .put(`/api/staff/${userId}`, {
        favoriteJobPostIds: favoriteJobs,
      })
      .then((res) => {
        if (res.data.success) {
          setStaffProfile(res.data.profile);
        }
      })
      .catch((err) => console.log(err));
  };

  const fetchStaffProfilesByJobPostId = async (jobPostId: string) => {
    axios
      .get(`/api/job-post/${jobPostId}/job-applications`)
      .then((res) => {
        if (res.data.success) {
          const validStaffProfiles = res.data.jobApplications
            .filter(
              (jobApplication: { status: string }) =>
                jobApplication.status === "ACCEPTED"
            )
            .map(
              (jobApplication: { staffProfile: any }) =>
                jobApplication.staffProfile
            );

          setStaffProfiles(validStaffProfiles);
        }
      })
      .catch((err) => console.log(err));
  };

  return {
    staffProfile,
    staffProfiles,
    fetchStaffProfile,
    updateStaffProfileFavoriteJobs,
    fetchStaffProfilesByJobPostId,
  };
};

export default useStaff;
