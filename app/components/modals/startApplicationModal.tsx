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
} from "../ui/dialog";
import { useToast } from "../ui/use-toast";
import axios from "axios";

interface StartApplicationModalProps {
  jobPostId: string;
}

export function StartApplicationModal({
  jobPostId,
}: StartApplicationModalProps) {
  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    console.log("submit");
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button
          className="w-96 rounded-full text-white bg-primary hover:text-primary"
          variant="outline"
        >
          Start Application
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <form onSubmit={handleSubmit}>
          <DialogHeader>
            <DialogTitle>Do you wish to submit this application?</DialogTitle>
          </DialogHeader>
          <div className="flex justify-center gap-5 my-5">
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
              Submit
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}
