"use client";

import * as zod from "zod";
import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "../ui/button";
import { useState, useTransition } from "react";
import { SignUpSchema } from "@/schema";
import { toast } from "sonner";
import { AiOutlineLoading3Quarters } from "react-icons/ai";
import { signUp } from "@/actions/auth";
import AuthWrapper from "../auth-wrapper";
import { Field, FieldError, FieldGroup, FieldLabel } from "../ui/field";
import { Input } from "../ui/input";
import FormError from "../form-error";
import FormSuccess from "../form-success";

export default function SignUpForm() {
  const [isPending, startTransition] = useTransition();
  const [error, setError] = useState<string | undefined>("");
  const [success, setSuccess] = useState<string | undefined>("");
  const { control, reset, handleSubmit } = useForm<
    zod.infer<typeof SignUpSchema>
  >({
    resolver: zodResolver(SignUpSchema),
    defaultValues: {
      name: "",
      username: "",
      email: "",
      password: "",
    },
  });
  function onSubmit({
    name,
    username,
    email,
    password,
  }: zod.infer<typeof SignUpSchema>) {
    setError("");
    setSuccess("");
    startTransition(() => {
      signUp({ name, username, email, password })
        .then((data) => {
          setError(data.error);
          setSuccess(data.success);
        })
        .catch(() => toast.error("Something went wrong!"))
        .finally(() => reset());
    });
  }
  return (
    <AuthWrapper
      headerLabel="Create an Account"
      footerLabel="Already have an account?"
      href="/sign-in"
    >
      <form
        id="sign-up-form"
        onSubmit={handleSubmit(onSubmit)}
        className="space-y-8"
      >
        <FieldGroup>
          <Controller
            name="name"
            control={control}
            render={({ field, fieldState }) => (
              <Field data-invalid={fieldState.invalid} className="gap-1.5">
                <FieldLabel
                  htmlFor="name"
                  className="font-bold dark:text-white text-black"
                >
                  Name
                </FieldLabel>
                <Input
                  {...field}
                  type="text"
                  id="name"
                  aria-invalid={fieldState.invalid}
                  placeholder="Type Name.."
                  autoComplete="off"
                  disabled={isPending}
                />
                {fieldState.invalid && (
                  <FieldError errors={[fieldState.error]} />
                )}
              </Field>
            )}
          />
          <Controller
            name="username"
            control={control}
            render={({ field, fieldState }) => (
              <Field data-invalid={fieldState.invalid} className="gap-1.5">
                <FieldLabel
                  htmlFor="username"
                  className="font-bold dark:text-white text-black"
                >
                  Username
                </FieldLabel>
                <Input
                  {...field}
                  type="text"
                  id="username"
                  aria-invalid={fieldState.invalid}
                  placeholder="Type Username.."
                  autoComplete="off"
                  disabled={isPending}
                />
                {fieldState.invalid && (
                  <FieldError errors={[fieldState.error]} />
                )}
              </Field>
            )}
          />
          <Controller
            name="email"
            control={control}
            render={({ field, fieldState }) => (
              <Field data-invalid={fieldState.invalid} className="gap-1.5">
                <FieldLabel
                  htmlFor="email"
                  className="font-bold dark:text-white text-black"
                >
                  Email
                </FieldLabel>
                <Input
                  {...field}
                  type="text"
                  id="email"
                  aria-invalid={fieldState.invalid}
                  placeholder="Type Email.."
                  autoComplete="off"
                  disabled={isPending}
                />
                {fieldState.invalid && (
                  <FieldError errors={[fieldState.error]} />
                )}
              </Field>
            )}
          />
          <Controller
            name="password"
            control={control}
            render={({ field, fieldState }) => (
              <Field data-invalid={fieldState.invalid} className="gap-1.5">
                <FieldLabel
                  htmlFor="password"
                  className="font-bold dark:text-white text-black"
                >
                  Password
                </FieldLabel>
                <Input
                  {...field}
                  type="password"
                  id="password"
                  aria-invalid={fieldState.invalid}
                  placeholder="Type Password.."
                  autoComplete="off"
                  disabled={isPending}
                />
                {fieldState.invalid && (
                  <FieldError errors={[fieldState.error]} />
                )}
              </Field>
            )}
          />
        </FieldGroup>
        <FormError message={error} />
        <FormSuccess message={success} />
        <Button
          type="submit"
          form="sign-up-form"
          className="w-full relative cursor-pointer text-base lg:text-lg font-bold lg:py-5"
          disabled={isPending}
        >
          {isPending ? (
            <AiOutlineLoading3Quarters className="size-7 lg:size-8 animate-spin absolute" />
          ) : (
            "Sign Up"
          )}
        </Button>
      </form>
    </AuthWrapper>
  );
}
