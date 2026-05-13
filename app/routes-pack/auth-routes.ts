import { prefix, route, type RouteConfig } from "@react-router/dev/routes";

export const authRoutes = [
    ...prefix("auth", [
        // route auth
        route("login", "routes/auth/login.tsx"),
        // action auth
        ...prefix("action", [
            route("login", "features/auth/action/login.tsx"),
            route("logout", "features/auth/action/logout.tsx"),
        ]),
    ]),
] satisfies RouteConfig