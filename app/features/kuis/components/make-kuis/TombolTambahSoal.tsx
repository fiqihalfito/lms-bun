import { Button } from "@/components/ui/button";
import { PlusIcon } from "lucide-react";
import { NavLink } from "react-router";

export function TombolTambahSoal({ idKuis }: { idKuis: string }) {
    return (
        <Button size={"lg"} asChild>
            <NavLink to={`kuis/${idKuis}/add-question`} viewTransition>
                <PlusIcon />
                Tambah Soal
            </NavLink>
        </Button>
    )
}