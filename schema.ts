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
