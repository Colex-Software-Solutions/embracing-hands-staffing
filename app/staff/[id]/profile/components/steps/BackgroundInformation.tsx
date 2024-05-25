import React from "react";
import { useForm, Controller } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Card, CardContent, CardFooter } from "@/app/components/ui/card";
import { Button } from "@/app/components/ui/button";
import {
  Form,
  FormControl,
  FormLabel,
  FormMessage,
  FormItem,
  FormField,
} from "@/app/components/ui/form";
import { Input } from "@/app/components/ui/input";
import { Textarea } from "@/app/components/ui/textarea";
import { Switch } from "@/app/components/ui/switch";
import { useToast } from "@/app/components/ui/use-toast";
import { Loader } from "lucide-react";
import axios from "axios";

const backgroundSchema = z.object({
  hasLicenseIssues: z.boolean(),
  licenseIssuesExplanation: z.string().optional(),
  hasConviction: z.boolean(),
  convictionExplanation: z.string().optional(),
  hasPrisonRecord: z.boolean(),
  prisonRecordExplanation: z.string().optional(),
  hasPendingCriminalCase: z.boolean(),
  pendingCriminalCaseExplanation: z.string().optional(),
  awareOfMalpracticeSuit: z.boolean(),
  malpracticeSuitExplanation: z.string().optional(),
});

type BackgroundFormValues = z.infer<typeof backgroundSchema>;

interface BackgroundInformationProps {
  userId: string;
  isInitialSetup: boolean;
  profile: any;
  onNext: (data: any) => void;
}

