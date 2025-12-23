// import dotenv from "dotenv";
import "dotenv/config"
import { drizzle } from "drizzle-orm/node-postgres";
import { Pool } from "pg";
import { relations } from "./relations";

// dotenv.config({
//     path: `.env.${process.env.NODE_ENV ?? "development"}`
// });

const pool = new Pool({
    connectionString: process.env.DATABASE_URL!,
});
export const db = drizzle({
    client: pool,
    relations: relations
});