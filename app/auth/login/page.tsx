import { Metadata } from "next";
import Link from "next/link";
import { UserAuthForm } from "./components/user-auth-form";
import Image from "next/image";

export const metadata: Metadata = {
  title: "Authentication",
  description: "Authentication forms built using the components.",
};

export default function AuthenticationPage() {
  return (
    <div className="overflow-hidden sm:rounded-[0.5rem] sm:border bg-background sm:shadow-md md:shadow-xl sm:mx-[15%] mt-16 flex justify-center items-center ">
      <div className="container relative  sm:h-[800px] flex-col items-center justify-center grid lg:max-w-none lg:grid-cols-2 lg:px-0">
        <Image
          alt="Auth Image"
          width={800}
          height={400}
          className="relative hidden h-full flex-col bg-muted opacity-70  text-white lg:flex dark:border-r"
          src="/auth-bg2.png"
        />
        <div className="lg:p-8 mt-[15%] sm:mt-0">
          <div className="mx-auto flex w-full flex-col justify-center space-y-6 sm:w-[350px]">
            <div className="flex flex-col space-y-2 text-center">
              <h1 className="text-2xl font-semibold tracking-tight">
                Login To View the latest Per Piem Jobs
              </h1>
              <p className="text-sm text-muted-foreground">
                Enter your email and password below
              </p>
            </div>
            <UserAuthForm />
            <p className="px-8 text-center text-sm text-muted-foreground">
              By clicking continue, you agree to our{" "}
              <Link
                href="/terms"
                className="underline underline-offset-4 hover:text-primary"
              >
                Terms of Service
              </Link>{" "}
              and{" "}
              <Link
                href="/privacy"
                className="underline underline-offset-4 hover:text-primary"
              >
                Privacy Policy
              </Link>
              .
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
