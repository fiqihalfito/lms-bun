import type { FileUploadProps } from "@/components/ui/file-upload";
import React from "react";

export function useManualFileUpload(
    upload: NonNullable<FileUploadProps["onUpload"]>,
) {
    const uploadRef = React.useRef(upload);

    React.useEffect(() => {
        uploadRef.current = upload;
    }, [upload]);

    const triggerUpload = React.useCallback(
        async (files: File[], helpers: Parameters<typeof upload>[1]) => {
            return uploadRef.current(files, helpers);
        },
        [],
    );

    return { triggerUpload };
}
