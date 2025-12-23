import type { mUserProfiles, mUsers } from "database/schema";
import { createContext } from "react-router";

export type UserContextForAuthType =
    Pick<typeof mUsers.$inferSelect, "email" | "idRole" | "idUser"> &
    Pick<typeof mUserProfiles.$inferSelect, "namaUser" | "idSubBidang">
// Pick<typeof mRole.$inferSelect, "namaRole"> &
// Pick<typeof mSubBidang.$inferSelect, "namaSubBidang"> &
// { teamData: typeof mTeam.$inferSelect[] };

export const userContext = createContext<UserContextForAuthType>();
