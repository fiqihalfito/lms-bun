import { minioConnect } from "./connect"

export async function uploadFile(file: File) {
    console.log("uploading file")
    const filename = Bun.randomUUIDv7() + ".pdf"
    const key = `dokumen/${filename}`
    const buffer = await file.arrayBuffer()
    await minioConnect.write(key, buffer)
    return key
}