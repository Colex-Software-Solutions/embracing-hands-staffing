"use client";

import React, { useState, ReactNode } from "react";
import { motion, AnimatePresence } from "framer-motion";
import useWindowSize from "@/app/hooks/use-window-size";
import { cn } from "@/lib/utils";
import { Menu, X } from "lucide-react";

interface NavbarLink {
  label: string;
  href: string;
  className?: string;
}

export interface NavbarAnimatedProps {
  rightSide: ReactNode;
  links: NavbarLink[];
  className?: string;
  linkClassName?: string;
}
const NavbarAnimated = ({
  rightSide,
  links,
  className,
  linkClassName,
}: NavbarAnimatedProps) => {
  const [open, setOpen] = useState(false);
  const { isMobile } = useWindowSize();

  const menuVariants = {
    exit: {
      opacity: 0,
      height: 0,
      transition: {
        ease: "easeInOut",
        duration: 0.3,
        delay: 1.2,
      },
    },
    initial: {
      height: 0,
      opacity: 0,
    },
    animate: {
      height: "100vh",
      opacity: 1,
      transition: { duration: 0.5 },
    },
  };

  const linkVariants = (delay: number) => ({
    initial: { y: 80, opacity: 0 },
    animate: { y: 0, opacity: 1, transition: { delay: delay } },
    exit: {
      opacity: 0,
      y: 90,
      transition: { ease: "easeInOut", delay: delay - 0.2 },
    },
  });

  const renderLinks = (delayStart: number, className = "") =>
    links.map((link, index) => (
      <motion.a
        href={link.href}
        key={index}
        className={className}
        variants={linkVariants(delayStart + index * 0.1)}
      >
        {link.label}
      </motion.a>
    ));

  return (
    <>
      {isMobile && (
        <>
          <header
            className={cn(
              "flex justify-between text-white items-center w-full h-14 border-b border-gray-300 bg-primary px-4",
              className
            )}
          >
            <div
              className="w-14 h-14 flex justify-center items-center cursor-pointer"
              onClick={() => setOpen(true)}
            >
              <Menu size={20} />
            </div>
            {rightSide}
          </header>
          <AnimatePresence>
            {open && (
              <motion.div
                className="absolute top-0 left-0 flex flex-col space-y-5 items-center w-full h-full bg-primary opacity-5 text-white"
                variants={menuVariants}
                initial="initial"
                animate="animate"
                exit="exit"
              >
                <div
                  className="flex justify-center items-center w-14 h-14 bg-white text-black rounded-full absolute top-5 right-5 cursor-pointer"
                  onClick={() => setOpen(false)}
                >
                  <X />
                </div>

                {renderLinks(0.4, linkClassName)}
              </motion.div>
            )}
          </AnimatePresence>
        </>
      )}
      {!isMobile && (
        <div
          className={cn(
            "bg-primary flex justify-between items-center h-24  mx-auto px-4 z-20 text-white",
            className
          )}
        >
          <div className="flex-justify-start space-x-6">
            {renderLinks(0, linkClassName)}
          </div>
          {rightSide}
        </div>
      )}
    </>
  );
};

export default NavbarAnimated;
