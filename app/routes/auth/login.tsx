import { LoginForm } from "@/features/auth/components/login-form";
import type { Route } from "./+types/login";
import { LoginPage } from "@/features/auth/components/login-page";
import { getToast } from "remix-toast";
import { data } from "react-router";
import { useToastEffect } from "@/hooks/use-toast";
import { loginMiddleware } from "@/lib/middleware.server";

export const middleware: Route.MiddlewareFunction[] = [
    loginMiddleware,
];

export async function loader({ request, params }: Route.LoaderArgs) {

    const { toast, headers } = await getToast(request);

    return data({ toast }, { headers });

}


export default function LoginRoute({ loaderData }: Route.ComponentProps) {

    const { toast } = loaderData

    useToastEffect(toast)

    return (
        <LoginPage>
            <LoginForm />
        </LoginPage>
    )
}