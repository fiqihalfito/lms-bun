import { S3Client } from "bun";
import { handleRequest, route, type Router } from "@better-upload/server";
import { minio } from "@better-upload/server/clients";
import "dotenv/config";
import { routes } from "@/lib/routes-upload/routes";

export const minioConnect = new S3Client({
  endpoint: process.env.MINIO_ENDPOINT!,
  accessKeyId: process.env.MINIO_ROOT_USER!,
  secretAccessKey: process.env.MINIO_ROOT_PASSWORD!,
  bucket: process.env.MINIO_BUCKET!,
});

export const router: Router = {
  client: minio({
    endpoint: process.env.MINIO_ENDPOINT!,
    accessKeyId: process.env.MINIO_ROOT_USER!,
    secretAccessKey: process.env.MINIO_ROOT_PASSWORD!,
    region: "auto",
  }),
  bucketName: process.env.MINIO_BUCKET!,
  routes: routes,
};

export abstract class StorageService {
  static getFileUrl(filename: string) {
    const url = minioConnect.presign(filename, {
      expiresIn: 60,
    });
    return url;
  }

  static uploadFile(request: Request) {
    return handleRequest(request, router);
  }

  static async deleteFile(keyFile: string) {
    await minioConnect.delete(keyFile);
  }
}
