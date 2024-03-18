import { StaffProfile } from "@prisma/client";
import axios from "axios";
import { useState } from "react";

const useStaff = (userId: string) => {
  const [staffProfile, setStaffProfile] = useState<StaffProfile | null>(null);

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

  return {
    staffProfile,
    fetchStaffProfile,
    updateStaffProfileFavoriteJobs,
  };
};

export default useStaff;
