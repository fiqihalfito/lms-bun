import { index, layout, prefix, route, type RouteConfig } from '@react-router/dev/routes';


export const skillRoutes = [
    ...prefix("skill", [
        index("routes/master/skill/skill-home.tsx"),
        route("team/:idTeam", "routes/master/skill/skill-list-page.tsx", [
            route(
                "skill/:idSkill",
                "routes/master/skill/skill-subskill-list-page.tsx", [
                // ...prefix("action", [
                //   // route("submit-team", "features/team/action/submit-team.tsx"),
                //   route("update-pic-subskill/:idSubSkill", "features/subskill/action/update-pic-subskill.tsx"),
                // ])
            ]
            ),
        ]),
        // route("add", "routes/master/skill/skill-add.tsx"),
        // ...prefix(":idSkill", [
        //     route("edit", "routes/master/skill/skill-edit.tsx"),
        // ]),

        // action team
        ...prefix("action", [
            // route("submit-team", "features/team/action/submit-team.tsx"),
            route("subskill/:idSubSkill/update-pic-subskill", "features/subskill/action/update-pic-subskill.tsx"),
        ])
    ]),
] satisfies RouteConfig