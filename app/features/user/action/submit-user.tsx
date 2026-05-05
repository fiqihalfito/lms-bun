import type { Route } from "./+types/submit-user";
import { dataWithError, redirectWithSuccess } from "remix-toast";
import { UserProfileService } from "../services/UserProfileService";

export async function action({ request, params, context }: Route.ActionArgs) {
  const formData = await request.formData();
  const { success, message, payload } =
    await UserProfileService.saveUserMaster(formData);

  if (success) {
    return redirectWithSuccess(`/app/master/user`, message);
  }

  return dataWithError(payload, message);
}
