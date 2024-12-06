import React, { useState } from "react";
import requiredDocs from "@/lib/data/requiredDocs.json";
import { CardTitle, CardContent, Card } from "@/app/components/ui/card";
import { Button } from "@/app/components/ui/button";
import DocumentModal from "./DocumentModal";
import PdfViewerModal from "@/app/components/modals/pdf-viewer-modal";
import { Document } from "@prisma/client";
import { useToast } from "@/app/components/ui/use-toast";
import axios from "axios";
import { useSession } from "next-auth/react";

const DocumentsSection = ({
  documents = [],
  userId,
  edit = false,
}: {
  documents: Document[];
  userId: string;
  edit?: boolean;
}) => {
  const { data: session } = useSession();
  const [isDocumentModalOpen, setIsDocumentModalOpen] = useState(false);
  const [selectedDocument, setSelectedDocument] = useState<Document | null>(
    null
  );
  const [documentsList, setDocumentsList] = useState<Document[]>(
    session?.user.role === "ADMIN"
      ? documents
      : documents.filter((doc) => !doc.isAdminUploaded)
  );
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
              <Card
                key={doc.id}
                className={`p-4 mt-4 ${
                  doc?.expiryDate &&
                  new Date(doc.expiryDate).getTime() < new Date().getTime() &&
                  "border-red-500"
                }`}
              >
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
                    {doc?.expiryDate &&
                      new Date(doc.expiryDate).getTime() <
                        new Date().getTime() && (
                        <span className="text-red-500"> (Expired)</span>
                      )}
                  </div>
                  <div className="space-x-2 flex">
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
                    {edit ||
                      (doc.isAdminUploaded && (
                        <>
                          {" "}
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
                          {!requiredDocs.includes(doc.name) && (
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
                          )}
                        </>
                      ))}
                  </div>
                </div>
              </Card>
            ))}
          </ul>
        )}
        {edit && (
          <Button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              handleOpenDocumentModal();
            }}
          >
            Add New Document
          </Button>
        )}
      </CardContent>

      {edit ||
        (session?.user.role === "ADMIN" && (
          <DocumentModal
            isOpen={isDocumentModalOpen}
            onClose={handleCloseDocumentModal}
            selectedDocument={selectedDocument}
            setDocumentsList={setDocumentsList}
            userId={userId}
          />
        ))}

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
