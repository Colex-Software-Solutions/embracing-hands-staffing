import React from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogClose,
} from "@/app/components/ui/dialog";
import { Button } from "@/app/components/ui/button";
import { XIcon } from "lucide-react";

interface PdfViewerModalProps {
  isOpen: boolean;
  documentUrl: string;
  onClose: () => void;
}

const PdfViewerModal: React.FC<PdfViewerModalProps> = ({
  isOpen,
  documentUrl,
  onClose,
}) => {
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[1000px] bg-dark bg-opacity-75 border-none">
        {" "}
        <div className="h-[90vh]">
          <iframe
            src={documentUrl}
            width="100%"
            height="100%"
            style={{ border: "none" }}
            title="PDF Viewer"
          ></iframe>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default PdfViewerModal;
