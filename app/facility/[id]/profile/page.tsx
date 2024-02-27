import { facilityProvider } from "@/app/providers/facilityProvider";
import FacilityProfileForm from "./components/facility-profile-form";

export default async function FacilityProfile({
  params,
}: {
  params: { id: string };
}) {
  const profile = await facilityProvider.getFacilityProfile(params.id);
  return (
    <div className="flex flex-col items-center justify-center my-8">
      <FacilityProfileForm userId={params.id} profile={profile} />
    </div>
  );
}
