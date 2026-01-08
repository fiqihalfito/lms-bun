import { useEffect } from 'react';
import type { ToastMessage } from 'remix-toast';
import { toast as notify } from "sonner";


export function useToastEffect(toast?: ToastMessage) {
    useEffect(() => {
        if (!toast) return;

        if (toast.type === "success") {
            notify.success(toast.message, {
                id: toast.type,
                position: "top-center",
                description: toast.description,
            });
        } else if (toast.type === "error") {
            notify.error(toast.message, {
                id: toast.type,
                position: "top-center",
                description: toast.description
            });
        } else if (toast.type === "warning") {
            notify.warning(toast.message, {
                id: toast.type,
                position: "top-center",
                description: toast.description
            });
        } else if (toast.type === "info") {
            notify.info(toast.message, {
                id: toast.type,
                position: "top-center",
                description: toast.description
            });
        }
    }, [toast]);
}