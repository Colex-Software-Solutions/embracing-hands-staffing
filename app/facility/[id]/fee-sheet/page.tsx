import { facilityProvider } from "@/app/providers/facilityProvider";
import FeeSheet from "./components/FeeSheet";

export default async function FacilityProfile({
  params,
}: {
  params: { id: string };
}) {
  const profile = await facilityProvider.getFacilityProfile(params.id);
  return (
    <div>
      <FeeSheet profile={profile} />
    </div>
  );
}
