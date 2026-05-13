import { index, layout, prefix, route, type RouteConfig } from '@react-router/dev/routes';


export const resourcesRoutes = [
    // resources
    ...prefix("resources", [
        ...prefix("layanan", [
            route("get-layanan-all", "features/layanan/loaders/get-layanan-all.tsx"),
        ]),
        ...prefix("team", [
            route("get-team-all", "features/team/loaders/get-team-all.tsx"),
        ]),
        ...prefix("role", [
            route("get-role-all", "features/role/loaders/get-role-all.tsx"),
        ]),
    ]),
] satisfies RouteConfig