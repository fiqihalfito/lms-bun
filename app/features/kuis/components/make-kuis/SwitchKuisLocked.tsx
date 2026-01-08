import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { LockIcon, UnlockIcon } from "lucide-react";
import { useFetcher } from "react-router";

type SwitchKuisLockedProp = {
    idKuis: string,
    isLocked: boolean
}

export function SwitchKuisLocked({ idKuis, isLocked }: SwitchKuisLockedProp) {

    const fetcher = useFetcher()

    const handleCheckedChange = (checked: boolean) => {

        fetcher.submit({
            locked: checked
        }, {
            method: "post",
            action: `kuis/${idKuis}/action/lock`,
        })
    }

    if (fetcher?.formData) {
        isLocked = fetcher.formData.get("locked") === "true"
    }


    return (
        <Label htmlFor="kunci-soal" className="flex items-center justify-between p-4 border rounded-xl bg-background shadow-sm transition-all cursor-pointer">
            <div className="flex items-center gap-3">
                <div className={`p-2 rounded-lg transition-colors ${isLocked ? "bg-muted text-muted-foreground" : "bg-primary/10 text-primary"}`}>
                    {isLocked ? <LockIcon size={20} /> : <UnlockIcon size={20} />}
                </div>
                <div className="flex flex-col">
                    <span className="text-sm font-semibold">
                        {isLocked ? "Kuis Terkunci" : "Kuis Terpublish"}
                    </span>
                    <span className="text-xs text-muted-foreground">
                        {isLocked ? "User tidak dapat mengakses kuis" : "Kuis dapat diakses oleh user"}
                    </span>
                </div>
            </div>
            <Switch
                id="kunci-soal"
                checked={!isLocked}
                onCheckedChange={(checked) => handleCheckedChange(!checked)}
            />
        </Label>
    )
}