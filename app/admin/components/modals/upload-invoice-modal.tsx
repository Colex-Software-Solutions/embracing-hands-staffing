import React, { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogClose,
} from "../../../components/ui/dialog";
import { Button } from "../../../components/ui/button";
import { useToast } from "../../../components/ui/use-toast";
import axios from "axios";
import { Input } from "@/app/components/ui/input";
import Link from "next/link";

// TODO remove invoice modal

export default function UploadInvoiceModal({ jobId }: { jobId: string }) {
  const { toast } = useToast();
  const [file, setFile] = useState(null);

  const handleFileChange = (event: any) => {
    setFile(event.target.files[0]);
  };

  const handleSubmit = async (event: any) => {
    event.preventDefault();
    if (!file) {
      toast({
        title: "No file selected",
        description: "Please select a file to upload",
        variant: "destructive",
      });
      return;
    }

    const formData = new FormData();
    formData.append("invoice", file);

    try {
      const response = await axios.post(`/api/invoices/${jobId}`, formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      if (response.data.success) {
        toast({
          title: "Invoice Uploaded",
          description: "The invoice has been successfully uploaded.",
          variant: "default",
        });
      } else {
        throw new Error("Failed to upload invoice");
      }
    } catch (error) {
      console.error("Error uploading invoice:", error);
      toast({
        title: "Error",
        description: "Failed to upload invoice",
        variant: "destructive",
      });
    }
  };

  return (
    <Dialog>
      {/* <DialogTrigger asChild>
        <Button
          className="w-full border-0 justify-start flex pl-2 font-normal"
          variant="outline"
        >
          Upload Invoice
        </Button>
      </DialogTrigger> */}
      <DialogTrigger asChild>
        <Link href={`/admin/jobs/${jobId}/invoices`} className="w-full">
          <Button
            className="w-full border-0 justify-start flex pl-2 font-normal"
            variant="outline"
          >
            Invoices
          </Button>
        </Link>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Upload Invoice</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit}>
          <Input type="file" onChange={handleFileChange} accept=".pdf" />
          <div className="flex justify-end gap-4 mt-4">
            <DialogClose asChild>
              <Button variant="secondary">Cancel</Button>
            </DialogClose>
            <Button type="submit" variant="default">
              Upload
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}
