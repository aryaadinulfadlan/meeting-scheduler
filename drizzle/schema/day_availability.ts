import { pgEnum, pgTable, timestamp, uuid } from "drizzle-orm/pg-core";
import { relations } from "drizzle-orm";
import { created_at, id, updated_at } from "../schema-helpers";
import { AvailabilityTable } from "./availability";
import { DAYS_OF_WEEK } from "@/constants";

export type DaysOfWeek = (typeof DAYS_OF_WEEK)[number];
export const daysOfWeekEnum = pgEnum("days_of_week_enum", DAYS_OF_WEEK);

export const DayAvailabilityTable = pgTable("day_availabilities", {
  id,
  availability_id: uuid()
    .notNull()
    .references(() => AvailabilityTable.id, { onDelete: "cascade" }),
  day: daysOfWeekEnum().notNull(),
  start_time: timestamp({ withTimezone: true }).notNull(),
  end_time: timestamp({ withTimezone: true }).notNull(),
  created_at,
  updated_at,
});

export const DayAvailabilityRelationships = relations(
  DayAvailabilityTable,
  ({ one }) => ({
    availability: one(AvailabilityTable, {
      fields: [DayAvailabilityTable.availability_id],
      references: [AvailabilityTable.id],
    }),
  })
);
