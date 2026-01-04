import type { DOCUMENT_MIME_TYPES, IMAGE_MIME_TYPES, VIDEO_MIME_TYPES } from "@/lib/constants/upload-mime"


export type ImageMimeType = typeof IMAGE_MIME_TYPES[number]
export type VideoMimeType = typeof VIDEO_MIME_TYPES[number]
export type DocumentMimeType = typeof DOCUMENT_MIME_TYPES[number]

export type AcceptMimeType =
    | ImageMimeType
    | VideoMimeType
    | DocumentMimeType
