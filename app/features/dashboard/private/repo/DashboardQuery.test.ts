import "dotenv/config"

import { DashboardQuery } from "./DashboardQuery";
import { inspect } from "bun";

const res = await DashboardQuery.findUserResultSkills("c5c966fa-5081-462f-b0d5-493addfe7131")
console.log(inspect(res))