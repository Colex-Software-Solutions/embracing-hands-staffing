"use client";
import React from "react";
import { Button } from "../ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogClose,
  DialogDescription,
} from "../ui/dialog";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/app/components/ui/form";
import { Textarea } from "../ui/textarea";
const contactFormSchema = z.object({
  message: z.string(),
});

export type ContactFormValues = z.infer<typeof contactFormSchema>;

interface ContactFormModalProps {
  name: string;
  emailTo: string;
  children: React.ReactNode;
  onSubmit: (data: ContactFormValues) => void;
}

export function ContactFormModal({
  name,
  children,
  onSubmit,
}: ContactFormModalProps) {
  const form = useForm<ContactFormValues>({
    resolver: zodResolver(contactFormSchema),
    defaultValues: {},
    mode: "onChange",
  });

  return (
    <Dialog>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
          <DialogHeader>
            <DialogTitle>Send a Message to {name}</DialogTitle>
          </DialogHeader>
          <DialogDescription>
            <Form {...form}>
              <FormField
                control={form.control}
                name="message"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <Textarea
                        className="mt-5 h-52"
                        placeholder="Please type your message"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </Form>
          </DialogDescription>
          <div className="flex justify-end gap-5 my-5">
            <DialogClose asChild>
              <Button type="button" variant="secondary">
                Cancel
              </Button>
            </DialogClose>
            <Button
              type="submit"
              variant="default"
              className="bg-green-600 hover:bg-green-400"
            >
              Send
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}
