import { index, layout, prefix, route, type RouteConfig } from '@react-router/dev/routes';


export const kuisRoutes = [
    ...prefix("kuis", [
        route(":idKuis/start", "routes/kuis/start.tsx"),
        route(
            ":idKuis/progress/:idKuisProgress/question/:questionNumber",
            "routes/kuis/progress.tsx",
        ),
        route(
            ":idKuis/progress/:idKuisProgress/finish",
            "routes/kuis/finish.tsx",
        ),

        // action
        route(
            ":idKuis/progress/:idKuisProgress/question/:questionNumber/submit-current-jawaban",
            "features/kuis/action/submit-current-jawaban.tsx",
        ),
        route(
            ":idKuis/progress/:idKuisProgress/submit",
            "features/kuis/action/submit-kuis.tsx",
        ),
    ]),
] satisfies RouteConfig