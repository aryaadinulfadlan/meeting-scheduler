import { pgTable, text, timestamp, uuid, varchar } from "drizzle-orm/pg-core";
import { relations } from "drizzle-orm";
import { created_at, id, updated_at } from "../schema-helpers";
import { EventTable } from "./event";
import { UserTable } from "./user";

export const BookingTable = pgTable("bookings", {
  id,
  user_id: uuid()
    .notNull()
    .references(() => UserTable.id, { onDelete: "cascade" }),
  event_id: uuid()
    .notNull()
    .references(() => EventTable.id, { onDelete: "cascade" }),
  guest_name: varchar().notNull(),
  guest_email: varchar().notNull(),
  additional_info: text(),
  timezone: varchar().notNull(),
  start_time: timestamp({ withTimezone: true }).notNull(),
  end_time: timestamp({ withTimezone: true }).notNull(),
  meet_link: varchar().notNull(),
  google_event_id: varchar().notNull(),
  created_at,
  updated_at,
});

export const BookingRelationships = relations(BookingTable, ({ one }) => ({
  user: one(UserTable, {
    fields: [BookingTable.user_id],
    references: [UserTable.id],
  }),
  event: one(EventTable, {
    fields: [BookingTable.event_id],
    references: [EventTable.id],
  }),
}));
