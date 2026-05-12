import { UserPICSubskillService } from "../services/UserPICSubskill";
import type { Route } from "./+types/submit-pic";
import { dataWithError, dataWithSuccess, redirectWithSuccess } from "remix-toast";

export async function action({ request, params, context }: Route.ActionArgs) {

    const formData = await request.formData();
    const idUser = formData.get("idUser") as string;

    try {
        await UserPICSubskillService.savePICSubskill(idUser);
        return redirectWithSuccess(`/app/master/pic`, {
            message: "Data berhasil ditambahkan",
        });
    } catch (error) {
        if (error instanceof Error) {
            return dataWithError({ success: false }, error.message);
        }
        return dataWithError({ success: false }, "Terjadi kesalahan saat menambahkan data");
    }

}