import { StaffProfile } from "@prisma/client";
import axios from "axios";
import { useState } from "react";

const useShift = (userId: string) => {
  const [staffProfile, setStaffProfile] = useState<StaffProfile | null>(null);

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
    updateStaffProfileFavoriteJobs,
  };
};

export default useShift;
