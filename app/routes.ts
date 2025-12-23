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

    route("app", "routes/app.tsx", { id: "app" }, [

        layout("layout/sidebar-main-layout.tsx", [
            route("dashboard", "routes/dashboard.tsx"),

            ...prefix("dokumen", [
                // route dokumen
                index("routes/dokumen/dokumen.tsx"),
                ...prefix("tipe/:tipeDokumen", [
                    index("routes/dokumen/dokumen-list.tsx"),
                    route("add", "routes/dokumen/dokumen-add.tsx"),
                ]),
                route("baca/:idDokumen", "routes/dokumen/dokumen-viewer.tsx"),

                // action dokumen
                ...prefix("action", [
                    ...prefix("tipe/:tipeDokumen", [
                        route("add", "features/dokumen/action/action-add-dokumen.tsx"),
                    ])
                ]),
            ]),
            // route("knowledge", "routes/dokumen-list/knowledge.tsx"),

        ])
    ])
] satisfies RouteConfig;
