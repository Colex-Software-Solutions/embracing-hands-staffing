import { Metadata } from "next";
import { userProvider } from "@/app/providers/userProvider";
import StaffUserManager from "./components/data-table/StaffUserManager";

export const metadata: Metadata = {
  title: "Staff",
  description: "Allows admin user to view and manage staff users.",
};

export interface StaffUser {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  status: string;
  phone: string;
}

const mapDataToStaffUsers = (data: any): StaffUser[] => {
  const staffUsers: StaffUser[] = data.map((staffUserData: any) => {
    return {
      id: staffUserData.id,
      firstName: staffUserData.staffProfile?.firstname || "N/A",
      lastName: staffUserData.staffProfile?.lastname || "N/A",
      email: staffUserData.email,
      status: staffUserData.status,
      phone: staffUserData.phone,
    };
  });

  return staffUsers;
};

async function getStaffUsers() {
  const staffUserData = await userProvider.getStaffUsers();

  const staffUsers = mapDataToStaffUsers(staffUserData);

  return staffUsers;
}

export default async function StaffPage() {
  const staffUsers = await getStaffUsers();

  return (
    <>
      <div className="h-full flex-1 flex-col space-y-8 p-8 flex">
        <div className="flex items-center justify-between space-y-2">
          <div>
            <h2 className="text-2xl font-bold tracking-tight">Staff Users</h2>
            <p className="text-muted-foreground">
              Manage the staff users information here.
            </p>
          </div>
        </div>
        <StaffUserManager initialStaffUsers={staffUsers} />
      </div>
    </>
  );
}
