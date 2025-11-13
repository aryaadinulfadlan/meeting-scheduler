"use server";

import { and, asc, desc, eq, gte, lt } from "drizzle-orm";
import { db } from "../db";
import { BookingTable } from "../schema";

export async function createBooking(data: typeof BookingTable.$inferInsert) {
  const [new_booking] = await db.insert(BookingTable).values(data).returning();
  if (!new_booking) throw new Error("Failed to create booking");
  return new_booking;
}

export async function getUserUpcomingBookings(user_id: string) {
  const now = new Date();
  const upcoming_bookings = await db.query.BookingTable.findMany({
    where: and(
      eq(BookingTable.user_id, user_id),
      gte(BookingTable.start_time, now)
    ),
    with: {
      event: {
        columns: { title: true },
      },
    },
    orderBy: asc(BookingTable.start_time),
  });
  return upcoming_bookings;
}

export async function getUserBookings(
  user_id: string,
  status: "upcoming" | "past"
) {
  const now = new Date();
  const bookings = await db.query.BookingTable.findMany({
    where: and(
      eq(BookingTable.user_id, user_id),
      status === "upcoming"
        ? gte(BookingTable.start_time, now)
        : lt(BookingTable.start_time, now)
    ),
    with: {
      event: {
        with: {
          user: {
            columns: { name: true, email: true },
          },
        },
      },
    },
    orderBy:
      status === "upcoming"
        ? asc(BookingTable.start_time)
        : desc(BookingTable.start_time),
  });
  return bookings;
}

export async function getBookingById(booking_id: string) {
  const booking = await db.query.BookingTable.findFirst({
    where: eq(BookingTable.id, booking_id),
    with: { event: true, user: true },
  });
  return booking;
}

export async function deleteBooking(booking_id: string) {
  const [deleted_booking] = await db
    .delete(BookingTable)
    .where(eq(BookingTable.id, booking_id))
    .returning();
  if (!deleted_booking) throw new Error("Failed to delete the booking");
  return deleted_booking;
}
