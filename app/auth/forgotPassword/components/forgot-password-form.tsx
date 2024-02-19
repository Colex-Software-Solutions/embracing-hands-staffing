"use client";
import React, { useEffect, useState } from "react";
import { Button } from "@/app/components/ui/button";
import { Input } from "@/app/components/ui/input";
import { Label } from "@/app/components/ui/label";
import { signOut, useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { Alert } from "@/app/components/ui/alert";
import { Loader, XCircle } from "lucide-react";
import axios from "axios";
import { useToast } from "@/app/components/ui/use-toast";

export function ForgotPasswordForm() {
  const { data: session } = useSession();
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState("");
  const [email, setEmail] = useState("");
  const { toast } = useToast();
  const router = useRouter();

  const onSubmit = async (e: any) => {
    e.preventDefault();
    try {
      setError("");
      setIsLoading(true);
      const res = await axios.post("/api/forgot-password", { email });
      toast({
        title: "Password Reset Initiated",
        description:
          "A link to reset your password will be sent shortly if an account associated with your email address is found. Please check your inbox, and don't forget to look in your spam or junk folder as well.",
      });
      setTimeout(() => {
        router.push("/login");
      }, 5000);
    } catch (error: any) {
      console.log(error);
      setError(error?.message);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (session?.user.accessToken) {
      signOut();
    }
  }, []);

  return (
    <div className={"grid gap-6"}>
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
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <Button disabled={isLoading}>
            {isLoading && <Loader className="mr-2 h-4 w-4 animate-spin" />}
            Send Reset Email
          </Button>
        </div>
      </form>
    </div>
  );
}
