import { SkillService } from "./SkillService"

const res = await SkillService.getSkillDropdown()
console.log(res.reverse())