import { index, layout, prefix, route, type RouteConfig } from '@react-router/dev/routes';


export const teamMasterRoutes = [
    ...prefix("team", [
        index("routes/master/team/team-home.tsx"),
        route("add", "routes/master/team/team-add.tsx"),
        ...prefix(":idTeam", [
            route("edit", "routes/master/team/team-edit.tsx"),
        ]),

        // action team
        ...prefix("action", [
            route("submit-team", "features/team/action/submit-team.tsx"),
        ]),
    ]),
] satisfies RouteConfig