const BackgroundInformation: React.FC<BackgroundInformationProps> = ({
  userId,
  isInitialSetup,
  profile,
  onNext,
}) => {
  const form = useForm<BackgroundFormValues>({
    resolver: zodResolver(backgroundSchema),
    defaultValues: {
      hasLicenseIssues: profile?.hasLicenseIssues || false,
      licenseIssuesExplanation: profile?.licenseIssuesExplanation || "",
      hasConviction: profile?.hasConviction || false,
      convictionExplanation: profile?.convictionExplanation || "",
      hasPrisonRecord: profile?.hasPrisonRecord || false,
      prisonRecordExplanation: profile?.prisonRecordExplanation || "",
      hasPendingCriminalCase: profile?.hasPendingCriminalCase || false,
      pendingCriminalCaseExplanation:
        profile?.pendingCriminalCaseExplanation || "",
      awareOfMalpracticeSuit: profile?.awareOfMalpracticeSuit || false,
      malpracticeSuitExplanation: profile?.malpracticeSuitExplanation || "",
    },
  });

  const { toast } = useToast();
  const { errors, isSubmitting } = form.formState;

  const onSubmit = async (data: BackgroundFormValues) => {
    try {
      const res = await axios.post(`/api/staff/${userId}`, data);

      toast({
        title: "Background Information Updated Successfully",
        variant: "default",
      });
      onNext(res.data.profile);
    } catch (error: any) {
      console.error(error);
      toast({
        title: "Server Side Error",
        description: error?.response?.statusText,
        variant: "destructive",
      });
    }
  };

  return (
    <Form {...form}>
      <form
        className="w-full max-w-4xl py-4"
        onSubmit={form.handleSubmit(onSubmit)}
      >
        <Card className="py-2">
          <CardContent className="space-y-4">
            <h1 className="text-2xl text-secondary-foreground lg:text-3xl font-bold">
              Background Information
            </h1>

            <FormField
              control={form.control}
              name="hasLicenseIssues"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>
                    Has your license ever lapsed, been revoked, or suspended?
                  </FormLabel>
                  <FormControl>
                    <div className="flex gap-4">
                      <label>
                        <input
                          type="radio"
                          value="false"
                          checked={!field.value}
                          onChange={() => field.onChange(false)}
                        />{" "}
                        No
                      </label>
                      <label>
                        <input
                          type="radio"
                          value="true"
                          checked={field.value}
                          onChange={() => field.onChange(true)}
                        />{" "}
                        Yes
                      </label>
                    </div>
                  </FormControl>
                </FormItem>
              )}
            />
            {form.watch("hasLicenseIssues") && (
              <FormField
                control={form.control}
                name="licenseIssuesExplanation"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Please explain</FormLabel>
                    <FormControl>
                      <Textarea {...field} />
                    </FormControl>
                    {errors.licenseIssuesExplanation && (
                      <FormMessage>
                        {errors.licenseIssuesExplanation.message}
                      </FormMessage>
                    )}
                  </FormItem>
                )}
              />
            )}

            <FormField
              control={form.control}
              name="hasConviction"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>
                    Have you ever, under your name or another name, been
                    convicted of a Misdemeanor or a Felony?
                  </FormLabel>
                  <FormControl>
                    <div className="flex gap-4">
                      <label>
                        <input
                          type="radio"
                          value="false"
                          checked={!field.value}
                          onChange={() => field.onChange(false)}
                        />{" "}
                        No
                      </label>
                      <label>
                        <input
                          type="radio"
                          value="true"
                          checked={field.value}
                          onChange={() => field.onChange(true)}
                        />{" "}
                        Yes
                      </label>
                    </div>
                  </FormControl>
                </FormItem>
              )}
            />
            {form.watch("hasConviction") && (
              <FormField
                control={form.control}
                name="convictionExplanation"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Please explain</FormLabel>
                    <FormControl>
                      <Textarea {...field} />
                    </FormControl>
                    {errors.convictionExplanation && (
                      <FormMessage>
                        {errors.convictionExplanation.message}
                      </FormMessage>
                    )}
                  </FormItem>
                )}
              />
            )}

            <FormField
              control={form.control}
              name="hasPrisonRecord"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>
                    Have you ever, under your name or another, been convicted of
                    a crime, which resulted with your being in prison and
                    released from prison or parole?
                  </FormLabel>
                  <FormControl>
                    <div className="flex gap-4">
                      <label>
                        <input
                          type="radio"
                          value="false"
                          checked={!field.value}
                          onChange={() => field.onChange(false)}
                        />{" "}
                        No
                      </label>
                      <label>
                        <input
                          type="radio"
                          value="true"
                          checked={field.value}
                          onChange={() => field.onChange(true)}
                        />{" "}
                        Yes
                      </label>
                    </div>
                  </FormControl>
                </FormItem>
              )}
            />
            {form.watch("hasPrisonRecord") && (
              <FormField
                control={form.control}
                name="prisonRecordExplanation"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Please explain</FormLabel>
                    <FormControl>
                      <Textarea {...field} />
                    </FormControl>
                    {errors.prisonRecordExplanation && (
                      <FormMessage>
                        {errors.prisonRecordExplanation.message}
                      </FormMessage>
                    )}
                  </FormItem>
                )}
              />
            )}

            <FormField
              control={form.control}
              name="hasPendingCriminalCase"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>
                    Are you currently under arrest, or released on bond or your
                    own recognizance pending trial for a criminal offense?
                  </FormLabel>
                  <FormControl>
                    <div className="flex gap-4">
                      <label>
                        <input
                          type="radio"
                          value="false"
                          checked={!field.value}
                          onChange={() => field.onChange(false)}
                        />{" "}
                        No
                      </label>
                      <label>
                        <input
                          type="radio"
                          value="true"
                          checked={field.value}
                          onChange={() => field.onChange(true)}
                        />{" "}
                        Yes
                      </label>
                    </div>
                  </FormControl>
                </FormItem>
              )}
            />
            {form.watch("hasPendingCriminalCase") && (
              <FormField
                control={form.control}
                name="pendingCriminalCaseExplanation"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Please explain</FormLabel>
                    <FormControl>
                      <Textarea {...field} />
                    </FormControl>
                    {errors.pendingCriminalCaseExplanation && (
                      <FormMessage>
                        {errors.pendingCriminalCaseExplanation.message}
                      </FormMessage>
                    )}
                  </FormItem>
                )}
              />
            )}

            <FormField
              control={form.control}
              name="awareOfMalpracticeSuit"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>
                    Are you aware of any circumstances which may result in a
                    malpractice suit being brought against you in the future
                    that may jeopardize your ability to work?
                  </FormLabel>
                  <FormControl>
                    <div className="flex gap-4">
                      <label>
                        <input
                          type="radio"
                          value="false"
                          checked={!field.value}
                          onChange={() => field.onChange(false)}
                        />{" "}
                        No
                      </label>
                      <label>
                        <input
                          type="radio"
                          value="true"
                          checked={field.value}
                          onChange={() => field.onChange(true)}
                        />{" "}
                        Yes
                      </label>
                    </div>
                  </FormControl>
                </FormItem>
              )}
            />
            {form.watch("awareOfMalpracticeSuit") && (
              <FormField
                control={form.control}
                name="malpracticeSuitExplanation"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Please explain</FormLabel>
                    <FormControl>
                      <Textarea {...field} />
                    </FormControl>
                    {errors.malpracticeSuitExplanation && (
                      <FormMessage>
                        {errors.malpracticeSuitExplanation.message}
                      </FormMessage>
                    )}
                  </FormItem>
                )}
              />
            )}
          </CardContent>
          <CardFooter>
            <Button disabled={isSubmitting} type="submit" className="ml-auto">
              {isSubmitting && <Loader />}{" "}
              {isInitialSetup ? "Save And Next Step" : "save"}
            </Button>
          </CardFooter>
        </Card>
      </form>
    </Form>
  );
};

export default BackgroundInformation;
