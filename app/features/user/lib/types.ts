import type { mUsers } from "database/schema";
import type { UserProfileService } from "../services/UserProfileService";

export type IdUser = (typeof mUsers.$inferSelect)["idUser"];

export type UserProfileFilter = {
  team: string[];
};

export type UserDataMaster = Awaited<
  ReturnType<typeof UserProfileService.getUserDataByIdUser>
>;
