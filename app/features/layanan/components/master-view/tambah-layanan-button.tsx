import { Button } from "@/components/ui/button";
import { PlusIcon } from "lucide-react";
import { Link } from "react-router";

export function TambahLayananButton() {
    return (
        <div className="flex items-center gap-4">
            <Button size={"lg"} asChild>
                <Link to={`add`}>
                    <PlusIcon />
                    Tambah
                </Link>
            </Button>
        </div>
    )
}