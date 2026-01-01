export function uploadFileXHR({
    url,
    file,
    onProgress,
}: {
    url: string
    file: File
    onProgress: (progress: number) => void
}) {
    return new Promise<void>((resolve, reject) => {
        const xhr = new XMLHttpRequest()

        xhr.upload.onprogress = (e) => {
            if (e.lengthComputable) {
                onProgress((e.loaded / e.total) * 100)
            }
        }

        xhr.onload = () => {
            if (xhr.status >= 200 && xhr.status < 300) {
                resolve()
            } else {
                reject(new Error(`Upload failed (${xhr.status})`))
            }
        }

        xhr.onerror = () => reject(new Error("Network error"))

        xhr.open("PUT", url)
        xhr.setRequestHeader("Content-Type", file.type)
        xhr.send(file)
    })
}
