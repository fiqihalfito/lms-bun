import type { mTeam } from "database/schema";

export const teamSeed: typeof mTeam.$inferInsert[] = [
    { idTeam: "aaaaaaaa-aaaa-4000-8000-000000000001", namaTeam: "DBA", idSubBidang: "s1" },
    { idTeam: "aaaaaaaa-aaaa-4000-8000-000000000002", namaTeam: "Devops", idSubBidang: "s1" },
];