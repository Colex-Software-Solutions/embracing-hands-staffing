import { facilityProvider } from "@/app/providers/facilityProvider";
import { staffProvider } from "@/app/providers/staffProvider";
import { userProvider } from "@/app/providers/userProvider";
import StaffProfileInfo, {
  FullStaffProfile,
} from "./components/staff-profile-info";
import { FacilityProfile, StaffProfile } from "@prisma/client";
import StaffProfileInfoSkeleton from "./components/staff-info-skeleton";
import FacilityProfileInfo from "./components/facility-profile-info";
import { documentProvider } from "@/app/providers/documentProvider";

export default async function UserProfilePage({
  params,
}: {
  params: { id: string };
}) {
  const user = await userProvider.getUser(params.id);
  const profile =
    user?.role === "STAFF"
      ? await staffProvider.getFullStaffProfile(params.id)
      : await facilityProvider.getFacilityProfile(params.id);
  const documents = await documentProvider.getDocumentsPerUser(params.id);

  if (!user || !profile) {
    return <StaffProfileInfoSkeleton />;
  }
  return (
    <>
      {user?.role === "STAFF" ? (
        <StaffProfileInfo
          user={user}
          staffProfile={profile as FullStaffProfile}
          documents={documents}
        />
      ) : (
        <FacilityProfileInfo
          user={user}
          facilityProfile={profile as FacilityProfile}
        />
      )}
    </>
  );
}
