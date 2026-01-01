import { useCallback, useState } from "react";

export function useFiles() {
    const [files, setFiles] = useState<File[]>([]);
    const [fileError, setFileError] = useState<string | null>(null);

    const onChangeFile = useCallback((files: File[]) => {
        setFileError(null);
        setFiles(files);
    }, []);

    const onRejectFile = useCallback((message: string) => {
        setFileError(message);
        setFiles([]);
    }, []);

    const resetFile = useCallback(() => {
        setFiles([]);
        setFileError(null);
    }, []);

    return { files, fileError, setFileError, onChangeFile, onRejectFile, resetFile };
}
