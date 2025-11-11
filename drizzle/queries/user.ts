"use server";

import { desc, eq } from "drizzle-orm";
import { db } from "../db";
import { EventTable, UserTable } from "../schema";

export async function getUserProfileByUsername(username: string) {
  const user = await db.query.UserTable.findFirst({
    where: eq(UserTable.username, username),
    columns: { password: false },
    with: {
      events: {
        orderBy: desc(EventTable.created_at),
        where: eq(UserTable.id, EventTable.id),
        columns: { title: true, description: true, duration_in_minutes: true },
      },
    },
  });
  return user;
}
