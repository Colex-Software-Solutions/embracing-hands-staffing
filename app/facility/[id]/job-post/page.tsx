import LoadGoogleMapsScript from "@/app/components/Scripts/LoadGoogleMapsScript";
import JobPostingForm from "./components/job-posting-form";

export default function JobPost() {
  return (
    <>
      <LoadGoogleMapsScript />
      <JobPostingForm />
    </>
  );
}
