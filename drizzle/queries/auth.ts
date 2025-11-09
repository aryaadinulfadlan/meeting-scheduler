import { eq } from "drizzle-orm";
import { UserTable } from "../schema";
import { db } from "../db";

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
