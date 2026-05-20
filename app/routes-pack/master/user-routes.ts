import { index, layout, prefix, route, type RouteConfig } from '@react-router/dev/routes';


export const userMasterRoutes = [
    ...prefix("user", [
        index("routes/master/user/user-home.tsx"),
        route("add", "routes/master/user/user-add.tsx"),
        ...prefix(":idUser", [
            route("edit", "routes/master/user/user-edit.tsx"),
        ]),

        // action user
        ...prefix("action", [
            route("submit-user", "features/user/action/submit-user.tsx"),
        ]),
    ]),
] satisfies RouteConfig