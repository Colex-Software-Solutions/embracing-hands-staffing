import React from "react";
import { Card, CardContent, CardTitle } from "@/app/components/ui/card";
import { Button } from "@/app/components/ui/button";
import PdfViewerModal from "@/app/components/modals/pdf-viewer-modal";
import { Invoice } from "@prisma/client";

const InvoiceViewingSection = ({ invoices }: { invoices: Invoice[] }) => {
  const [isPdfViewerOpen, setIsPdfViewerOpen] = React.useState(false);
  const [selectedInvoiceUrl, setSelectedInvoiceUrl] = React.useState("");

  const openPdfViewer = (invoiceUrl: string) => {
    setSelectedInvoiceUrl(invoiceUrl);
    setIsPdfViewerOpen(true);
  };

  const closePdfViewer = () => {
    setIsPdfViewerOpen(false);
    setSelectedInvoiceUrl("");
  };

  return (
    <CardContent className="my-4">
      <CardTitle className="md:text-2xl text-lg">Invoices</CardTitle>
      {invoices.length === 0 ? (
        <div>No invoices uploaded</div>
      ) : (
        <ul className="my-4">
          {invoices
            .sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime())
            .map((invoice) => (
              <Card key={invoice.id} className="p-4 mt-4">
                <div className="flex justify-between items-center">
                  <div>
                    <strong>
                      {invoice.createdAt.toLocaleDateString().slice(0, 10)}
                    </strong>{" "}
                    -{" "}
                    <a
                      href={invoice.url}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      Download
                    </a>
                  </div>
                  <Button
                    variant="secondary"
                    size="sm"
                    onClick={() => openPdfViewer(invoice.url)}
                  >
                    View
                  </Button>
                </div>
              </Card>
            ))}
        </ul>
      )}

      {/* PDF Viewer Modal */}
      {selectedInvoiceUrl && (
        <PdfViewerModal
          isOpen={isPdfViewerOpen}
          documentUrl={selectedInvoiceUrl}
          onClose={closePdfViewer}
        />
      )}
    </CardContent>
  );
};

export default InvoiceViewingSection;
