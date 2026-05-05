import "dotenv/config";
import type { Route } from "./+types/upload";
import { StorageService } from "@/features/storage/service/StorageService";

// export const router: Router = {
//   client: minio({
//     endpoint: process.env.MINIO_ENDPOINT!,
//     accessKeyId: process.env.MINIO_ROOT_USER!,
//     secretAccessKey: process.env.MINIO_ROOT_PASSWORD!,
//     region: "auto",
//   }),
//   bucketName: process.env.MINIO_BUCKET!,
//   routes: routes,
// };

export async function action({ request, params, context }: Route.ActionArgs) {
  // return handleRequest(request, router);
  return StorageService.uploadFile(request);
}
