"use server";

import * as zod from "zod";
import bcrypt from "bcryptjs";
import { SignInSchema, SignUpSchema } from "@/schema";
import { getSession } from "./session";
import {
  createUser,
  getUserByEmail,
  getUserByUsername,
} from "@/drizzle/queries/user";

export const signUp = async (values: zod.infer<typeof SignUpSchema>) => {
  const validatedFields = SignUpSchema.safeParse(values);
  if (!validatedFields.success) {
    return { error: "Invalid fields!" };
  }
  const { password, username, email, name } = validatedFields.data;
  const existingUserByEmail = await getUserByEmail(email);
  const existingUserByUsername = await getUserByUsername(username);
  if (existingUserByEmail || existingUserByUsername) {
    return { error: "Account already exists!" };
  }
  const hashedPassword = await bcrypt.hash(password, 10);
  await createUser({ name, username, email, password: hashedPassword });
  return { success: "Account is created, please Sign In." };
};

export const signIn = async (values: zod.infer<typeof SignInSchema>) => {
  const validatedFields = SignInSchema.safeParse(values);
  if (!validatedFields.success) {
    return { error: "Invalid fields!" };
  }
  const { username, password } = validatedFields.data;
  const existingUser = await getUserByUsername(username);
  if (!existingUser) {
    return { error: "Account is not exist!" };
  }
  const passwordMatched = await bcrypt.compare(password, existingUser.password);
  if (!passwordMatched) {
    return { error: "Account is not exist!" };
  }
  const session = await getSession();
  session.user_id = existingUser.id;
  session.name = existingUser.name;
  session.username = existingUser.username;
  session.isLoggedIn = true;
  await session.save();
};

export const signOut = async () => {
  const session = await getSession();
  session.destroy();
};
