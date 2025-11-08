export const DAYS_OF_WEEK = [
  "MONDAY",
  "TUESDAY",
  "WEDNESDAY",
  "THURSDAY",
  "FRIDAY",
  "SATURDAY",
  "SUNDAY",
] as const;

export const PrivateNavLinks = [
  {
    route: "/dashboard",
    label: "Dashboard",
  },
  {
    route: "/events",
    label: "My Events",
  },
  {
    route: "/meetings",
    label: "Meetings",
  },
  {
    route: "/availability",
    label: "Availability",
  },
] as const;
