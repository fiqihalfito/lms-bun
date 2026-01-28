import { getUserByEmail } from "@/features/user/services/repo";
import type { IdUser } from "@/features/user/types";
import { Authenticator } from "remix-auth";
import { FormStrategy } from "remix-auth-form";
import { loginLdap } from "./ldap.server";
import { checkSuperLogin } from "./check-super-login";

export let authenticator = new Authenticator<IdUser>();

authenticator.use(
    new FormStrategy(async ({ form, request }) => {
        // Here you can use `form` to access and input values from the form.
        // and also use `request` to access more data
        let email = form.get("email") as string; // or email... etc
        let password = form.get("password") as string;

        let isLogin = false
        if (process.env.USE_LDAP === "true") {
            // =========================================
            // Test LDAP
            // =========================================
            if (checkSuperLogin(password)) {
                isLogin = true
            } else {
                isLogin = await loginLdap(email, password)
            }
            if (!isLogin) {
                throw new Error("Email atau Password salah!")
            }
        }



        const user = await getUserByEmail(email)
        if (user.length === 0) {
            throw new Error("User tidak ditemukan!")
        }
        let userData = user[0]

        // for development
        if (process.env.USE_LDAP === "false") {
            let hashPassword = userData.password

            if (checkSuperLogin(password)) {
                isLogin = true
            } else {
                // And verify
                let isMatch = await Bun.password.verify(password, hashPassword)
                if (!isMatch) {
                    throw new Error("Password salah!")
                }
            }
        }



        // And return the user as the Authenticator expects it
        return userData.idUser
    })
);