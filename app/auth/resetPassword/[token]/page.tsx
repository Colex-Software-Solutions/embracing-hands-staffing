import { Metadata } from "next";
import { ResetPasswordForm } from "./components/reset-password-form";
import Image from "next/image";

export const metadata: Metadata = {
  title: "Reset Password",
  description: "Reset your password.",
};

export default function ResetPasswordPage() {
  return (
    <div className="overflow-hidden sm:rounded-[0.5rem] sm:border bg-background sm:shadow-md md:shadow-xl sm:mx-[15%] mt-16 flex justify-center items-center">
      <div className="container relative sm:h-[800px] flex-col items-center justify-center grid lg:max-w-none lg:grid-cols-2 lg:px-0">
        <Image
          alt="Auth Image"
          src="/auth-bg.jpeg"
          width={800}
          height={400}
          className="relative hidden h-full flex-col bg-muted text-white lg:flex dark:border-r"
        />
        <div className="lg:p-8 mt-[15%] sm:mt-0">
          <div className="mx-auto flex w-full flex-col justify-center space-y-6 sm:w-[350px]">
            <h1 className="text-2xl font-semibold tracking-tight text-center">
              Reset Your Password
            </h1>
            <ResetPasswordForm />
          </div>
        </div>
      </div>
    </div>
  );
}
