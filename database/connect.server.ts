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
});

export const db = drizzle({
    // client: pool,
    client: client,
    relations: relations,
    logger: true
});