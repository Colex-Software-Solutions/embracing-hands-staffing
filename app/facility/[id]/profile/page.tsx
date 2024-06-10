import { facilityProvider } from "@/app/providers/facilityProvider";
import FacilityProfileForm from "./components/facility-profile-form";
import Script from "next/script";

export default async function FacilityProfile({
  params,
}: {
  params: { id: string };
}) {
  const profile = await facilityProvider.getFacilityProfile(params.id);
  return (
    <>
      <Script
        src={`https://maps.googleapis.com/maps/api/js?key=${process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY}&libraries=places`}
        strategy="beforeInteractive"
      />
      <div className="flex flex-col items-center justify-center my-8">
        <FacilityProfileForm userId={params.id} profile={profile} />
      </div>
    </>
  );
}
