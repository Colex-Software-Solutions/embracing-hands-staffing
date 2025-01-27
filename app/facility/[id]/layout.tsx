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
import { headers } from "next/headers";

export default async function facilityLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await getServerSession();
  const baseUrl = `/facility/${session?.user.id}`;

  return (
    <div className="flex">
      <div className="mt-6">
        <Nav
          isCollapsed={false}
          links={[
            {
              title: "Profile Settings",
              icon: <Settings className="md:mr-2 h-4 w-4" />,
              href: `${baseUrl}/profile`,
            },
            {
              title: "Post a job",
              icon: <NotebookPen className="md:mr-2 h-4 w-4" />,
              href: `${baseUrl}/job-post`,
            },
            {
              title: "Calendar",
              icon: <Briefcase className="md:mr-2 h-4 w-4" />,
              href: `${baseUrl}/jobs`,
            },

            // {
            //   title: "Applicants",
            //   icon: <ClipboardList className="md:mr-2 h-4 w-4" />,
            //   href: `${baseUrl}/applications`,
            // },
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
