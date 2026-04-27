import { type RouteConfig, index, layout, prefix, route } from "@react-router/dev/routes";

export default [
    index("routes/home.tsx"),
    ...prefix("auth", [
        // route auth
        route("login", "routes/auth/login.tsx"),
        // action auth
        ...prefix("action", [
            route("login", "features/auth/action/login.tsx"),
            route("logout", "features/auth/action/logout.tsx"),
        ])
    ]),


    layout('layout/dashboard-public-layout.tsx', [
        ...prefix("dashboard", [
            index("routes/dashboard/public/public.tsx"),
            route("stat-lulus-skill", "routes/dashboard/public/stat-lulus-skill.tsx"),
            route("stat-individu", "routes/dashboard/public/stat-individu.tsx", [
                route(":idUser", "routes/dashboard/public/stat-individu-detail.tsx")
            ]),
        ]),
        // route("indikator-individu", "routes/dashboard/public/indikator-individu.tsx"),
    ]),


    route("app", "routes/app.tsx", { id: "app" }, [

        layout("layout/sidebar-main-layout.tsx", [
            route("dashboard", "routes/dashboard/private.tsx"),

            ...prefix("dokumen", [
                // route dokumen
                index("routes/dokumen/dokumen.tsx"),
                ...prefix("tipe/:tipeDokumen", [
                    index("routes/dokumen/dokumen-list.tsx"),
                    route("add", "routes/dokumen/dokumen-add.tsx"),
                    ...prefix(":idDokumen", [
                        route("edit", "routes/dokumen/dokumen-edit.tsx"),
                    ])
                ]),
                route("baca/:idDokumen", "routes/dokumen/dokumen-viewer.tsx"),

                // action dokumen
                ...prefix("action", [
                    ...prefix("tipe/:tipeDokumen", [
                        route("submit-sop", "features/dokumen/action/submit-dokumen-sop.tsx"), // untuk insert dan update
                        route("submit-ik", "features/dokumen/action/submit-dokumen-ik.tsx"), // untuk insert dan update
                    ]),
                    route("getuploadurl", "features/dokumen/action/get-prefetch-url-upload-minio.tsx"),
                ]),

            ]),
            ...prefix("knowledge", [
                ...prefix("team", [
                    index("routes/knowledge/knowledge.tsx"),
                    ...prefix(":idTeam/skill", [
                        index("routes/knowledge/knowledge-skill.tsx"),
                        ...prefix(":idSkill/level", [
                            index("routes/knowledge/knowledge-level-subskill.tsx"),
                            ...prefix(":level/subskill", [
                                index("routes/knowledge/knowledge-subskill.tsx"),
                            ]),
                        ]),
                    ]),
                ]),
            ]),


            ...prefix("kuis", [
                route(":idKuis/start", "routes/kuis/start.tsx"),
                route(":idKuis/progress/:idKuisProgress/question/:questionNumber", "routes/kuis/progress.tsx"),
                route(":idKuis/progress/:idKuisProgress/finish", "routes/kuis/finish.tsx"),

                // action
                route(":idKuis/progress/:idKuisProgress/question/:questionNumber/submit-current-jawaban", "features/kuis/action/submit-current-jawaban.tsx"),
                route(":idKuis/progress/:idKuisProgress/submit", "features/kuis/action/submit-kuis.tsx"),

            ]),


            ...prefix("pic-subskill", [
                index("routes/pic-subskill/skill.tsx"),
                ...prefix("skill/:idSkill/subskill", [
                    index("routes/pic-subskill/picsubskill.tsx"),

                    ...prefix(":idSubSkill", [
                        ...prefix("make-kuis", [
                            index("routes/pic-subskill/make-kuis.tsx"),
                            ...prefix("kuis/:idKuis", [
                                route("add-question", "routes/pic-subskill/add-question.tsx"),
                                route("submit", "features/kuis/action/submit-form-make-kuis.tsx"),
                                ...prefix("question/:idKuisQuestion", [
                                    route("edit", "routes/pic-subskill/edit-question.tsx"),
                                    route("delete", "features/kuis/action/delete-question.tsx"),
                                ]),

                                // action
                                ...prefix("action", [
                                    route("lock", "features/kuis/action/lock-kuis.tsx"),
                                ])
                            ])
                        ]),
                    ]),


                ]),



                ...prefix("action", [
                    ...prefix(":idSubSkill", [
                        route("update-subskill-iddokumen", "features/subskill/action/update-subskill-iddokumen.tsx"),
                    ]),
                    // route("skill/:idSkill/subskill/:idSubSkill/make-kuis/submit", "features/kuis/action/submit-form-make-kuis.tsx"),
                ])
            ]),
            // route("knowledge", "routes/dokumen-list/knowledge.tsx"),


            // ===== Route Master =====
            ...prefix("master", [
                index("routes/master/home.tsx"),
                ...prefix("user", [
                    index("routes/master/user/user-home.tsx"),
                    route("add", "routes/master/user/user-add.tsx"),
                    ...prefix(":idUser", [
                        route("edit", "routes/master/user/user-edit.tsx"),
                    ]),

                    // action user
                    ...prefix("action", [
                        route("submit-user", "features/user/action/submit-user.tsx"),
                    ])
                ]),
                ...prefix("layanan", [
                    index("routes/master/layanan/layanan-home.tsx"),
                    route("add", "routes/master/layanan/layanan-add.tsx"),
                    ...prefix(":idLayanan", [
                        route("edit", "routes/master/layanan/layanan-edit.tsx"),
                    ]),

                    // action layanan
                    ...prefix("action", [
                        route("submit-layanan", "features/layanan/action/submit-layanan.tsx"),
                    ])
                ]),
                ...prefix("team", [
                    index("routes/master/team/team-home.tsx"),
                    route("add", "routes/master/team/team-add.tsx"),
                    ...prefix(":idTeam", [
                        route("edit", "routes/master/team/team-edit.tsx"),
                    ]),

                    // action team
                    ...prefix("action", [
                        route("submit-team", "features/team/action/submit-team.tsx"),
                    ])
                ]),
                ...prefix("skill", [
                    index("routes/master/skill/skill-home.tsx"),
                    route("team/:idTeam", "routes/master/skill/skill-list-page.tsx", [
                        route("skill/:idSkill", "routes/master/skill/skill-subskill-list-page.tsx"),
                    ]),
                    // route("add", "routes/master/skill/skill-add.tsx"),
                    // ...prefix(":idSkill", [
                    //     route("edit", "routes/master/skill/skill-edit.tsx"),
                    // ]),

                    // action team
                    // ...prefix("action", [
                    //     route("submit-team", "features/team/action/submit-team.tsx"),
                    // ])
                ])
            ]),
        ]),

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
            ])
        ]),

        // ===== api =====
        ...prefix("api", [
            route("upload", "routes/upload.tsx"),
        ]),


    ]),

    // ===== test query =====
    route("test-query", "routes/test-query.tsx"),
] satisfies RouteConfig;
