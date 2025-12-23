import { Spinner } from "@/components/ui/spinner";
import { useEffect, useState } from "react";
import { DokumenViewerLoading } from "./DokumenViewerLoading";

interface DokumenViewerProps {
    presignedUrl: string;
}

export function DokumenViewer({ presignedUrl }: DokumenViewerProps) {

    const [loading, setLoading] = useState(true);

    useEffect(() => {
        // beri waktu browser render iframe
        const id = requestAnimationFrame(() => {
            setLoading(false);
        });

        return () => cancelAnimationFrame(id);
    }, []);

    return (
        <div className="flex-1 flex flex-col">

            {loading && (
                <DokumenViewerLoading />
            )}

            <embed
                key={presignedUrl}
                src={presignedUrl}
                type="application/pdf"
                className="w-full flex-1 rounded-md"
                onLoad={() => setLoading(false)}
                onError={() => setLoading(false)}
            />
        </div>
    )
}