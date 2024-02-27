import { facilityProvider } from "@/app/providers/facilityProvider";
import { staffProvider } from "@/app/providers/staffProvider";
import { userProvider } from "@/app/providers/userProvider";
import StaffProfileInfo from "./components/staff-profile-info";
import { FacilityProfile, StaffProfile } from "@prisma/client";
import StaffProfileInfoSkeleton from "./components/staff-info-skeleton";
import FacilityProfileInfo from "./components/facility-profile-info";

export default async function UserProfilePage({
  params,
}: {
  params: { id: string };
}) {
  const user = await userProvider.getUser(params.id);
  const profile =
    user?.role === "STAFF"
      ? await staffProvider.getStaffProfile(params.id)
      : await facilityProvider.getFacilityProfile(params.id);

  if (!user || !profile) {
    return <StaffProfileInfoSkeleton />;
  }
  return (
    <>
      {user?.role === "STAFF" ? (
        <StaffProfileInfo user={user} staffProfile={profile as StaffProfile} />
      ) : (
        <FacilityProfileInfo
          user={user}
          facilityProfile={profile as FacilityProfile}
        />
      )}
    </>
  );
}
