import { drizzle } from "drizzle-orm/node-postgres";
import { Pool } from "pg";
import * as schema from "./schema/index";

const pool = new Pool({
  connectionString:
    "postgres://postgres:Sohansg940823@localhost:5432/student_db",
});

export const db = drizzle(pool, { schema });
