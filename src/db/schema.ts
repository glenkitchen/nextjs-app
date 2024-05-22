//import { pgTable, text } from "drizzle-orm/pg-core";
import { mysqlTable, int, varchar } from "drizzle-orm/mysql-core";

// export const accounts = pgTable("accounts", {
//   id: text("id").primaryKey(),
//   name: text("name").notNull(),
//   userId: text("user_id").notNull(),
// });

export const distributioncenters = mysqlTable("distributioncenters", {
  id: int("distributionCenterId").primaryKey(),
  code: varchar("code", {
    length: 20,
  }).notNull(),
  name: varchar("name", {
    length: 100,
  }).notNull(),
});
