import { Nav } from "@/app/components/ui/Nav";
import {
  Settings,
  NotebookPen,
  CreditCard,
  ClipboardList,
  Briefcase,
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
              icon: <NotebookPen className="md:mr-2 h-4 w-4" />,
              href: `${baseUrl}/job-post`,
            },
            {
              title: "Jobs",
              icon: <Briefcase className="md:mr-2 h-4 w-4" />,
              href: `${baseUrl}/jobs`,
            },

            {
              title: "Applications",
              icon: <ClipboardList className="md:mr-2 h-4 w-4" />,
              href: `${baseUrl}/applications`,
            },
            {
              title: "Profile Settings",
              icon: <Settings className="md:mr-2 h-4 w-4" />,
              href: `${baseUrl}/profile`,
            },
          ]}
        />
        <Separator />
      </div>
      <div className="h-full flex-1 flex-col space-y-8 px-8 py-2 flex">
        {children}
      </div>
    </div>
  );
}
