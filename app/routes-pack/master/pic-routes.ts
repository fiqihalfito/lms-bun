import { index, layout, prefix, route, type RouteConfig } from '@react-router/dev/routes';


export const picMasterRoutes = [
    ...prefix("pic", [
        index("routes/master/pic/pic-home.tsx"),
        route("add", "routes/master/pic/pic-add.tsx"),
        // ...prefix(":idRole", [
        //   route("edit", "routes/master/role/role-edit.tsx"),
        // ]),

        // action pic
        ...prefix("action", [
            route("submit-pic", "features/user/action/submit-pic.tsx"),
            route("hapus-pic", "features/user/action/hapus-pic.tsx"),
        ]),
    ]),
] satisfies RouteConfig