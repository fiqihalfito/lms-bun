import { Trash2Icon } from "lucide-react"

import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogMedia,
    AlertDialogTitle,
    AlertDialogTrigger,
} from "@/components/ui/alert-dialog"
import { Button } from "@/components/ui/button"
import { useFetcher } from "react-router"
import { useEffect, useEffectEvent, useState } from "react"

export function PICDeleteButton({ idUser }: { idUser: string }) {

    const fetcher = useFetcher()
    const isDeleting = fetcher.state !== "idle";

    const handleDelete = () => {
        fetcher.submit({
            idUser
        }, {
            method: "post",
            action: "action/hapus-pic"
        })
    }

    const onFetcherDone = useEffectEvent(() => {
        if (fetcher.data?.success) {
            setOpen(false)
        }
    })

    useEffect(() => {
        if (fetcher.state === "idle") {
            onFetcherDone()
        }
    }, [fetcher.state])

    const [open, setOpen] = useState(false)


    return (
        <AlertDialog open={open} onOpenChange={setOpen}>
            <AlertDialogTrigger asChild>
                <Button size="sm" variant={"destructive"}>
                    <Trash2Icon />
                    Hapus
                </Button>
            </AlertDialogTrigger>
            <AlertDialogContent size="sm">
                <AlertDialogHeader>
                    <AlertDialogMedia className="bg-destructive/10 text-destructive dark:bg-destructive/20 dark:text-destructive">
                        <Trash2Icon />
                    </AlertDialogMedia>
                    <AlertDialogTitle>Hapus PIC?</AlertDialogTitle>
                    <AlertDialogDescription>
                        Pastikan user ini tidak terdaftar di subskill
                    </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                    <AlertDialogCancel variant="outline">Cancel</AlertDialogCancel>
                    {/* <AlertDialogAction variant="destructive" disabled={isDeleting} onClick={handleDelete}>
                        {isDeleting ? "Menghapus..." : "Hapus"}
                    </AlertDialogAction> */}
                    <Button variant="destructive" disabled={isDeleting} onClick={handleDelete}>
                        {isDeleting ? "Menghapus..." : "Hapus"}
                    </Button>
                </AlertDialogFooter>
            </AlertDialogContent>
        </AlertDialog>
    )
}
