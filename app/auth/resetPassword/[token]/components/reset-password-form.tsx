"use client";
import React, { useEffect, useState } from "react";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useParams, useRouter } from "next/navigation";
import { Label } from "@/app/components/ui/label";
import { Input } from "@/app/components/ui/input";
import { Alert } from "@/app/components/ui/alert";
import { Button } from "@/app/components/ui/button";
import Link from "next/link";

// Define the schema for form validation
const schema = z
  .object({
    newPassword: z
      .string()
      .min(8, { message: "Password must be at least 8 characters long" })
      .regex(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/, {
        message:
          "Password must contain at least one uppercase letter, one lowercase letter, and one number",
      }),
    confirmPassword: z.string(),
  })
  .refine((data) => data.newPassword === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"], // Path of the field that caused the failure
  });

interface FormValues {
  newPassword: string;
  confirmPassword: string;
}

export const ResetPasswordForm: React.FC = () => {
  const params = useParams();
  const [isValid, setIsValid] = useState(true);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormValues>({
    resolver: zodResolver(schema),
  });

  useEffect(() => {
    const token = params["token"];
    // TODO: extract the email from the token payload and send it the backend along the token
    // this endpoint is to validate the token is not used before and not expired
    // axios
    //   .get(`/api/reset-password`, {
    //     params: {
    //       token,
    //       email: "user1@example.com", // this should be the email that is extracted from the token
    //     },
    //   })
    //   .then((res) => {
    //     if (!res.data.success) {
    //       setIsValid(false);
    //     }
    //   })
    //   .catch((err) => {
    //     console.log(err);
    //     setIsValid(false);
    //   });
  }, []);

  const onSubmit = (data: FormValues) => {
    console.log(data);
    // Implement password reset logic here
  };

  if (!isValid) {
    return (
      <div className="flex flex-col items-center">
        <p>
          This link is expired, Please Navigate to the forgot password page to
          initialize another password reset link{" "}
        </p>
        <Link href={"/auth/forgotPassword"}>
          <Button className="mt-4">Navigate</Button>
        </Link>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 flex flex-col">
      <div className="space-y-2">
        <Label htmlFor="newPassword">New Password</Label>
        <Input id="newPassword" type="password" {...register("newPassword")} />
        {errors.newPassword && (
          <Alert className="text-red-500">{errors.newPassword.message}</Alert>
        )}
      </div>

      <div className="space-y-2">
        <Label htmlFor="confirmPassword">Confirm New Password</Label>
        <Input
          id="confirmPassword"
          type="password"
          {...register("confirmPassword")}
        />
        {errors.confirmPassword && (
          <Alert className="text-red-500">
            {errors.confirmPassword.message}
          </Alert>
        )}
      </div>

      <Button className="w-32 items" type="submit">
        Reset Password
      </Button>
    </form>
  );
};
