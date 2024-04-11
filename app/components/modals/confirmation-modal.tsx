import React from "react";
import { Button } from "@/app/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogClose,
} from "@/app/components/ui/dialog";
import { cn } from "@/lib/utils";

interface ConfirmationModalProps {
  triggerButtonText: string;
  confirmationQuestion: string;
  triggerButtonClassNames?: string;
  onConfirm: () => Promise<void> | void;
  confirmButtonText: string;
  cancelButtonText?: string;
}

export const ConfirmationModal: React.FC<ConfirmationModalProps> = ({
  triggerButtonText,
  triggerButtonClassNames,
  confirmationQuestion,
  onConfirm,
  confirmButtonText,
  cancelButtonText = "Cancel",
}) => {
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await onConfirm();
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button
          className={cn(
            "w-full justify-center font-semibold flex pl-2  hover:bg-primary hover:text-primary-foreground",
            triggerButtonClassNames
          )}
        >
          {triggerButtonText}
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <form onSubmit={handleSubmit}>
          <DialogHeader>
            <DialogTitle>{confirmationQuestion}</DialogTitle>
          </DialogHeader>
          <div className="flex justify-center gap-5 my-5">
            <DialogClose asChild>
              <Button type="button" variant="secondary">
                {cancelButtonText}
              </Button>
            </DialogClose>
            <DialogClose asChild>
              <Button
                type="submit"
                variant="default"
                className="bg-primary hover:bg-primary-light"
              >
                {confirmButtonText}
              </Button>
            </DialogClose>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};
