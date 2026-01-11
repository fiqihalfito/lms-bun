import "dotenv/config"
import { drizzle } from "drizzle-orm/node-postgres";
import { Pool } from "pg";
// import { drizzle } from "drizzle-orm/bun-sql";
// import { SQL } from "bun"

import { relations } from "./relations";

// dotenv.config({
//     path: `.env.${process.env.NODE_ENV ?? "development"}`
// });

const pool = new Pool({
    connectionString: process.env.DATABASE_URL!,
});

// const client = new SQL({
//     url: process.env.DATABASE_URL!,
// });

export const db = drizzle({
    client: pool,
    // client: client,
    relations: relations
});