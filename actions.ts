"use server";

import { getIronSession } from "iron-session";
import { cookies } from "next/headers";
import { SessionData, defaultSession, sessionOptions } from "./lib";
import { redirect } from "next/navigation";

export const getSession = async () => {
  const cookieStore = await cookies();
  const session = await getIronSession<SessionData>(
    cookieStore,
    sessionOptions
  );
  if (!session.isLoggedIn) {
    session.isLoggedIn = defaultSession.isLoggedIn;
  }
  return session;
};

// export const login = async (formData: FormData) => {
//   const session = await getSession();
//   const formCode = formData.get("code") as string;
//   const founded = codeLists.find((el) => el.code === formCode.toUpperCase());
//   if (!founded) {
//     return false;
//   } else {
//     session.name = founded.name;
//     session.username = founded.code;
//     session.isLoggedIn = true;
//     await session.save();
//     return true;
//   }
// };

export const logout = async () => {
  const session = await getSession();
  session.destroy();
  redirect("/");
};
