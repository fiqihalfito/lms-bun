import { index, layout, prefix, route, type RouteConfig } from "@react-router/dev/routes";


export const dashboardPublicRoutes = [
    layout("layout/dashboard-public-layout.tsx", [
        ...prefix("dashboard", [
            index("routes/dashboard/public/public.tsx"),
            route("stat-lulus-skill", "routes/dashboard/public/stat-lulus-skill.tsx", [
                route(":idSkill", "routes/dashboard/public/stat-lulus-skill-detail.tsx"),
            ]),
            route("stat-individu", "routes/dashboard/public/stat-individu.tsx", [
                route(":idUser", "routes/dashboard/public/stat-individu-detail.tsx"),
            ]),
        ]),
        // route("indikator-individu", "routes/dashboard/public/indikator-individu.tsx"),
    ]),
] satisfies RouteConfig