import { pgTable } from "drizzle-orm/pg-core";

export const mSubBidang = pgTable('m_subbidang', (t) => ({
    idSubBidang: t.char("id_subbidang", { length: 2 }).primaryKey(),
    namaSubBidang: t.text('nama_subbidang')
}))