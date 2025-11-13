"use server";

import { EventSchema } from "@/schema";
import * as zod from "zod";
import { getSession } from "./session";
import {
  deleteEvent,
  getEventById,
  getUserEvents,
  createEvent,
} from "@/drizzle/queries/event";
import { getUserById } from "@/drizzle/queries/user";
import { revalidatePath } from "next/cache";

export const createEventAction = async (
  values: zod.infer<typeof EventSchema>
) => {
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
  await createEvent({
    user_id: authenticated_user.user_id,
    title,
    description,
    duration_in_minutes: parseInt(duration_in_minutes),
  });
  revalidatePath("/events");
  return { success: "Successfully create a new event!" };
};

export const getUserEventsAction = async () => {
  const authenticated_user = await getSession();
  if (!authenticated_user.isLoggedIn || !authenticated_user.user_id) {
    throw new Error("Unauthorized");
  }
  const existing_user = await getUserById(authenticated_user.user_id);
  if (!existing_user) {
    throw new Error("User not found");
  }
  const events = await getUserEvents(authenticated_user.user_id);
  return events;
};

export const deleteEventAction = async (eventId: string) => {
  const authenticated_user = await getSession();
  if (!authenticated_user.isLoggedIn || !authenticated_user.user_id) {
    return { error: "Unauthorized" };
  }
  const existing_user = await getUserById(authenticated_user.user_id);
  if (!existing_user) {
    return { error: "User not found" };
  }
  const event = await getEventById(eventId);
  if (!event || event.user_id !== authenticated_user.user_id) {
    return { error: "Event is not found or Unauthorized" };
  }
  await deleteEvent(eventId);
  revalidatePath("/events");
  return { success: "Event is deleted" };
};
