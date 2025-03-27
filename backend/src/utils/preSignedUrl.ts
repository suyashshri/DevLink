import { PutObjectCommand, S3Client } from "@aws-sdk/client-s3";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";
import axios from "axios";
import { prisma } from "./db";

const client = new S3Client({
  region: process.env.AWS_REGION,
  credentials: {
    accessKeyId: process.env.AWS_ACCESS_KEY_ID!,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY!,
  },
});

export async function putObject(key: string, fileType: string) {
  const command = new PutObjectCommand({
    Bucket: process.env.AWS_BUCKET_NAME,
    Key: key,
    ContentType: fileType,
  });

  const url = await getSignedUrl(client, command, { expiresIn: 60 });
}

const uploadFileToS3 = async (
  fileUrl: string,
  filePath: string,
  projectId: string
) => {
  try {
    // 1. Download file from GitHub
    const fileResponse = await axios.get(fileUrl, {
      responseType: "arraybuffer",
    });

    // 2. Upload to S3
    const fileKey = `projects/${projectId}/${filePath}`;
    await client.send(
      new PutObjectCommand({
        Bucket: process.env.S3_BUCKET_NAME,
        Key: fileKey,
        Body: fileResponse.data,
      })
    );

    // 3. Save metadata in PostgreSQL
    const newFile = await prisma.file.create({
      data: {
        name: filePath.split("/").pop()!,
        pathS3Url: `https://${process.env.S3_BUCKET_NAME}.s3.amazonaws.com/${fileKey}`,
        projectId,
      },
    });

    return newFile;
  } catch (error) {
    throw new Error("Error uploading file to S3");
  }
};
