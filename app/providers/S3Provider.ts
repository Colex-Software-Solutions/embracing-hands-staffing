import { S3Client, PutObjectCommand } from "@aws-sdk/client-s3";

const s3 = new S3Client({
  region: process.env.NEXT_PUBLIC_AWS_REGION,
  credentials: {
    accessKeyId: process.env.NEXT_PUBLIC_S3_ACCESS_KEY!,
    secretAccessKey: process.env.NEXT_PUBLIC_S3_SECRET_KEY!,
  },
});

const uploadFile = async (
  file: Buffer,
  fileName: string,
  contentType: string
) => {
  const bucketName = process.env.NEXT_PUBLIC_AWS_BUCKET_NAME;
  const key = `${fileName}-${Date.now()}`;
  const uploadParams = {
    Bucket: bucketName,
    Key: key,
    Body: file,
    ContentType: contentType,
  };
  try {
    const command = new PutObjectCommand(uploadParams);
    await s3.send(command);
    const location = `https://${bucketName}.s3.${process.env.NEXT_PUBLIC_AWS_REGION}.amazonaws.com/${key}`;
    return location;
  } catch (error) {
    console.error("Error uploading file to S3:", error);
    throw error;
  }
};

export { uploadFile };
