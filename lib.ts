import { SessionOptions } from "iron-session";

export interface SessionData {
  name: string;
  username: string;
  isLoggedIn: boolean;
}

export const defaultSession: SessionData = {
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
