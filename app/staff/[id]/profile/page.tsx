import { staffProvider } from "@/app/providers/staffProvider";
import StaffProfileForm from "./components/staff-profile-form";
import { documentProvider } from "@/app/providers/documentProvider";

export default async function StaffProfileEdit({
  params,
}: {
  params: { id: string };
}) {
  const profile = await staffProvider.getStaffProfile(params.id);
  const documents = await documentProvider.getDocumentsPerUser(params.id);
  return (
    <div className="flex flex-col items-center justify-center my-8">
      <StaffProfileForm
        profile={profile}
        userId={params.id}
        documents={documents ?? []}
      />
    </div>
  );
}
