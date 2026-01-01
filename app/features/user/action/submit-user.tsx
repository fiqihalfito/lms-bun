import { parseWithZod } from "@conform-to/zod/v4";
import type { Route } from "./+types/submit-user";
import { userSchema } from "../schema/user-schema";
import { dataWithError, redirectWithSuccess } from "remix-toast";
import { updateUser } from "../services/repo/updateUser";
import { updateUserProfile } from "../services/repo/updateUserProfile";
import { insertUserAccount } from "../services/insertUserAccount";
import { insertUserProfile } from "../services/repo/insertUserProfile";
import { getDbErrorMessage } from "database/utils/dbErrorUtils";

export async function action({ request, params, context }: Route.ActionArgs) {

    try {
        const formData = await request.formData();
        const submission = parseWithZod(formData, { schema: userSchema });

        if (submission.status !== 'success') {
            return dataWithError(submission.reply(), "Data yang disubmit error");
        }

        const idUser = formData.get("idUser")
        const newPassword = submission.value.newpassword ? await Bun.password.hash(submission.value.newpassword) : await Bun.password.hash("1234")

        if (!idUser) {
            // user account
            const newIdUser = await insertUserAccount({
                email: submission.value.email,
                password: newPassword,
                idRole: submission.value.idRole,
            })
            // user profile
            await insertUserProfile({
                namaUser: submission.value.namaUser,
                idUser: newIdUser[0].idUser,
                idSubBidang: "s1"
            })
            return redirectWithSuccess(`/app/master/user`, `User ${submission.value.namaUser} berhasil disimpan`)
        } else {
            // user account
            await updateUser(idUser as string, {
                email: submission.value.email,
                password: newPassword,
                idRole: submission.value.idRole,
            });
            // user profile
            await updateUserProfile(idUser as string, {
                namaUser: submission.value.namaUser,
                idUser: idUser as string,
            });
            return redirectWithSuccess(`/app/master/user`, `User ${submission.value.namaUser} berhasil diupdate`)
        }
    } catch (error) {
        const { message, constraint } = getDbErrorMessage(error);
        return dataWithError(null, message);
    }
}