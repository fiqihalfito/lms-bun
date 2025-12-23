import { type RouteConfig, index, layout, prefix, route } from "@react-router/dev/routes";

export default [
    index("routes/home.tsx"),
    ...prefix("auth", [
        // route auth
        route("login", "routes/auth/login.tsx"),
        // action auth
        ...prefix("action", [
            route("login", "features/auth/action/login.tsx"),
            route("logout", "features/auth/action/logout.tsx"),
        ])
    ]),

    route("app", "routes/app.tsx", [

        layout("layout/sidebar-main-layout.tsx", [
            route("dashboard", "routes/dashboard.tsx"),

            ...prefix("dokumen", [
                index("routes/dokumen.tsx"),
                route("tipe/:tipeDokumen", "routes/dokumen-list/dokumen-list.tsx"),
                route("baca/:idDokumen", "routes/dokumen-viewer.tsx"),
            ]),
            // route("knowledge", "routes/dokumen-list/knowledge.tsx"),

        ])
    ])
] satisfies RouteConfig;
