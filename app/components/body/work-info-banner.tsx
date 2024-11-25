"use client";
import { getMotionVariants } from "@/lib/utils";
import { Button } from "../ui/button";
import SignUpButton from "./sign-up-button";
import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import Link from "next/link";

interface WorkInfoCard {
  image: string;
  title: string;
  description: string;
  link: string;
  buttonText: string;
}

const WorkInfoBanner = () => {
  const { ref, inView } = useInView({
    triggerOnce: true, // Trigger animation only once
    threshold: 0.5, // Trigger when 50% of the component is in view
  });

  const workInfoCards: WorkInfoCard[] = [
    {
      image: "/images/nurse.jpg",
      title: "Per Diem",
      description:
        "Choose when and where you want to work. Book per diem and local assignments through the app.",
      link: "/auth/register",
      buttonText: "Sign up for Work",
    },
    {
      image: "/images/travel.jpg",
      title: "Travel Assignmens",
      description:
        "Personalize your travel preferences and find assignments for nearly any specialty and location.",
      link: "/auth/login",
      buttonText: "Login",
    },
  ];

  return (
    <motion.div
      ref={ref}
      variants={getMotionVariants("right")}
      initial="hidden"
      animate={inView ? "visible" : "hidden"}
      exit="exit"
      className="flex-col text-center items-center py-20 p-12"
    >
      <p className="text-3xl font-bold text-primary">Work the way you want</p>
      <div className="text-xl font-light mt-5 text-center w-full px-5">
        <p className="mx-auto max-w-md">
          Fit work around what matters most. Book jobs at any time and on any
          day of the week.
        </p>
      </div>
      <div className="flex gap-10 mt-10 sm:flex-row flex-col items-center">
        {workInfoCards.map((workInfoCard) => (
          <WorkInfoCard {...workInfoCard} />
        ))}
      </div>
    </motion.div>
  );
};

interface WorkInfoCardProps extends WorkInfoCard {}

const WorkInfoCard: React.FC<WorkInfoCardProps> = ({
  image,
  title,
  description,
  link,
  buttonText,
}) => {
  const { ref, inView } = useInView({
    triggerOnce: true, // Trigger animation only once
    threshold: 0.5, // Trigger when 50% of the component is in view
  });

  return (
    <motion.div
      ref={ref}
      variants={getMotionVariants()}
      initial="hidden"
      animate={inView ? "visible" : "hidden"}
      exit="exit"
      className="flex-col w-80 rounded-br-xl rounded-bl-xl bg-primary rounded-tr-xl rounded-tl-xl shadow-lg"
    >
      <div className="w-full h-44">
        <img
          src={image}
          alt="Work Info"
          className="w-full h-full object-cover rounded-tr-xl rounded-tl-xl"
        />
      </div>
      <div className="text-white p-5 text-left">
        <p className="font-bold">{title}</p>
        <p className="font-light mt-5">{description}</p>
        <div className="flex justify-center">
          <Link href={link}>
            <Button variant="secondary" className="mt-3 self-cente">
              {buttonText}
            </Button>
          </Link>
        </div>
      </div>
    </motion.div>
  );
};

export default WorkInfoBanner;
