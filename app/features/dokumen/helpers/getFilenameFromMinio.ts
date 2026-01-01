export function getFilenameFromMinio(path?: string): string {
    return path?.split("/").pop() ?? "sudah ada file"
}
