import { minioConnect } from "./connect"

export async function uploadFile(file: File) {
    const filename = Bun.randomUUIDv7() + ".pdf"
    const key = `dokumen/${filename}`
    await minioConnect.write(key, file)
    return key
}