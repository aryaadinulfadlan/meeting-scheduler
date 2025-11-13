"use server";

import { getEventWithUserAvailabilityBookings } from "@/drizzle/queries/event";
import {
  startOfDay,
  addDays,
  format,
  parseISO,
  isBefore,
  addMinutes,
} from "date-fns";
import { getSession } from "./session";
import {
  getUserWithAvailability,
  getUserWithDayAvailability,
} from "@/drizzle/queries/user";
import { DAYS_OF_WEEK } from "@/constants";

type DayData = {
  is_available: boolean;
  start_time: string;
  end_time: string;
};

export type AvailabilityData = {
  time_gap?: number;
  MONDAY?: DayData;
  TUESDAY?: DayData;
  WEDNESDAY?: DayData;
  THURSDAY?: DayData;
  FRIDAY?: DayData;
  SATURDAY?: DayData;
  SUNDAY?: DayData;
};

export async function getUserAvailabilityAction() {
  const authenticated_user = await getSession();
  if (!authenticated_user.isLoggedIn || !authenticated_user.user_id) {
    throw new Error("Unauthorized");
  }
  const user = await getUserWithDayAvailability(authenticated_user.user_id);
  // if (!user || !user.availability) {
  //   throw new Error("Unauthorized");
  // }
  const availability_data: AvailabilityData = {
    time_gap: user?.availability?.time_gap || 0,
  };
  DAYS_OF_WEEK.forEach((day) => {
    const day_availability = user?.availability?.day_availabilities.find(
      (d) => d.day === day.toUpperCase()
    );
    availability_data[day] = {
      is_available: !!day_availability,
      start_time: day_availability
        ? day_availability.start_time.toISOString().slice(11, 16)
        : "08:00",
      end_time: day_availability
        ? day_availability.end_time.toISOString().slice(11, 16)
        : "17:00",
    };
  });
  return availability_data;
}

// export async function updateAvailability(data: AvailabilityData) {
//   const authenticated_user = await getSession();
//   if (!authenticated_user.isLoggedIn || !authenticated_user.user_id) {
//     return { error: "Unauthorized" };
//   }
//   const user = await getUserWithAvailability(authenticated_user.user_id);
//   if (!user) {
//     return { error: "User not found" };
//   }
//   const availabilityData = Object.entries(data).flatMap(
//     ([day, s]) => {
//       if (isAvailable) {
//         const baseDate = new Date().toISOString().split("T")[0]; // Get current date in YYYY-MM-DD format

//         return [
//           {
//             day: day.toUpperCase(),
//             startTime: new Date(`${baseDate}T${startTime}:00Z`),
//             endTime: new Date(`${baseDate}T${endTime}:00Z`),
//           },
//         ];
//       }
//       return [];
//     }
//   );

//   if (user.availability) {
//     await db.availability.update({
//       where: { id: user.availability.id },
//       data: {
//         timeGap: data.timeGap,
//         days: {
//           deleteMany: {},
//           create: availabilityData,
//         },
//       },
//     });
//   } else {
//     await db.availability.create({
//       data: {
//         userId: user.id,
//         timeGap: data.timeGap,
//         days: {
//           create: availabilityData,
//         },
//       },
//     });
//   }
//   return { success: true };
// }

export async function getEventAvailabilityAction(eventId: string) {
  const event = await getEventWithUserAvailabilityBookings(eventId);
  if (!event || !event.user.availability) {
    return [];
  }
  const { availability, bookings } = event.user;
  const startDate = startOfDay(new Date());
  const endDate = addDays(startDate, 30); // Get availability for the next 30 days
  const availableDates = [];

  for (let date = startDate; date <= endDate; date = addDays(date, 1)) {
    const dayOfWeek = format(date, "EEEE").toUpperCase();
    const dayAvailability = availability.day_availabilities.find(
      (d) => d.day === dayOfWeek
    );
    if (dayAvailability) {
      const dateStr = format(date, "yyyy-MM-dd");
      const slots = generateAvailableTimeSlots(
        dayAvailability.start_time,
        dayAvailability.end_time,
        event.duration_in_minutes,
        bookings,
        dateStr,
        availability.time_gap
      );
      availableDates.push({
        date: dateStr,
        slots,
      });
    }
  }
  return availableDates;
}

function generateAvailableTimeSlots(
  start_time: Date,
  end_time: Date,
  duration: number,
  bookings: {
    start_time: Date;
    end_time: Date;
  }[],
  date_str: string,
  timeGap = 0
) {
  const slots = [];
  let currentTime = parseISO(
    `${date_str}T${start_time.toISOString().slice(11, 16)}`
  );
  const slotEndTime = parseISO(
    `${date_str}T${end_time.toISOString().slice(11, 16)}`
  );
  // If the date is today, start from the next available slot after the current time
  const now = new Date();
  if (format(now, "yyyy-MM-dd") === date_str) {
    currentTime = isBefore(currentTime, now)
      ? addMinutes(now, timeGap)
      : currentTime;
  }
  while (currentTime < slotEndTime) {
    const slotEnd = new Date(currentTime.getTime() + duration * 60000);
    const isSlotAvailable = !bookings.some((booking) => {
      const bookingStart = booking.start_time;
      const bookingEnd = booking.end_time;
      return (
        (currentTime >= bookingStart && currentTime < bookingEnd) ||
        (slotEnd > bookingStart && slotEnd <= bookingEnd) ||
        (currentTime <= bookingStart && slotEnd >= bookingEnd)
      );
    });
    if (isSlotAvailable) {
      slots.push(format(currentTime, "HH:mm"));
    }
    currentTime = slotEnd;
  }
  return slots;
}
