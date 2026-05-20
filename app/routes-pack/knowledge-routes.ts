import { index, layout, prefix, route, type RouteConfig } from '@react-router/dev/routes';


export const knowledgeRoutes = [
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
] satisfies RouteConfig