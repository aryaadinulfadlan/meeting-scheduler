import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import { SessionOptions } from "iron-session";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export interface SessionData {
  user_id: string;
  name: string;
  username: string;
  isLoggedIn: boolean;
}

export const defaultSession: SessionData = {
  user_id: "",
  name: "",
  username: "",
  isLoggedIn: false,
};

export const sessionOptions: SessionOptions = {
  password: process.env.SECRET_KEY!,
  cookieName: "session",
  cookieOptions: {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    maxAge: 3600,
  },
};

export function sleep(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}
