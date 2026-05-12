import { UserPICSubskillService } from "../services/UserPICSubskill";
import type { Route } from "./+types/hapus-pic";
import { dataWithError, dataWithSuccess } from "remix-toast";

export async function action({ request, params, context }: Route.ActionArgs) {

    const formData = await request.formData();
    const idUser = formData.get("idUser") as string;

    try {
        await UserPICSubskillService.deletePICSubskill(idUser);
        return dataWithSuccess({ success: true }, {
            message: "Data berhasil dihapus",
        });
    } catch (error) {
        if (error instanceof Error) {
            return dataWithError({ success: false }, error.message);
        }
        return dataWithError({ success: false }, "Terjadi kesalahan saat menghapus data");
    }

}