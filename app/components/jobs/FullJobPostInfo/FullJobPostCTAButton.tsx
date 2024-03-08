import { ButtonHTMLAttributes, ReactNode } from "react";

interface FullJobPostCTAButtonProps
  extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode;
  onClick: () => void;
}

const FullJobPostCTAButton: React.FC<FullJobPostCTAButtonProps> = ({
  children,
  onClick,
}) => {
  return (
    <button
      className="flex justify-center w-full py-1 border rounded-full text-primary border-primary cursor-pointer hover:text-white hover:border-white hover:bg-primary transition duration-300"
      onClick={onClick}
    >
      {children}
    </button>
  );
};

export default FullJobPostCTAButton;
