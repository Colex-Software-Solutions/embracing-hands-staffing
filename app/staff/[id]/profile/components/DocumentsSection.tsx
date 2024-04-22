import React, { useState } from "react";

import { CardTitle, CardContent, Card } from "@/app/components/ui/card";
import { Button } from "@/app/components/ui/button";
import DocumentModal from "./DocumentModal";
import PdfViewerModal from "@/app/components/modals/pdf-viewer-modal";
import { Document } from "@prisma/client";
import { useToast } from "@/app/components/ui/use-toast";
import axios from "axios";

const DocumentsSection = ({
  documents = [],
  userId,
}: {
  documents: Document[];
  userId: string;
}) => {
  const [isDocumentModalOpen, setIsDocumentModalOpen] = useState(false);
  const [selectedDocument, setSelectedDocument] = useState<Document | null>(
    null
  );
  const [documentsList, setDocumentsList] = useState<Document[]>(documents);
  const { toast } = useToast();
  const [isPdfViewerOpen, setIsPdfViewerOpen] = useState(false);
  const [selectedDocumentUrl, setSelectedDocumentUrl] = useState<string | null>(
    null
  );
  const openPdfViewer = (documentUrl: string) => {
    setSelectedDocumentUrl(documentUrl);
    setIsPdfViewerOpen(true);
  };

  const closePdfViewer = () => {
    setIsPdfViewerOpen(false);
    setSelectedDocumentUrl(null);
  };
  const handleRemoveDocument = async (documentId: string) => {
    try {
      await axios.delete(`/api/document/${documentId}`);
      setDocumentsList(documentsList.filter((doc) => doc.id !== documentId));
      toast({
        variant: "default",
        title: "Document removed successfully",
      });
    } catch (error) {
      console.error(error);
      toast({
        variant: "destructive",
        title: "Failed to remove document",
      });
    }
  };

  const handleOpenDocumentModal = (document: Document | null = null) => {
    setSelectedDocument(document);
    setIsDocumentModalOpen(true);
  };

  const handleCloseDocumentModal = () => {
    setIsDocumentModalOpen(false);
    setSelectedDocument(null);
  };

  return (
    <>
      <CardContent>
        <CardTitle>Documents</CardTitle>
        {documentsList.length === 0 ? (
          <div>No documents uploaded</div>
        ) : (
          <ul className="my-4">
            {documentsList.map((doc) => (
              <Card key={doc.id} className="p-4">
                <div className="flex justify-between items-center">
                  <div>
                    <strong>{doc.name}</strong> -{" "}
                    <a
                      href={doc.documentUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      Download
                    </a>
                  </div>
                  <div className="space-x-2">
                    <Button
                      variant="secondary"
                      size="sm"
                      type="button"
                      onClick={(e) => {
                        e.stopPropagation();
                        openPdfViewer(doc.documentUrl);
                      }}
                    >
                      View
                    </Button>
                    <Button
                      variant="secondary"
                      size="sm"
                      type="button"
                      onClick={(e) => {
                        e.stopPropagation();
                        handleOpenDocumentModal(doc);
                      }}
                    >
                      Edit
                    </Button>
                    <Button
                      variant="destructive"
                      size="sm"
                      type="button"
                      onClick={(e) => {
                        e.stopPropagation();
                        handleRemoveDocument(doc.id);
                      }}
                    >
                      Remove
                    </Button>
                  </div>
                </div>
              </Card>
            ))}
          </ul>
        )}
        <Button
          type="button"
          onClick={(e) => {
            e.stopPropagation();
            handleOpenDocumentModal();
          }}
        >
          Add New Document
        </Button>
      </CardContent>

      <DocumentModal
        isOpen={isDocumentModalOpen}
        onClose={handleCloseDocumentModal}
        selectedDocument={selectedDocument}
        setDocumentsList={setDocumentsList}
        userId={userId}
      />
      {/* PDF Viewer Modal */}
      {selectedDocumentUrl && (
        <PdfViewerModal
          isOpen={isPdfViewerOpen}
          documentUrl={selectedDocumentUrl}
          onClose={closePdfViewer}
        />
      )}
    </>
  );
};

export default DocumentsSection;
