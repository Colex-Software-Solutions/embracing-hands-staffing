import { Metadata } from "next";
import { userProvider } from "@/app/providers/userProvider";
import FacilityUserManager from "./components/FacilityUserManager";

export const metadata: Metadata = {
  title: "Facility",
  description: "Allows admin user to view and manage facility users.",
};

export interface FacilityUser {
  id: string;
  name: string;
  facilityType: string;
  description: string;
  address: string;
  facilityId: string;
  email: string;
  status: string;
  phone: string;
}

const mapDataToFacilityUsers = (data: any): FacilityUser[] => {
  const facilityUsers: FacilityUser[] = data.map((facilityUser: any) => {
    return {
      id: facilityUser.id,
      name: facilityUser.facilityProfile?.name || "N/A",
      facilityId: facilityUser?.facilityProfile?.id || "",
      facilityType: facilityUser.facilityProfile?.facilityType || "N/A",
      description: facilityUser.facilityProfile?.description || "N/A",
      address: facilityUser.facilityProfile?.address || "N/A",
      email: facilityUser.email,
      status: facilityUser.status,
      phone: facilityUser.phone,
    };
  });

  return facilityUsers;
};

async function getFacilityUsers() {
  const facilityUserData = await userProvider.getFacilityUsers();

  const facilityUsers = mapDataToFacilityUsers(facilityUserData);

  return facilityUsers;
}

export default async function FacilityPage() {
  const facilityUsers = await getFacilityUsers();

  return (
    <>
      <div className="h-full flex-1 flex-col space-y-8 p-8 flex">
        <div className="flex items-center justify-between space-y-2">
          <div>
            <h2 className="text-2xl font-bold tracking-tight">
              Facility Users
            </h2>
            <p className="text-muted-foreground">
              Manage the facility users information here.
            </p>
          </div>
        </div>
        <FacilityUserManager initialFacilityUsers={facilityUsers} />
      </div>
    </>
  );
}
