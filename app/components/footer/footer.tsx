import Link from "next/link";
import { Button } from "../ui/button";
import { SignUpButton } from "../body";

const Footer = () => {
  return (
    <div className="flex justify-center py-20 gap-10">
      <h1 className="w-[200px] text-xl text-primary font-bold">
        Embracing hands HealthCare Staffing
      </h1>
      <SignUpButton />
      <Link href="/about-us">
        <Button variant="secondary">About Us</Button>
      </Link>
    </div>
  );
};

export default Footer;
