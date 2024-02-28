import { Nav } from "@/app/components/ui/Nav";
import {
  ArchiveX,
  File,
  Inbox,
  Send,
  Trash2,
  Settings,
  User,
  Building,
} from "lucide-react";
import { Separator } from "@/app/components/ui/separator";
import { getServerSession } from "@/lib/getServerSession";

export default async function facilityLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await getServerSession();
  const baseUrl = `/facility/${session?.user.id}`;
  return (
    <div className="flex">
      <div>
        <Nav
          isCollapsed={false}
          links={[
            {
              title: "Post a job",
              icon: <Inbox className="md:mr-2 h-4 w-4" />,
              href: `${baseUrl}/job-post`,
            },
            {
              title: "Staff",

              icon: <User className="md:mr-2 h-4 w-4" />,
              href: "/admin/staff",
            },
            {
              title: "Facility",

              icon: <Building className="md:mr-2 h-4 w-4" />,
              href: "/admin/facility",
            },
            {
              title: "Users",

              icon: <User className="md:mr-2 h-4 w-4" />,
              href: "/admin/users",
            },
            {
              title: "Sent",
              label: "",
              icon: <Send className="md:mr-2 h-4 w-4" />,
              href: "ghost",
            },
            {
              title: "Junk",
              label: "23",
              icon: <ArchiveX className="md:mr-2 h-4 w-4" />,
              href: "ghost",
            },
            {
              title: "Trash",
              label: "",
              icon: <Trash2 className="md:mr-2 h-4 w-4" />,
              href: "ghost",
            },
            {
              title: "Settings",
              icon: <Settings className="md:mr-2 h-4 w-4" />,
              href: "/admin/settings",
            },
          ]}
        />
        <Separator />
      </div>
      <>{children}</>
    </div>
  );
}
