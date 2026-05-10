import { parseWithZod } from "@conform-to/zod/v4";
import type { Route } from "./+types/login";
import { loginSchema } from "../schema/login-schema";
import { dataWithError, redirectWithToast } from "remix-toast";
import { AuthService } from "../services/AuthService";

export async function action({ request, params }: Route.ActionArgs) {
  const cloned = request.clone();
  const formData = await cloned.formData();
  const submission = parseWithZod(formData, { schema: loginSchema });

  if (submission.status !== "success") {
    return dataWithError(submission.reply(), "Data yang disubmit error");
  }

  try {
    // // verify credentials
    // let idUser = await authenticator.authenticate("form", request);
    // // save session
    // const headers = await saveSession(request, idUser);
    const { idUser, headers, loginPath } = await AuthService.login(request);

    return redirectWithToast(
      loginPath,
      {
        message: "You are logged in",
        type: "success",
      },
      { headers },
    );
  } catch (error) {
    if (error instanceof Error) {
      return dataWithError(
        submission.reply({
          formErrors: [error.message],
        }),
        error.message,
      );
    }
  }
}
