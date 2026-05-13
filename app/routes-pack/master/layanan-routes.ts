import { index, layout, prefix, route, type RouteConfig } from '@react-router/dev/routes';


export const layananMasterRoutes = [
    ...prefix("layanan", [
        index("routes/master/layanan/layanan-home.tsx"),
        route("add", "routes/master/layanan/layanan-add.tsx"),
        ...prefix(":idLayanan", [
            route("edit", "routes/master/layanan/layanan-edit.tsx"),
        ]),

        // action layanan
        ...prefix("action", [
            route(
                "submit-layanan",
                "features/layanan/action/submit-layanan.tsx",
            ),
        ]),
    ]),
] satisfies RouteConfig