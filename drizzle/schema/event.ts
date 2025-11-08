import { integer, pgTable, text, uuid, varchar } from "drizzle-orm/pg-core";
import { relations } from "drizzle-orm";
import { created_at, id, updated_at } from "../schema-helpers";
import { UserTable } from "./user";
import { BookingTable } from "./booking";

export const EventTable = pgTable("events", {
  id,
  user_id: uuid()
    .notNull()
    .references(() => UserTable.id, { onDelete: "cascade" }),
  title: varchar().notNull(),
  description: text(),
  duration_in_minutes: integer().notNull(),
  created_at,
  updated_at,
});

export const EventRelationships = relations(EventTable, ({ one, many }) => ({
  user: one(UserTable, {
    fields: [EventTable.user_id],
    references: [UserTable.id],
  }),
  bookings: many(BookingTable),
}));
