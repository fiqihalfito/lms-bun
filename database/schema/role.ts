import { pgTable } from "drizzle-orm/pg-core";

export const mRole = pgTable('m_role', (t) => ({
    idRole: t.varchar("id_role").primaryKey(),
    namaRole: t.text('nama_role'),
}))