"use client";
import Image from "next/image";
import { Button } from "../ui/button";
import { motion } from "framer-motion";
import SignUpButton from "./sign-up-button";
import { getMotionVariants } from "@/lib/utils";
import Link from "next/link";

const Hero = () => {
  return (
    <div className="flex gap-5 justify-center">
      <motion.div
        variants={getMotionVariants("right")}
        initial="hidden"
        animate="visible"
        exit="exit"
        className="flex flex-col max-w-lg p-10"
      >
        <p className="font-bold text-5xl">
          The best way to earn more on your schedule
        </p>
        <p className="mt-5 font-light">
          Only Embracing Hands Healthcare Staffing gives Nurses and Allied Pros
          the flexibility to book jobs and assignments on-demand
        </p>
        <div className="flex py-5 gap-5">
          <SignUpButton />
          <Link href="/auth/register?role=facility">
            <Button variant="secondary">I'm Looking for Staff</Button>
          </Link>
        </div>
      </motion.div>
      <motion.div
        variants={getMotionVariants("left")}
        initial="hidden"
        animate="visible"
        exit="exit"
        className="rounded-3xl overflow-hidden"
      >
        <Image
          src="/images/hero-image.webp"
          alt="nurse"
          width={400}
          height={500}
        />
      </motion.div>
    </div>
  );
};

export default Hero;
