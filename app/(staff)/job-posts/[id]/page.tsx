const JobPostPage = ({ params }: { params: { id: string } }) => {
  const jobPostId = params.id;

  return (
    <div>
      <p>Job post id: {jobPostId}</p>
    </div>
  );
};

export default JobPostPage;
