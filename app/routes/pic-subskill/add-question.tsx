import { HeaderRoute } from "@/components/header-route";
import { FormMakeKuis } from "@/features/kuis/components/make-kuis/FormMakeKuis";
import { useNavigate } from "react-router";
import { Button } from "@/components/ui/button";
import { ChevronLeftIcon } from "lucide-react";
import type { Route } from "./+types/add-question";


export default function AddQuestionRoute({ loaderData, params }: Route.ComponentProps) {

    const navigate = useNavigate()

    return (
        <div>
            <HeaderRoute title="Tambah Soal" description="Tambah soal baru"
                actionButton={
                    <Button variant={"link"} onClick={() => navigate(-1)}>
                        <ChevronLeftIcon />
                        Kembali
                    </Button>
                }
            />
            <FormMakeKuis />
        </div>
    )
}