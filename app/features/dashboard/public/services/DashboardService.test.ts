import { inspect } from "bun";
import { DashboardService } from "./DashboardService";

const res = await DashboardService.getNamaUserLulusBySkill("a9bce9a3-5d3f-4db7-9e41-9f8a6cfb92c1")
console.log(inspect(res))