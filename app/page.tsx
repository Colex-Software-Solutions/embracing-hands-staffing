import { getServerSession } from "@/lib/getServerSession";
import Image from "next/image";
import { redirect } from "next/navigation";
import {
  AdditionalWorkInfoSection,
  Hero,
  HowItWorks,
  UserReviewBanner,
  WorkInfoBanner,
} from "./components/body";
import Footer from "./components/footer/footer";

export default async function Home() {
  const session = await getServerSession();

  switch (session?.user.role) {
    case "ADMIN":
      return redirect("/admin/staff");
    case "FACILITY":
      return redirect(`/facility/${session?.user.id}/jobs`);
    case "STAFF":
      // this will be changed to the find jobs url later
      return session.user.redirect(`/find-jobs/${session?.user.id}`);
  }

  return (
    <>
      <main className="flex min-h-screen flex-col items-center justify-between p-24">
        <Hero />
        <HowItWorks />
        <WorkInfoBanner />
        <AdditionalWorkInfoSection />
        <UserReviewBanner />
      </main>
      <Footer />
    </>
  );
}
