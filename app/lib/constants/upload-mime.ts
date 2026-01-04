/* ================== IMAGE ================== */
export const IMAGE_MIME_TYPES = [
    "image/jpeg",
    "image/png",
    "image/webp",
    "image/gif",
    "image/svg+xml",
] as const

/* ================== VIDEO ================== */
export const VIDEO_MIME_TYPES = [
    "video/mp4",
    "video/webm",
    "video/ogg",
    "video/quicktime",      // .mov
    "video/x-matroska",     // .mkv (utama)
    "application/x-matroska", // fallback
] as const

/* ================== DOCUMENT ================== */
export const DOCUMENT_MIME_TYPES = [
    "application/pdf",
    "application/msword",
    "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
    "application/vnd.ms-excel",
    "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
    "application/vnd.ms-powerpoint",
    "application/vnd.openxmlformats-officedocument.presentationml.presentation",
    "text/plain",
] as const