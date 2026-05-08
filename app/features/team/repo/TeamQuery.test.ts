import { TeamQuery } from "./TeamQuery";

const res = await TeamQuery.findTeamsByIdUser("c5c966fa-5081-462f-b0d5-493addfe7131");
console.log(res);