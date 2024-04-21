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
import { Document, Page } from "react-pdf";
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
      <DialogContent className="sm:max-w-[1000px] bg-dark bg-opacity-75">
        {" "}
        {/* Dimming background */}
        <DialogHeader className="flex justify-between items-center">
          <DialogTitle>Document Viewer</DialogTitle>
          <DialogClose asChild>
            <Button variant="ghost">
              <XIcon />
            </Button>
          </DialogClose>
        </DialogHeader>
        <div className="flex justify-center items-center h-full">
          {" "}
          {/* Centering content */}
          <Document file={documentUrl}>
            <Page pageNumber={1} /> {/* Display first page */}
          </Document>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default PdfViewerModal;
