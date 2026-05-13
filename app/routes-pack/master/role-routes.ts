import { index, layout, prefix, route, type RouteConfig } from '@react-router/dev/routes';


export const roleMasterRoutes = [
    ...prefix("role", [
        index("routes/master/role/role-home.tsx"),
        // route("add", "routes/master/role/role-add.tsx"),
        // ...prefix(":idRole", [
        //   route("edit", "routes/master/role/role-edit.tsx"),
        // ]),

        // action team
        // ...prefix("action", [
        //   route("submit-role", "features/role/action/submit-role.tsx"),
        // ]),
    ]),
] satisfies RouteConfig