import { staffProvider } from "@/app/providers/staffProvider";
import StaffProfileForm from "./components/staff-profile-form";

export default async function StaffProfileEdit({
  params,
}: {
  params: { id: string };
}) {
  const profile = await staffProvider.getStaffProfile(params.id);
  return (
    <div className="flex flex-col items-center justify-center my-8">
      <StaffProfileForm profile={profile} userId={params.id} />
    </div>
  );
}
