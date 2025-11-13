"use server";

import { getEventWithUser } from "@/drizzle/queries/event";
import * as zod from "zod";
import { getSession } from "./session";
import {
  deleteBooking,
  getBookingById,
  getUserBookings,
  getUserUpcomingBookings,
} from "@/drizzle/queries/booking";
import { getUserById } from "@/drizzle/queries/user";
import { revalidatePath } from "next/cache";

export async function createBookingAction({
  event_id,
  guest_email,
  guest_name,
  start_time,
  end_time,
  additional_info,
}: {
  event_id: string;
  guest_name: string;
  guest_email: string;
  start_time: string;
  end_time: string;
  additional_info: string;
}) {
  try {
    const event = await getEventWithUser(event_id);
    if (!event) {
      return { error: "Event not found" };
    }
    //
  } catch (error) {}
}

export async function getUserUpcomingBookingsAction() {
  const authenticated_user = await getSession();
  if (!authenticated_user.isLoggedIn || !authenticated_user.user_id) {
    throw new Error("Unauthorized");
  }
  const existing_user = await getUserById(authenticated_user.user_id);
  if (!existing_user) {
    throw new Error("User not found");
  }
  const upcoming_bookings = await getUserUpcomingBookings(
    authenticated_user.user_id
  );
  return upcoming_bookings;
}

export async function getUserBookingsAction(status: "upcoming" | "past") {
  const authenticated_user = await getSession();
  if (!authenticated_user.isLoggedIn || !authenticated_user.user_id) {
    throw new Error("Unauthorized");
  }
  const existing_user = await getUserById(authenticated_user.user_id);
  if (!existing_user) {
    throw new Error("User not found");
  }
  const bookings = await getUserBookings(authenticated_user.user_id, status);
  return bookings;
}

export async function cancelBookingAction(booking_id: string) {
  const authenticated_user = await getSession();
  if (!authenticated_user.isLoggedIn || !authenticated_user.user_id) {
    return { error: "Unauthorized" };
  }
  const existing_user = await getUserById(authenticated_user.user_id);
  if (!existing_user) {
    return { error: "User not found" };
  }
  const booking = await getBookingById(booking_id);
  if (!booking || booking.user_id !== authenticated_user.user_id) {
    return { error: "Booking is not found or Unauthorized" };
  }
  //
  await deleteBooking(booking_id);
  revalidatePath("/meetings");
  return { success: "Meeting is canceled" };
}
