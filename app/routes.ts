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

    route("app", "routes/app.tsx", { id: "app" }, [

        layout("layout/sidebar-main-layout.tsx", [
            route("dashboard", "routes/dashboard.tsx"),

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
                    index("routes/master/user/user.tsx"),
                    route("add", "routes/master/user/user-add.tsx"),
                    ...prefix(":idUser", [
                        route("edit", "routes/master/user/user-edit.tsx"),
                    ]),

                    // action user
                    ...prefix("action", [
                        route("submit-user", "features/user/action/submit-user.tsx"),
                    ])
                ])
            ])

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
        ])
    ])
] satisfies RouteConfig;
