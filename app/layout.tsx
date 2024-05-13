import { Toaster } from "./components/ui/toaster";
import Providers from "./components/Auth-Provider";
import "./globals.css";
import { Inter } from "next/font/google";
import NavbarAnimated from "./components/nav/navbar-main";
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
      <head>
        <link
          href="https://fonts.googleapis.com/css2?family=Raleway:wght@400;600;700&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="font-raleway">
        <Providers session={session}>
          <NavbarAnimated />
          {children}
          <Toaster />
        </Providers>
      </body>
    </html>
  );
}
