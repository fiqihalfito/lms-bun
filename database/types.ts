import type {
  NodePgDriver,
  NodePgQueryResultHKT,
} from "drizzle-orm/node-postgres";
import type {
  BunSQLTransaction,
  BunSQLQueryResultHKT,
} from "drizzle-orm/bun-sql";
import type { PgTransaction } from "drizzle-orm/pg-core";

export type Db = NodePgDriver;
export type Tx = PgTransaction<BunSQLQueryResultHKT>;
