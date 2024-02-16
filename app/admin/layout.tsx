import { ThemeProvider } from "../components/theme-provider";
import { Nav } from "./components/Nav";
import {
  ArchiveX,
  File,
  Inbox,
  Send,
  Trash2,
  Settings,
  User,
} from "lucide-react";
import { Separator } from "./components/separator";

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
        <div>
          <Nav
            isCollapsed={false}
            links={[
              {
                title: "Tasks",
                icon: <Inbox className="md:mr-2 h-4 w-4" />,
                href: "/admin/tasks",
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
    </ThemeProvider>
  );
}
