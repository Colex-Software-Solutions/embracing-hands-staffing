import { Metadata } from "next";
import Link from "next/link";
import RegisterForm from "./components/register-auth-form";
import Image from "next/image";
import { userProvider } from "@/app/providers/userProvider";

export const metadata: Metadata = {
  title: "Register",
  description: "Register As a healthcare professional or a healthcare facility",
};

export default async function RegisterPage() {
  const users = await userProvider.getAllUsers();

  return (
    <div className="overflow-scroll sm:rounded-[0.5rem] sm:border bg-background sm:shadow-md md:shadow-xl sm:mx-[15%] mt-8 flex justify-center items-center ">
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
                Register
              </h1>
              <p className="text-sm text-muted-foreground">
                Register by entering the information below
              </p>
            </div>
            {users && <RegisterForm users={users} />}
            <p className="px-8 text-center text-sm text-muted-foreground">
              By clicking register, you agree to our{" "}
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
