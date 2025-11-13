"use server";

import { desc, eq } from "drizzle-orm";
import { db } from "../db";
import { EventTable, UserTable } from "../schema";

export async function createUser(data: typeof UserTable.$inferInsert) {
  const [new_user] = await db.insert(UserTable).values(data).returning();
  if (!new_user) throw new Error("Failed to create registrations");
  return new_user;
}

export async function getUserByEmail(email: string) {
  const user = await db.query.UserTable.findFirst({
    where: eq(UserTable.email, email),
  });
  return user;
}

export async function getUserByUsername(username: string) {
  const user = await db.query.UserTable.findFirst({
    where: eq(UserTable.username, username),
  });
  return user;
}

export async function getUserById(user_id: string) {
  const user = await db.query.UserTable.findFirst({
    where: eq(UserTable.id, user_id),
  });
  return user;
}

export async function getUserProfileByUsername(username: string) {
  const user = await db.query.UserTable.findFirst({
    where: eq(UserTable.username, username),
    columns: { password: false },
    with: {
      events: {
        orderBy: desc(EventTable.created_at),
        // where: eq(UserTable.id, EventTable.user_id),
        columns: {
          id: true,
          title: true,
          description: true,
          duration_in_minutes: true,
        },
      },
    },
  });
  return user;
}

export async function getUserWithDayAvailability(user_id: string) {
  const user = await db.query.UserTable.findFirst({
    where: eq(UserTable.id, user_id),
    with: {
      availability: {
        with: {
          day_availabilities: true,
        },
      },
    },
  });
  return user;
}

export async function getUserWithAvailability(user_id: string) {
  const user = await db.query.UserTable.findFirst({
    where: eq(UserTable.id, user_id),
    with: {
      availability: true,
    },
  });
  return user;
}
