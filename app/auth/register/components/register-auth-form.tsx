"use client";
import React from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Form,
  FormControl,
  FormLabel,
  FormMessage,
  FormField,
  FormItem,
} from "@/app/components/ui/form";
import { Input } from "@/app/components/ui/input";
import { Button } from "@/app/components/ui/button";
import { z } from "zod";
import { Loader } from "lucide-react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { PasswordInput } from "@/app/components/ui/passwordInput";
import { Role, User } from "@prisma/client";
import { signIn } from "next-auth/react";
import { useToast } from "@/app/components/ui/use-toast";

export default function RegisterForm({ users }: { users: Partial<User>[] }) {
  const { toast } = useToast();
  const registrationSchema = z
    .object({
      email: z.string().email({ message: "Invalid email address" }),
      password: z
        .string()
        .min(6, { message: "Password must be at least 6 characters long" }),
      confirmPassword: z.string(),
      phone: z
        .string()
        .regex(/^\(?([0-9]{3})\)?[-. ]?([0-9]{3})[-. ]?([0-9]{4})$/, {
          message: "Invalid phone number",
        }),
      role: z.enum(["STAFF", "FACILITY"]),
    })
    .refine((data) => data.password === data.confirmPassword, {
      message: "Passwords don't match",
      path: ["confirmPassword"],
    })
    .refine((data) => !users.some((user) => user.email === data.email), {
      message: "Email already exists",
      path: ["email"],
    });

  type RegisterFormValues = z.infer<typeof registrationSchema>;

  const defaultValues: Partial<RegisterFormValues> = {
    email: "",
    password: "",
    confirmPassword: "",
    phone: "",
    role: "STAFF",
  };
  const form = useForm<RegisterFormValues>({
    resolver: zodResolver(registrationSchema),
    defaultValues,
  });

  const router = useRouter();

  // Assume this function is called after successful login
  const redirectToProfileSetup = (role: Role, userId: string) => {
    if (role === "STAFF") {
      router.push(`/staff/profile/${userId}`);
    } else if (role === "FACILITY") {
      router.push(`/facility/profile/${userId}`);
    }
  };

  const onSubmit = async (data: RegisterFormValues) => {
    const { confirmPassword, ...body } = data;
    try {
      const response = await fetch("/api/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },

        body: JSON.stringify({ user: body }),
      });

      const result = await response.json();
      const loginResponse = await signIn("credentials", {
        redirect: false,
        username: data.email,
        password: data.password,
      });

      if (loginResponse?.ok) {
        redirectToProfileSetup(data.role, result.user.id);
      } else {
        toast({
          title: "Something went wrong",
          description:
            "Please check your values or refresh the page and try again",
          variant: "destructive",
        });
      }
    } catch (error: any) {
      console.error("Registration error:", error);
      toast({
        title: "Server Side Error",
        description: error.message,
        variant: "destructive",
      });
    }
  };

  const { errors, isSubmitting } = form.formState;

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email</FormLabel>
              <FormControl>
                <Input
                  placeholder="Your email address"
                  type="email"
                  {...field}
                />
              </FormControl>
              {errors.email && (
                <FormMessage>{errors.email.message}</FormMessage>
              )}
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="password"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Password</FormLabel>
              <FormControl>
                <PasswordInput {...field} />
              </FormControl>
              {errors.password && (
                <FormMessage>{errors.password.message}</FormMessage>
              )}
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="confirmPassword"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Confirm Password</FormLabel>
              <FormControl>
                <PasswordInput {...field} />
              </FormControl>
              {errors.confirmPassword && (
                <FormMessage>{errors.confirmPassword.message}</FormMessage>
              )}
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="phone"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Phone Number</FormLabel>
              <FormControl>
                <Input type="tel" {...field} />
              </FormControl>
              {errors.phone && (
                <FormMessage>{errors.phone.message}</FormMessage>
              )}
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="role"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Choose your role:</FormLabel>
              <FormControl>
                <select {...field} className="input-select">
                  <option value="STAFF">
                    I am joining as a healthcare professional
                  </option>
                  <option value="FACILITY">
                    I am joining as a healthcare facility
                  </option>
                </select>
              </FormControl>
              {errors.role && <FormMessage>{errors.role.message}</FormMessage>}
            </FormItem>
          )}
        />

        <Button className="w-full" type="submit" disabled={isSubmitting}>
          {isSubmitting && <Loader className="mr-2 h-4 w-4 animate-spin" />}
          Register
        </Button>
      </form>
      <div className="relative">
        <div className="absolute inset-0 flex items-center">
          <span className="w-full border-t" />
        </div>
        <div className="relative flex justify-center text-xs uppercase">
          <span className="bg-background px-2 text-muted-foreground">
            already have an account{" "}
            <Link href={"/auth/login"}>
              <Button className="px-0" variant={"link"}>
                Log In
              </Button>
            </Link>
          </span>
        </div>
      </div>
    </Form>
  );
}
