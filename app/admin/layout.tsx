import { ThemeProvider } from "../components/theme-provider";
import { Nav } from "@/app/components/ui/Nav";
import {
  ArchiveX,
  Inbox,
  Send,
  File,
  Settings,
  User,
  Building,
  Briefcase,
} from "lucide-react";
import { Separator } from "@/app/components/ui/separator";

export default function adminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ThemeProvider
      attribute="class"
      defaultTheme="admin-theme-red"
      enableSystem
      disableTransitionOnChange
    >
      <div className="flex">
        <div className="mt-6">
          <Nav
            isCollapsed={false}
            links={[
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
                title: "Jobs",
                icon: <Briefcase className="md:mr-2 h-4 w-4" />,
                href: `/admin/jobs`,
              },
              {
                title: "Invoices",
                icon: <File className="md:mr-2 h-4 w-4" />,
                href: `/admin/invoices`,
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
    </ThemeProvider>
  );
}
