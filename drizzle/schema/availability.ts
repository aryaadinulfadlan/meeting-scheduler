import { integer, pgTable, uuid } from "drizzle-orm/pg-core";
import { relations } from "drizzle-orm";
import { created_at, id, updated_at } from "../schema-helpers";
import { UserTable } from "./user";
import { DayAvailabilityTable } from "./day_availability";

export const AvailabilityTable = pgTable("availabilities", {
  id,
  user_id: uuid()
    .notNull()
    .references(() => UserTable.id, { onDelete: "cascade" }),
  time_gap: integer().notNull(),
  created_at,
  updated_at,
});

export const AvailabilityRelationships = relations(
  AvailabilityTable,
  ({ one, many }) => ({
    user: one(UserTable, {
      fields: [AvailabilityTable.user_id],
      references: [UserTable.id],
    }),
    day_availabilities: many(DayAvailabilityTable),
  })
);
