"use client";
import { useEffect, useState } from "react";
import FullJobPostCTAButton from "./FullJobPostCTAButton";
import { useSession } from "next-auth/react";
import axios from "axios";
import { StaffProfile } from "@prisma/client";
import FullJobPostFavoriteButton from "./FullJobPostFavoriteButton";
import useStaff from "@/lib/hooks/useStaff";

interface FullJobPostCTAButtonsProps {
  jobPostId: string;
}

const FullJobPostCTAButtons: React.FC<FullJobPostCTAButtonsProps> = ({
  jobPostId,
}) => {
  const [isHovered, setIsHovered] = useState(false);
  const { data: session } = useSession();
  const userId = session?.user.id.toString();
  const { staffProfile, fetchStaffProfile, updateStaffProfileFavoriteJobs } =
    useStaff(userId || "");

  useEffect(() => {
    fetchStaffProfile();
  }, []);

  const handleIsFavorite = () => {
    if (staffProfile && userId) {
      let currentFavoriteJobs = staffProfile.favoriteJobPostIds;

      if (isFavorite()) {
        currentFavoriteJobs = currentFavoriteJobs.filter(
          (currentFavoriteJob) => currentFavoriteJob !== jobPostId
        );
      } else {
        currentFavoriteJobs.push(jobPostId);
      }

      updateStaffProfileFavoriteJobs(userId, currentFavoriteJobs);
    }
  };

  const isFavorite = () =>
    staffProfile?.favoriteJobPostIds.includes(jobPostId) || false;

  return (
    <div className="flex flex-col mt-5 gap-3">
      <FullJobPostCTAButton onClick={() => console.log("message recruiter")}>
        Message Recruiter
      </FullJobPostCTAButton>
      <div
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        <FullJobPostFavoriteButton
          isHovered={isHovered}
          isFavorite={isFavorite()}
          onClick={handleIsFavorite}
        />
      </div>
    </div>
  );
};

export default FullJobPostCTAButtons;
