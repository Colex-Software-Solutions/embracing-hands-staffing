import { Metadata } from "next";
import Image from "next/image";
import { ForgotPasswordForm } from "./components/forgot-password-form";

export const metadata: Metadata = {
  title: "Forgot Password",
  description: "Reset Your Password",
};

export default function ForgotPasswordPage() {
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
                Forgot Password
              </h1>
              <p className="text-sm text-muted-foreground">
                Enter your email below to receive a reset password link
              </p>
            </div>
            <ForgotPasswordForm />
          </div>
        </div>
      </div>
    </div>
  );
}
