interface JobSkillTagProps {
    children: React.ReactNode;
}

const JobSkillTag: React.FC<JobSkillTagProps> = ({ children }) => {
    return (
        <div className="bg-secondary text-primary px-2 py-1 rounded-lg">{children}</div>
    )
}

export default JobSkillTag;
