import { Metadata } from "next";
import { userProvider } from "@/app/providers/userProvider";
import StaffUserManager from "./components/data-table/StaffUserManager";
import { mapDataToStaffUsers } from "./utils";

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

const initialPage: number = 1;
const initialPageSize: number = 10;

async function getStaffUsers() {
  const { users, totalCount } = await userProvider.getStaffUsers(
    initialPage,
    initialPageSize
  );

  const staffUsers = mapDataToStaffUsers(users);

  return { staffUsers, totalCount };
}

export default async function StaffPage() {
  const { staffUsers, totalCount } = await getStaffUsers();

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
        <StaffUserManager
          initialStaffUsers={staffUsers}
          totalCount={totalCount}
        />
      </div>
    </>
  );
}
