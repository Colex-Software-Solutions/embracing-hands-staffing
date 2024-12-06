const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient();

const AWS_REGION = process.env.NEXT_PUBLIC_AWS_REGION; // Ensure this is set in your environment

if (!AWS_REGION) {
  console.error("Error: NEXT_PUBLIC_AWS_REGION is not set.");
  process.exit(1);
}

(async function fixDocumentUrls() {
  try {
    // Fetch all documents with "undefined" in the URL
    const documents = await prisma.document.findMany({
      where: {
        documentUrl: {
          contains: "undefined.amazonaws.com",
        },
      },
    });

    if (documents.length === 0) {
      console.log("No documents need fixing.");
      return;
    }

    console.log(`Found ${documents.length} documents to fix.`);

    // Update each document URL
    const updates = documents.map((doc: any) => {
      const correctedUrl = doc.documentUrl.replace(
        "undefined.amazonaws.com",
        `${AWS_REGION}.amazonaws.com`
      );

      return prisma.document.update({
        where: { id: doc.id },
        data: { documentUrl: correctedUrl },
      });
    });

    await Promise.all(updates);

    console.log("All document URLs have been fixed.");
  } catch (error) {
    console.error("Error fixing document URLs:", error);
  } finally {
    await prisma.$disconnect();
  }
})();
