"use client";
import { getMotionVariants } from "@/lib/utils";
import SignUpButton from "./sign-up-button";
import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";

const AdditionalWorkInfoSection = () => {
  const { ref, inView } = useInView({
    triggerOnce: true, // Trigger animation only once
    threshold: 0.5, // Trigger when 50% of the component is in view
  });

  return (
    <div className="flex w-full justify-center mt-10">
      <motion.div
        ref={ref}
        variants={getMotionVariants()}
        initial="hidden"
        animate={inView ? "visible" : "hidden"}
        exit="exit"
      >
        <video
          src="/videos/scroll.mp4"
          autoPlay
          muted
          loop
          className="sm:h-96 hidden sm:block"
        >
          Your browser does not support the video tag.
        </video>
      </motion.div>
      <div className="flex-col p-5">
        <motion.div
          ref={ref}
          variants={getMotionVariants("right")}
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
          exit="exit"
        >
          <p className="text-primary text-3xl font-bold">
            Your next job is a tap away
          </p>
          <p className="font-light mt-5 max-w-xl">
            New per diem, local and travel opportunities are sent to your phone
            as they arise. See a job that fits your schedule, book it directly
            through the Embracing Hands website.
          </p>
          <SignUpButton className="mt-5" />
        </motion.div>
        <div className="flex gap-5 mt-5">
          <motion.div
            ref={ref}
            variants={getMotionVariants("right", 0.3)}
            initial="hidden"
            animate={inView ? "visible" : "hidden"}
            exit="exit"
            className="flex-col max-w-lg"
          >
            <p className="font-bold text-xl mt-5">CREDENTIALING MADE EASY</p>
            <p className="font-light max-w-xs">
              We will tell you exactly which credential documents are missing or
              outdated with automatic reminders.
            </p>
          </motion.div>
          <motion.div
            ref={ref}
            variants={getMotionVariants("right", 0.5)}
            initial="hidden"
            animate={inView ? "visible" : "hidden"}
            exit="exit"
            className="flex-col max-w-xs"
          >
            <p className="font-bold text-xl mt-5">TRACK YOUR EARNINGS</p>
            <p className="font-light">
              Easily track your progress toward your daily and weekly earning
              goals.
            </p>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default AdditionalWorkInfoSection;
