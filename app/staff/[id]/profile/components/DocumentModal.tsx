import React, { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/app/components/ui/dialog";
import { Button } from "@/app/components/ui/button";
import { useToast } from "@/app/components/ui/use-toast";
import { Label } from "@/app/components/ui/label";
import { Input } from "@/app/components/ui/input";
import axios from "axios";
import { Document } from "@prisma/client";

interface DocumentModalProps {
  isOpen: boolean;
  userId: string;
  onClose: () => void;
  selectedDocument: Document | null;
  setDocumentsList: React.Dispatch<React.SetStateAction<Document[]>>;
}

const DocumentModal: React.FC<DocumentModalProps> = ({
  isOpen,
  userId,
  onClose,
  selectedDocument,
  setDocumentsList,
}) => {
  const { toast } = useToast();
  const [documentName, setDocumentName] = useState(
    selectedDocument?.name || ""
  );
  const [documentFile, setDocumentFile] = useState<File | null>(null);
  const [expiryDate, setExpiryDate] = useState<string | null>(
    selectedDocument?.expiryDate?.toISOString().split("T")[0] ?? null
  );

  const validateForm = () => {
    if (!documentName.trim()) {
      toast({
        variant: "destructive",
        title: "Validation Error",
        description: "Document name is required.",
      });
      return false;
    }

    if (!documentFile && !selectedDocument) {
      toast({
        variant: "destructive",
        title: "Validation Error",
        description: "Document file is required.",
      });
      return false;
    }

    return true;
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setDocumentFile(file);
    }
  };

  const onSubmit = async () => {
    if (!validateForm()) {
      return;
    }

    try {
      const formData = new FormData();
      if (documentFile) {
        formData.append("documentFile", documentFile);
      }
      formData.append("userId", userId);
      formData.append("name", documentName);
      if (expiryDate) {
        formData.append("expiryDate", expiryDate);
      }

      let res: any;
      if (selectedDocument) {
        res = await axios.put(`/api/document/${selectedDocument.id}`, formData);
      } else {
        res = await axios.post(`/api/document`, formData);
      }

      setDocumentsList((docs) => {
        if (selectedDocument) {
          return docs.map((doc) =>
            doc.id === res.data.document.id ? res.data.document : doc
          );
        } else {
          return [...docs, res.data.document];
        }
      });

      toast({
        variant: "default",
        title: "Document saved successfully",
      });

      onClose();
    } catch (error) {
      console.error(error);
      toast({
        variant: "destructive",
        title: "Failed to save document",
      });
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent>
        <form
          onSubmit={(e) => {
            e.preventDefault();
            e.stopPropagation();
            onSubmit();
          }}
        >
          <DialogHeader>
            <DialogTitle>
              {selectedDocument ? "Edit Document" : "Add New Document"}
            </DialogTitle>
          </DialogHeader>

          <div>
            <Label htmlFor="documentName">Document Name</Label>
            <Input
              value={documentName}
              onChange={(e) => setDocumentName(e.target.value)}
            />
          </div>

          <div>
            <Label htmlFor="documentFile">Upload Document</Label>
            <Input type="file" onChange={handleFileChange} />
          </div>

          <div>
            <Label htmlFor="expiryDate">Expiry Date (optional)</Label>
            <Input
              type="date"
              value={expiryDate || ""}
              onChange={(e) => setExpiryDate(e.target.value)}
            />
          </div>

          <div className="flex justify-end mt-4">
            <Button type="submit">Add</Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default DocumentModal;
