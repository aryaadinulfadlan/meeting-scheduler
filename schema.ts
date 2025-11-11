import * as zod from "zod";

export const SignInSchema = zod.object({
  username: zod.string().min(1, { message: "Username is required!" }),
  password: zod.string().min(1, { message: "Password is required!" }),
});

export const SignUpSchema = zod.object({
  name: zod
    .string()
    .min(6, { message: "Minimum 6 characters!" })
    .max(30, { message: "Maximum 30 characters!" }),
  username: zod
    .string()
    .min(4, { message: "Minimum 4 characters!" })
    .max(12, { message: "Maximum 12 characters!" }),
  email: zod.email({
    message: "Email is required!",
  }),
  password: zod
    .string()
    .min(6, { message: "Minimum 6 characters!" })
    .max(12, { message: "Maximum 12 characters!" }),
});

export const DaySchema = zod
  .object({
    is_available: zod.boolean(),
    start_time: zod.string(),
    end_time: zod.string(),
  })
  .refine(
    (data) => {
      if (data.is_available) {
        return data.start_time < data.end_time;
      }
      return true;
    },
    {
      message: "End time must be more than start time",
      path: ["end_time"],
    }
  );

export const AvailabilitySchema = zod.object({
  monday: DaySchema,
  tuesday: DaySchema,
  wednesday: DaySchema,
  thursday: DaySchema,
  friday: DaySchema,
  saturday: DaySchema,
  sunday: DaySchema,
  timeGap: zod
    .number()
    .min(0, { message: "Time gap must be 0 or more minutes" })
    .int(),
});

export const EventSchema = zod.object({
  title: zod
    .string()
    .min(10, { message: "Title is minimum 10 characters!" })
    .max(30, { message: "Title is maximum 30 characters!" }),
  description: zod
    .string()
    .max(50, { message: "Description is maximum 50 characters!" })
    .optional(),
  duration_in_minutes: zod
    .number()
    .int()
    .positive({ message: "Duration must be a positive number" }),
});

export const BookingSchema = zod.object({
  guest_name: zod
    .string()
    .min(4, { message: "Name is minimum 4 characters!" })
    .max(30, { message: "Name is maximum 30 characters!" }),
  guest_email: zod.email({
    message: "Email is required!",
  }),
  additional_info: zod
    .string()
    .max(100, { message: "Maximum 100 characters!" })
    .optional(),
  date: zod.string().regex(/^\d{4}-\d{2}-\d{2}$/, "Invalid date format!"),
  time: zod.string().regex(/^\d{2}:\d{2}$/, "Invalid time format!"),
});
