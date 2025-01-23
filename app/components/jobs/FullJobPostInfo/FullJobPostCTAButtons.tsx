"use client";
import { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import FullJobPostFavoriteButton from "./FullJobPostFavoriteButton";
import useStaff from "@/lib/hooks/useStaff";
import {
  ContactFormModal,
  ContactFormValues,
} from "../../modals/contactFormModal";
import { Button } from "../../ui/button";
import { FacilityProfile } from "@/app/(staff)/job-posts/[id]/page";
import { useToast } from "../../ui/use-toast";
import axios from "axios";

interface FullJobPostCTAButtonsProps {
  jobPostId: string;
  facilityProfile: FacilityProfile;
}

const FullJobPostCTAButtons: React.FC<FullJobPostCTAButtonsProps> = ({
  jobPostId,
  facilityProfile,
}) => {
  const [isHovered, setIsHovered] = useState(false);
  const { data: session } = useSession();
  const userId = session?.user.id.toString();
  const { staffProfile, fetchStaffProfile, updateStaffProfileFavoriteJobs } =
    useStaff(userId || "");
  const { toast } = useToast();

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

  function onSubmit(data: ContactFormValues) {
    axios
      .post(`/api/staff/email/job-post-email/${jobPostId}`, {
        staffUserId: userId,
        message: data.message,
      })
      .then((res) => {
        if (res.data.success) {
          toast({
            title: `Your message has been sent to ${name}`,
          });
        }
      })
      .catch((error) => {
        console.log(error);
        toast({
          variant: "destructive",
          title: `Your message could not be sent at this time. Please try again or contact support.`,
        });
      });
  }

  return (
    <div className="flex flex-col mt-5 gap-3">
      <ContactFormModal
        name={facilityProfile.name}
        emailTo={facilityProfile.user.email}
        onSubmit={onSubmit}
      >
        <Button
          className="w-full rounded-full text-primary border-primary bg-white hover:bg-primary hover:text-white"
          variant="outline"
        >
          Message Recruiter
        </Button>
      </ContactFormModal>
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
