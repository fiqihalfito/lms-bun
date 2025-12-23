import type { IdUser } from "@/features/user/types";
import { createCookieSessionStorage } from "react-router";


export type SessionUser = IdUser
export let SESSION_KEY = 'idUser'

// !!! important part =======================================>>>>>>>>>>>>>>>>>>
export const sessionStorage = createCookieSessionStorage<
    {
        [SESSION_KEY]: SessionUser
    }
>({
    cookie: {
        name: '__session',
        httpOnly: true,
        path: '/',
        sameSite: 'lax',
        secrets: [process.env.SESSION_SECRET!],
        secure: process.env.NODE_ENV === 'production',
    },
})

export const getSession = async (request: Request) => {
    return await sessionStorage.getSession(request.headers.get('Cookie'))
}

export const getIdUserFromSession = async (request: Request) => {
    const session = await getSession(request)
    return session?.get(SESSION_KEY)
}

export const saveSession = async (request: Request, idUser: SessionUser) => {
    const session = await getSession(request)
    session.set(SESSION_KEY, idUser)
    return new Headers({
        'Set-Cookie': await sessionStorage.commitSession(session),
    })
}

export async function destroySession(request: Request) {
    const session = await getSession(request)
    return new Headers({
        'Set-Cookie': await sessionStorage.destroySession(session),
    })
}