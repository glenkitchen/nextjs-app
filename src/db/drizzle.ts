// import { neon } from "@neondatabase/serverless";
// import { drizzle } from "drizzle-orm/neon-http";
import * as schema from "./schema";

// export const sql = neon(process.env.NEON_DATABASE_URL!);
// export const db = drizzle(sql, { schema });

import { drizzle } from "drizzle-orm/mysql2";
import mysql from "mysql2/promise";

const connection = mysql.createPool({
  host: "engagedb.mysql.database.azure.com",
  database: "engage-dev",
  user: "EngageDbAdmin",
  password: "1n$ight@123",
  ssl: {
    rejectUnauthorized: false,
  },
});

export const db = drizzle(connection, {
  mode: "default",
  schema,
});
