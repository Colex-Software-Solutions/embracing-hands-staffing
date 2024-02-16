import { promises as fs } from "fs";
import path from "path";
import { Metadata } from "next";
import { DataTable } from "../tasks/components/data-table";
import { UserNav } from "../tasks/components/user-nav";
import { userColumns } from "./components/columns";
export const metadata: Metadata = {
  title: "Tasks",
  description: "A task and issue tracker build using Tanstack Table.",
};

export interface User {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  role: "admin" | "user";
  ip_address: "string;";
}

// Simulate a database read for users.
async function getUsers() {
  const data = await fs.readFile(
    path.join(process.cwd(), "/app/admin/users/data/users.json")
  );

  const users: User[] = JSON.parse(data.toString());

  return users;
}

export default async function TaskPage() {
  const users = await getUsers();

  return (
    <>
      <div className="h-full flex-1 flex-col space-y-8 p-8 flex">
        <div className="flex items-center justify-between space-y-2">
          <div>
            <h2 className="text-2xl font-bold tracking-tight">Welcome back!</h2>
            <p className="text-muted-foreground">
              Here&apos;s a list of your users!
            </p>
          </div>
          <div className="flex items-center space-x-2 theme-red">
            <UserNav />
          </div>
        </div>
        <DataTable data={users} columns={userColumns} />
      </div>
    </>
  );
}
