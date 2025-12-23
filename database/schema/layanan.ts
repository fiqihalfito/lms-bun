import { pgTable } from "drizzle-orm/pg-core";
import { mSubBidang } from "./subbidang";
import { timestamps } from "database/helper/columns.helpers";

export const mLayanan = pgTable('m_layanan', (t) => ({
    idLayanan: t.uuid("id_layanan").defaultRandom().primaryKey(),
    namaLayanan: t.text('nama_layanan'),
    idSubBidang: t.char('id_subbidang', { length: 2 }).references(() => mSubBidang.idSubBidang),
    ...timestamps,
}))