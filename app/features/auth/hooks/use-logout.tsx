import { useSubmit } from "react-router";

export function useLogout() {
    const submit = useSubmit();

    const logout = () => {
        submit(null, {
            method: "post",
            action: "/auth/action/logout",
        });
    };

    return { logout };
}
