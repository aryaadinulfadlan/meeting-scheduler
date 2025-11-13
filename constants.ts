export const DAYS_OF_WEEK = [
  "MONDAY",
  "TUESDAY",
  "WEDNESDAY",
  "THURSDAY",
  "FRIDAY",
  "SATURDAY",
  "SUNDAY",
] as const;

export const privateRoutes = [
  "/dashboard",
  "/events",
  "/meetings",
  "/availability",
];

export const authRoutes = ["/sign-in", "/sign-up"];

export const time_slots = [
  "08:00",
  "08:30",
  "09:00",
  "09:30",
  "10:00",
  "10:30",
  "11:00",
  "11:30",
  "12:00",
  "12:30",
  "13:00",
  "13:30",
  "14:00",
  "14:30",
  "15:00",
  "15:30",
  "16:00",
];

export const default_availability = {
  MONDAY: { is_available: false, start_time: "08:00", end_time: "17:00" },
  TUESDAY: { is_available: false, start_time: "08:00", end_time: "17:00" },
  WEDNESDAY: { is_available: false, start_time: "08:00", end_time: "17:00" },
  THURSDAY: { is_available: false, start_time: "08:00", end_time: "17:00" },
  FRIDAY: { is_available: false, start_time: "08:00", end_time: "17:00" },
  SATURDAY: { is_available: false, start_time: "08:00", end_time: "17:00" },
  SUNDAY: { is_available: false, start_time: "08:00", end_time: "17:00" },
  time_gap: 0,
};
