import { facilityProvider } from "@/app/providers/facilityProvider";
import FacilityProfileForm from "./components/facility-profile-form";
import Script from "next/script";
import LoadGoogleMapsScript from "@/app/components/Scripts/LoadGoogleMapsScript";

export default async function FacilityProfile({
  params,
}: {
  params: { id: string };
}) {
  const profile = await facilityProvider.getFacilityProfile(params.id);
  return (
    <>
      <LoadGoogleMapsScript />
      <div className="flex flex-col items-center justify-center my-8">
        <FacilityProfileForm userId={params.id} profile={profile} />
      </div>
    </>
  );
}
