"use server";

import * as zod from "zod";
import bcrypt from "bcryptjs";
import { SignInSchema, SignUpSchema } from "@/schema";
import {
  createUser,
  getUserByEmail,
  getUserByUsername,
} from "@/drizzle/queries/auth";
import { redirect } from "next/navigation";
import { getSession } from "./session";

export const signUp = async (values: zod.infer<typeof SignUpSchema>) => {
  const validatedFields = SignUpSchema.safeParse(values);
  if (!validatedFields.success) {
    return { error: "Invalid Fields!" };
  }
  const { password, username, email, name } = validatedFields.data;
  const existingUser = await getUserByEmail(email);
  if (existingUser) {
    return { error: "Email Already Exists!" };
  }
  const hashedPassword = await bcrypt.hash(password, 10);
  await createUser({ name, username, email, password: hashedPassword });
  return { success: "Account Created, Please Sign In!" };
};

export const signIn = async (values: zod.infer<typeof SignInSchema>) => {
  const validatedFields = SignInSchema.safeParse(values);
  if (!validatedFields.success) {
    return { error: "Invalid Fields!" };
  }
  const { username, password } = validatedFields.data;
  const existingUser = await getUserByUsername(username);
  if (!existingUser) {
    return { error: "Account Does not Exist!" };
  }
  const passwordMatched = await bcrypt.compare(password, existingUser.password);
  if (!passwordMatched) {
    return { error: "Account Does not Exist!" };
  }
  const session = await getSession();
  session.name = existingUser.name;
  session.username = existingUser.username;
  session.isLoggedIn = true;
  await session.save();
  redirect("/dashboard");
};

export const signOut = async () => {
  const session = await getSession();
  session.destroy();
  redirect("/");
};
