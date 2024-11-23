"use client";
import React, { useState } from "react";
import { Button } from "@/app/components/ui/button";
import { Input } from "@/app/components/ui/input";
import { useToast } from "@/app/components/ui/use-toast";
import axios from "axios";
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSeparator,
  InputOTPSlot,
} from "@/app/components/ui/input-otp";
import { Loader } from "lucide-react";
import { useRouter } from "next/navigation";
import { PasswordInput } from "@/app/components/ui/passwordInput";
import { Alert } from "@/app/components/ui/alert";

export function ForgotPasswordForm() {
  const [step, setStep] = useState(1);
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [code, setCode] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const { toast } = useToast();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<null | string>(null);

  const handleRequestReset = async () => {
    setLoading(true);

    try {
      const test = await axios.post("/api/forgot-password", { email });
      setStep(2);
      toast({ title: "Check your email for the code." });
    } catch (error: any) {
      toast({
        title: "Error",
        description: error.response?.data?.message || "Failed to send email.",
      });
    } finally {
      setLoading(false);
    }
  };

  const handleVerifyCode = async () => {
    setLoading(true);
    try {
      await axios.put("/api/forgot-password", { email, code });
      setStep(3);
      toast({ title: "Code verified. Set your new password." });
    } catch (error: any) {
      toast({
        title: "Error",
        description: error.response?.data?.message || "Invalid code.",
      });
    } finally {
      setLoading(false);
    }
  };

  const handleResetPassword = async () => {
    if (newPassword.length < 6) {
      setError("Password length must be a minimum of 6 Characters");

      return;
    }
    if (newPassword !== confirmPassword) {
      setError("Passwords do not match");
      return;
    }
    setLoading(true);
    setError(null);
    try {
      await axios.put("/api/reset-password", { email, newPassword });
      toast({ title: "Password reset successfully." });
      setTimeout(() => {
        router.replace("/auth/login");
      }, 3000);
    } catch (error: any) {
      toast({
        title: "Error",
        description:
          error.response?.data?.message || "Failed to reset password.",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      {step === 1 && (
        <form
          onSubmit={(e) => {
            e.preventDefault();
            handleRequestReset();
          }}
        >
          <Input
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Enter your email"
          />
          <Button className="w-full mt-4" disabled={loading}>
            Send Reset Code{" "}
            {loading && <Loader className="mr-2 h-4 w-4 animate-spin" />}
          </Button>
        </form>
      )}

      {step === 2 && (
        <form
          onSubmit={(e) => {
            e.preventDefault();
            handleVerifyCode();
          }}
        >
          <InputOTP
            maxLength={6}
            value={code}
            onChange={setCode}
            autoFocus
            className="otp-input"
          >
            {" "}
            <InputOTPGroup>
              <InputOTPSlot index={0} />
              <InputOTPSlot index={1} />
              <InputOTPSlot index={2} />
            </InputOTPGroup>
            <InputOTPSeparator />
            <InputOTPGroup>
              <InputOTPSlot index={3} />
              <InputOTPSlot index={4} />
              <InputOTPSlot index={5} />
            </InputOTPGroup>
          </InputOTP>
          <Button className="w-full mt-4" disabled={loading}>
            Verify Code{" "}
            {loading && <Loader className="mr-2 h-4 w-4 animate-spin" />}
          </Button>
        </form>
      )}

      {step === 3 && (
        <form
          className="space-y-4"
          onSubmit={(e) => {
            e.preventDefault();
            handleResetPassword();
          }}
        >
          {error && <Alert className="text-red-500">{error}</Alert>}
          <PasswordInput
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
            type="password"
            placeholder="Enter your new password"
          />
          <PasswordInput
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            type="password"
            placeholder="Confirm your new password"
          />
          <Button className="w-full mt-4" disabled={loading}>
            Reset Password{" "}
            {loading && <Loader className="mr-2 h-4 w-4 animate-spin" />}
          </Button>
        </form>
      )}
    </div>
  );
}
