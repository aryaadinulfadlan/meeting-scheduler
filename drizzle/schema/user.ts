import { pgTable, varchar } from "drizzle-orm/pg-core";
import { relations } from "drizzle-orm";
import { created_at, id, updated_at } from "../schema-helpers";
import { EventTable } from "./event";
import { BookingTable } from "./booking";
import { AvailabilityTable } from "./availability";

export const UserTable = pgTable("users", {
  id,
  name: varchar().notNull(),
  username: varchar().notNull(),
  email: varchar().notNull(),
  created_at,
  updated_at,
});

export const UserRelationships = relations(UserTable, ({ one, many }) => ({
  events: many(EventTable),
  bookings: many(BookingTable),
  availability: one(AvailabilityTable),
}));
