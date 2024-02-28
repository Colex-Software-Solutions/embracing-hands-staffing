import { Toaster } from "./components/ui/toaster";
import Providers from "./components/Auth-Provider";
import "./globals.css";
import { Inter } from "next/font/google";
import NavbarAnimated from "./components/nav/navbar-main";
import { LogOut, UserIcon } from "lucide-react";
import { getServerSession } from "@/lib/getServerSession";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Admin Starter Kit",
  description:
    "Starter kit for any application that requires admin interface and authentication",
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await getServerSession();
  return (
    <html lang="en">
      <body className={inter.className}>
        <Providers session={session}>
          <NavbarAnimated />
          {children}
          <Toaster />
        </Providers>
      </body>
    </html>
  );
}
