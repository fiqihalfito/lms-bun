import { Button } from "@/components/ui/button"
import type { getAllSubbidang } from "@/features/subbidang/services/getAllSubbidang"

interface SubbidangFilterProps {
    subbidang: Awaited<ReturnType<typeof getAllSubbidang>>
}

export function SubbidangFilter({ subbidang }: SubbidangFilterProps) {
    return (
        <div className="grid grid-cols-3 gap-2">
            {subbidang.map((item) => (
                <Button key={item.idSubBidang} variant={"outline"}>
                    {item.namaSubBidang}
                </Button>
            ))}
        </div>
    )
}