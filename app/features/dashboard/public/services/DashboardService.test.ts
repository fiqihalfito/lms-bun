import { inspect } from "bun";
import { DashboardService } from "./DashboardService";

const res = await DashboardService.getJumlahLulusPerSkillV2("s1")
console.log(inspect(res))