import JobPostingForm from "./components/job-posting-form";

export default function JobPost() {
  return (
    <div className="h-full flex-1 flex-col space-y-8 p-8 flex">
      <JobPostingForm />
    </div>
  );
}
