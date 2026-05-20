import { index, layout, prefix, route, type RouteConfig } from '@react-router/dev/routes';


export const picSubskillRoutes = [
    ...prefix("pic-subskill", [
        index("routes/pic-subskill/skill.tsx"),
        ...prefix("skill/:idSkill/subskill", [
            index("routes/pic-subskill/picsubskill.tsx"),

            ...prefix(":idSubSkill", [
                ...prefix("make-kuis", [
                    index("routes/pic-subskill/make-kuis.tsx"),
                    ...prefix("kuis/:idKuis", [
                        route("add-question", "routes/pic-subskill/add-question.tsx"),
                        route(
                            "submit",
                            "features/kuis/action/submit-form-make-kuis.tsx",
                        ),
                        ...prefix("question/:idKuisQuestion", [
                            route("edit", "routes/pic-subskill/edit-question.tsx"),
                            route("delete", "features/kuis/action/delete-question.tsx"),
                        ]),

                        // action
                        ...prefix("action", [
                            route("lock", "features/kuis/action/lock-kuis.tsx"),
                        ]),
                    ]),
                ]),
            ]),
        ]),

        ...prefix("action", [
            ...prefix(":idSubSkill", [
                route(
                    "update-subskill-iddokumen",
                    "features/subskill/action/update-subskill-iddokumen.tsx",
                ),
            ]),
            // route("skill/:idSkill/subskill/:idSubSkill/make-kuis/submit", "features/kuis/action/submit-form-make-kuis.tsx"),
        ]),
    ]),
] satisfies RouteConfig