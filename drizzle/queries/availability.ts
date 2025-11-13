"use server";

import { eq } from "drizzle-orm";
import { db } from "../db";
import { AvailabilityTable, DayAvailabilityTable } from "../schema";

export async function createAvailability(
  data: typeof AvailabilityTable.$inferInsert,
  availabilities: {
    day: string;
    start_time: Date;
    end_time: Date;
  }[]
) {
  try {
    const [new_availability] = await db
      .insert(AvailabilityTable)
      .values(data)
      .returning();
    if (!new_availability) throw new Error("Failed to create new availability");
    const mapped_data = availabilities.map((el) => ({
      ...el,
      availability_id: new_availability.id,
    }));
    await db.insert(DayAvailabilityTable).values(mapped_data);
  } catch (e) {
    const err = (e as Error).message;
    throw new Error(`Something went wrong: ${err}`);
  }
}

export async function updateAvailability(
  availability_id: string,
  data: typeof AvailabilityTable.$inferInsert,
  availabilities: {
    day: string;
    start_time: Date;
    end_time: Date;
  }[]
) {
  try {
    await db
      .update(AvailabilityTable)
      .set(data)
      .where(eq(AvailabilityTable.id, availability_id));
    await db
      .delete(DayAvailabilityTable)
      .where(eq(DayAvailabilityTable.availability_id, availability_id));
    const mapped_data = availabilities.map((el) => ({
      ...el,
      availability_id,
    }));
    await db.insert(DayAvailabilityTable).values(mapped_data);
  } catch (e) {
    const err = (e as Error).message;
    throw new Error(`Something went wrong: ${err}`);
  }
}
