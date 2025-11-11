"use server";

import { EventSchema } from "@/schema";
import * as zod from "zod";
import { getSession } from "./session";
import { getUserById } from "@/drizzle/queries/auth";
import {
  deleteEvent,
  getEvent,
  getUserEvents,
  insertEvent,
} from "@/drizzle/queries/event";

export const createEvent = async (values: zod.infer<typeof EventSchema>) => {
  const authenticated_user = await getSession();
  if (!authenticated_user.isLoggedIn || !authenticated_user.user_id) {
    return { error: "Unauthorized" };
  }
  const validatedFields = EventSchema.safeParse(values);
  if (!validatedFields.success) {
    return { error: "Invalid fields!" };
  }
  const existing_user = await getUserById(authenticated_user.user_id);
  if (!existing_user) {
    return { error: "User not found" };
  }
  const { duration_in_minutes, title, description } = validatedFields.data;
  await insertEvent({
    user_id: authenticated_user.user_id,
    title,
    description,
    duration_in_minutes,
  });
  return { success: "Event is created" };
};

export const getUserEvent = async () => {
  const authenticated_user = await getSession();
  if (!authenticated_user.isLoggedIn || !authenticated_user.user_id) {
    return { error: "Unauthorized" };
  }
  const existing_user = await getUserById(authenticated_user.user_id);
  if (!existing_user) {
    return { error: "User not found" };
  }
  const events = await getUserEvents(authenticated_user.user_id);
  return events;
};

export const removeEvent = async (eventId: string) => {
  const authenticated_user = await getSession();
  if (!authenticated_user.isLoggedIn || !authenticated_user.user_id) {
    return { error: "Unauthorized" };
  }
  const existing_user = await getUserById(authenticated_user.user_id);
  if (!existing_user) {
    return { error: "User not found" };
  }
  const event = await getEvent(eventId);
  if (!event || event.user_id !== authenticated_user.user_id) {
    return { error: "Event is not found or Unauthorized" };
  }
  await deleteEvent(eventId);
  return { success: "Event is deleted" };
};
