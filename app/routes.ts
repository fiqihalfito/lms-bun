import {
  type RouteConfig,
  index,
  layout,
  prefix,
  route,
} from "@react-router/dev/routes";
import { authRoutes } from "./routes-pack/auth-routes";
import { dashboardPublicRoutes } from "./routes-pack/dashboard-public-routes";
import { dokumenRoutes } from "./routes-pack/dokumen-routes";
import { knowledgeRoutes } from "./routes-pack/knowledge-routes";
import { kuisRoutes } from "./routes-pack/kuis-routes";
import { picSubskillRoutes } from "./routes-pack/pic-subskill-routes";
import { userMasterRoutes } from "./routes-pack/master/user-routes";
import { picMasterRoutes } from "./routes-pack/master/pic-routes";
import { layananMasterRoutes } from "./routes-pack/master/layanan-routes";
import { teamMasterRoutes } from "./routes-pack/master/team-routes";
import { roleMasterRoutes } from "./routes-pack/master/role-routes";
import { skillRoutes } from "./routes-pack/master/skill-routes";
import { resourcesRoutes } from "./routes-pack/resources-routes";

export default [
  index("routes/home.tsx"),
  ...authRoutes,
  ...dashboardPublicRoutes,

  route("app", "routes/app.tsx", { id: "app" }, [
    layout("layout/sidebar-main-layout.tsx", [
      route("dashboard", "routes/dashboard/private.tsx"),

      ...dokumenRoutes,
      ...knowledgeRoutes,
      ...kuisRoutes,
      ...picSubskillRoutes,



      // ===== Route Master =====
      ...prefix("master", [
        index("routes/master/home.tsx"),
        ...userMasterRoutes,
        ...picMasterRoutes,
        ...layananMasterRoutes,
        ...teamMasterRoutes,
        ...roleMasterRoutes,
        ...skillRoutes
      ]),
    ]),

    ...resourcesRoutes,

    // ===== api =====
    ...prefix("api", [route("upload", "routes/storage/upload.tsx")]),
  ]),

  // ===== test query =====
  route("test-query", "routes/test-query.tsx"),
] satisfies RouteConfig;
