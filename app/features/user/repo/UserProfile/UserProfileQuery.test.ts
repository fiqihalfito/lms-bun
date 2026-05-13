import { UserProfileQuery } from "./UserProfileQuery";

const res = await UserProfileQuery.findAllPicWithCountSubskill("s1")
console.log(res)