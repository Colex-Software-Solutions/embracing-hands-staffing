import { Toaster } from "./components/ui/toaster";
import Providers from "./components/Auth-Provider";
import "./globals.css";
import { Inter } from "next/font/google";
import NavbarAnimated from "./components/ui/navbar-main";
import { LogOut, UserIcon } from "lucide-react";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Admin Starter Kit",
  description:
    "Starter kit for any application that requires admin interface and authentication",
};

const navItems = [
  {
    href: "/home",
    label: "Home",
  },
  {
    href: "/home",
    label: "Company",
  },
  {
    href: "/home",
    label: "Resources",
  },
  {
    href: "/home",
    label: "About",
  },
  { href: "/home", label: "Contact" },
];

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <Providers>
          <NavbarAnimated
            linkClassName="border-b p-4 rounded-md sm:border-none cursor-pointer border-gray-600 hover:text-black hover:bg-[#00df9a]"
            rightSide={
              <div className="flex">
                <h1>Hello, User</h1>
                <UserIcon className="mx-0 sm:mx-2" />
                <LogOut size={30} className="ml-4 cursor-pointer" />
              </div>
            }
            links={navItems}
          />
          {children}
          <Toaster />
        </Providers>
      </body>
    </html>
  );
}
