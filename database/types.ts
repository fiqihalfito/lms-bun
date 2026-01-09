import type { NodePgDriver, NodePgQueryResultHKT } from "drizzle-orm/node-postgres";
import type { PgTransaction } from "drizzle-orm/pg-core";

export type Db = NodePgDriver;
export type Tx = PgTransaction<NodePgQueryResultHKT>;