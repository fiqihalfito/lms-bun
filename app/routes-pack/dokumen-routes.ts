import { index, layout, prefix, route, type RouteConfig } from '@react-router/dev/routes';


export const dokumenRoutes = [
    ...prefix("dokumen", [
        // route dokumen
        index("routes/dokumen/dokumen.tsx"),
        ...prefix("tipe/:tipeDokumen", [
            index("routes/dokumen/dokumen-list.tsx"),
            route("add", "routes/dokumen/dokumen-add.tsx"),
            ...prefix(":idDokumen", [
                route("edit", "routes/dokumen/dokumen-edit.tsx"),
            ]),
        ]),
        route("baca/:idDokumen", "routes/dokumen/dokumen-viewer.tsx"),

        // action dokumen
        ...prefix("action", [
            ...prefix("tipe/:tipeDokumen", [
                route(
                    "submit-sop",
                    "features/dokumen/action/submit-dokumen-sop.tsx",
                ), // untuk insert dan update
                route("submit-ik", "features/dokumen/action/submit-dokumen-ik.tsx"), // untuk insert dan update
            ]),
        ]),
    ]),
] satisfies RouteConfig