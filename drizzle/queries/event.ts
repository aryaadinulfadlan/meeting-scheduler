"use server";

import { desc, eq } from "drizzle-orm";
import { db } from "../db";
import { EventTable } from "../schema";

export async function insertEvent(data: typeof EventTable.$inferInsert) {
  const [new_event] = await db.insert(EventTable).values(data).returning();
  if (!new_event) throw new Error("Failed to create event");
  return new_event;
}

export async function getEventDetails(eventId: string) {
  const event = await db.query.EventTable.findFirst({
    where: eq(EventTable.id, eventId),
    with: {
      user: {
        columns: { name: true, email: true, username: true },
      },
    },
  });
  return event;
}

export async function getUserEvents(userId: string) {
  const event = await db.query.EventTable.findMany({
    where: eq(EventTable.user_id, userId),
    orderBy: desc(EventTable.created_at),
    // with: {
    //   user: {
    //     columns: { name: true, email: true, username: true },
    //   },
    // },
  });
  return event;
}

export async function getEvent(eventId: string) {
  const event = await db.query.EventTable.findFirst({
    where: eq(EventTable.id, eventId),
  });
  return event;
}

export async function deleteEvent(eventId: string) {
  const [deleted_event] = await db
    .delete(EventTable)
    .where(eq(EventTable.id, eventId))
    .returning();
  if (!deleted_event) throw new Error("Failed to delete the event");
  return deleted_event;
}
