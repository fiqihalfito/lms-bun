import type { mRole } from "database/schema/role";


export const roleSeed = [
    { idRole: "admin", namaRole: "Admin" },
    { idRole: "pegawai", namaRole: "Pegawai" },
    { idRole: "manajemen", namaRole: "Manajemen" },
    { idRole: "tad", namaRole: "Tenaga Alih Daya" },
] as const satisfies typeof mRole.$inferInsert[];

type RoleNames = typeof roleSeed[number]['namaRole'];

export const mapRoleSeed = new Map<RoleNames, typeof roleSeed[number]['idRole']>(roleSeed.map((role) => [role.namaRole, role.idRole]));
