import { minioConnect } from "./connect";


export async function deleteFile(key: string) {
    await minioConnect.delete(key)
}