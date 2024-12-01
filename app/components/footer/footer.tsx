import Link from "next/link";
import { Button } from "../ui/button";
import { SignUpButton } from "../body";
import Image from "next/image";

const Footer = () => {
  return (
    <div className="flex justify-center items-center py-20 gap-10 flex-col sm:flex-row">
      <Image
        src="/images/logo.jpeg"
        alt="Embracing Hands Healthcare Staffing logo"
        width={200}
        height={100}
      />
      <Image
        src="/images/badge.webp"
        alt="Embracing Hands Healthcare Staffing badge"
        width={200}
        height={50}
      />
      <SignUpButton />
      <Link href="/about-us">
        <Button variant="secondary">About Us</Button>
      </Link>
    </div>
  );
};

export default Footer;
