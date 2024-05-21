import { staffProvider } from "@/app/providers/staffProvider";
import StaffProfileForm from "./components/staff-profile-form";
import { documentProvider } from "@/app/providers/documentProvider";
import MultiStepForm from "./components/MultiStepForm";

export default async function StaffProfileEdit({
  params,
}: {
  params: { id: string };
}) {
  const profile = await staffProvider.getFullStaffProfile(params.id);
  const documents = await documentProvider.getDocumentsPerUser(params.id);
  const staffSchoolInfo = profile?.staffSchoolInfo ?? [];
  return (
    <div className="flex flex-col items-center justify-center my-8">
      {/* <StaffProfileForm
        profile={profile}
        userId={params.id}
        documents={documents ?? []}
      /> */}
      <MultiStepForm
        profile={profile}
        userId={params.id}
        documents={documents}
        staffSchoolInfo={staffSchoolInfo}
      />
    </div>
  );
}
