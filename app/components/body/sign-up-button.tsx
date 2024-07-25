import Link from "next/link";
import { Button } from "../ui/button";

interface SignUpButtonProps {
  className?: string;
}

const SignUpButton: React.FC<SignUpButtonProps> = ({ className }) => {
  return (
    <Link href="/auth/register">
      <Button variant="default" className={className}>
        Sign up as a healthcare professional
      </Button>
    </Link>
  );
};

export default SignUpButton;
