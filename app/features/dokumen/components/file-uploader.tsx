import { Button } from "@/components/ui/button";
import {
    FileUpload,
    FileUploadDropzone,
    FileUploadTrigger,
    FileUploadList,
    FileUploadItem,
    FileUploadItemPreview,
    FileUploadItemMetadata,
    FileUploadItemProgress,
    FileUploadItemDelete,
    FileUploadClear,
    type FileUploadProps,
} from "@/components/ui/file-upload";
import { CloudUploadIcon, XIcon } from "lucide-react";
import { bytesToMB } from "../helpers/bytesToMB";

type FileUploadFieldProps = {
    value: File[];
    onChange: (files: File[]) => void;
    onReject: (message: string) => void;
    accept?: string;
    maxFiles?: number;
    maxSize?: number;
    required?: boolean;
    multiple?: boolean;
};

export function FileUploadField({
    value,
    onChange,
    onReject,
    accept,
    maxFiles = 1,
    maxSize,
    required,
    multiple,
}: FileUploadFieldProps) {


    return (
        <FileUpload
            value={value}
            onValueChange={onChange}
            accept={accept}
            maxFiles={maxFiles}
            maxSize={maxSize}
            onFileReject={(_, message) => onReject(message)}
            required={required}
            multiple={multiple}
        >
            <FileUploadDropzone>
                <div className="flex flex-col items-center gap-1 text-center">
                    <div className="flex items-center justify-center rounded-full border p-2.5">
                        <CloudUploadIcon className="size-6 text-muted-foreground" />
                    </div>
                    <p className="font-medium text-sm">Drag & drop pdf here</p>
                    <p className="text-muted-foreground text-xs">
                        Or click to browse (max 1 files, up to {bytesToMB(maxSize)}MB)
                    </p>
                </div>
                <FileUploadTrigger asChild>
                    <Button variant="outline" size="sm" className="mt-2 w-fit">
                        Browse files
                    </Button>
                </FileUploadTrigger>
            </FileUploadDropzone>

            <FileUploadList>
                {value.map((file) => (
                    <FileUploadItem key={file.name} value={file}>
                        <FileUploadItemPreview />
                        <FileUploadItemMetadata />
                        <FileUploadItemDelete asChild>
                            <Button
                                variant="ghost"
                                size="icon"
                                className="size-7"
                            >
                                <XIcon />
                                <span className="sr-only">Delete</span>
                            </Button>
                        </FileUploadItemDelete>
                    </FileUploadItem>
                ))}
            </FileUploadList>
        </FileUpload>
    );
}
