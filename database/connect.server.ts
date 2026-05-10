import "dotenv/config"
// import { drizzle } from "drizzle-orm/node-postgres";
// import { Pool } from "pg";
import { drizzle } from "drizzle-orm/bun-sql";
import { SQL } from "bun"

import { relations } from "./relations";

// dotenv.config({
//     path: `.env.${process.env.NODE_ENV ?? "development"}`
// });

// const pool = new Pool({
//     connectionString: process.env.DATABASE_URL!,
//     // connectionString: "postgresql://admin_lms:Icungcans127@10.14.113.103:6666/lms_db",
// });

const client = new SQL({
    url: process.env.DATABASE_URL!,
    max: 20, // settingan di source code ini lebih kecil dari max_connection di postgres engine. max_connection di postgres engine adalah 100
    idleTimeout: 30 // (detik) harus di-set agar connection tidak terus bertambah, ini bukan param default
});

export const db = drizzle({
    // client: pool,
    client: client,
    relations: relations,
    // logger: true
});