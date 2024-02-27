"use client";

import React, { useEffect, useState } from "react";
import { cn } from "@/lib/utils";
import { Button } from "@/app/components/ui/button";
import { Input } from "@/app/components/ui/input";
import { Label } from "@/app/components/ui/label";
import { signIn, signOut, useSession } from "next-auth/react";
import { useSearchParams, useRouter } from "next/navigation";
import { Alert } from "@/app/components/ui/alert";
import { Loader, XCircle, XIcon } from "lucide-react";
import Link from "next/link";

interface UserAuthFormProps extends React.HTMLAttributes<HTMLDivElement> {}
interface UserInfo {
  email: string;
  password: string;
}
export function UserAuthForm({ className, ...props }: UserAuthFormProps) {
  const { data: session } = useSession();
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState("");
  const [userInfo, setUserInfo] = useState<UserInfo>({
    email: "",
    password: "",
  });
  const params = useSearchParams();
  const router = useRouter();
  const callbackurl = params.get("callbackUrl");

  const onSubmit = async (e: any) => {
    e.preventDefault();
    try {
      setError("");
      setIsLoading(true);
      const result = await signIn("credentials", {
        username: userInfo.email,
        password: userInfo.password,
        redirect: false,
      });
      if (result?.error) {
        setError("Please Provide correct Credentials");
        return;
      }
      if (result?.ok) {
        router.replace(
          Array.isArray(callbackurl) ? callbackurl[0] : callbackurl || "/"
        );
      }
    } catch (error: any) {
      console.log(error);
      setError(error?.message);
    } finally {
      setIsLoading(false);
    }
  };

  const handleChange = (e: any) => {
    setUserInfo({ ...userInfo, [e.target.name]: e.target.value });
  };

  useEffect(() => {
    if (session?.user.accessToken) {
      signOut();
    }
  }, []);

  return (
    <div className={cn("grid gap-6", className)} {...props}>
      <form onSubmit={onSubmit}>
        <div className="grid gap-2">
          {error.length > 0 && (
            <Alert className="text-red-500 mb-2 bg-red-100">
              <div className="flex">
                {" "}
                <XCircle
                  onClick={() => setError("")}
                  className="mr-2 cursor-pointer"
                />{" "}
                {error}
              </div>
            </Alert>
          )}
          <div className="grid gap-1">
            <Label className="sr-only" htmlFor="email">
              Email
            </Label>
            <Input
              name="email"
              placeholder="name@example.com"
              type="email"
              autoCapitalize="none"
              autoComplete="email"
              autoCorrect="off"
              disabled={isLoading}
              value={userInfo.email}
              onChange={handleChange}
            />
            <Input
              className="mb-4 mt-2"
              name="password"
              placeholder="Password"
              type="password"
              autoCapitalize="none"
              autoComplete="password"
              autoCorrect="off"
              disabled={isLoading}
              value={userInfo.password}
              onChange={handleChange}
            />
          </div>
          <Button disabled={isLoading}>
            {isLoading && <Loader className="mr-2 h-4 w-4 animate-spin" />}
            Sign In with Email
          </Button>
        </div>
      </form>

      {/* This div is in case we added other auth platforms */}
      <div className="relative">
        <div className="absolute inset-0 flex items-center">
          <span className="w-full border-t" />
        </div>
        <div className="relative flex justify-center text-xs uppercase">
          <span className="bg-background px-2 text-muted-foreground">
            don't have an account{" "}
            <Link href={"/auth/register"}>
              <Button className="px-0" variant={"link"}>
                Register
              </Button>
            </Link>
          </span>
        </div>
      </div>
      <Button
        variant={"link"}
        onClick={() => router.push("/auth/forgotPassword")}
      >
        Forgot Password?
      </Button>
    </div>
  );
}
