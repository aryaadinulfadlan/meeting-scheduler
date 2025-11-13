"use client";

import * as zod from "zod";
import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "../ui/button";
import { useState, useTransition } from "react";
import { SignInSchema } from "@/schema";
import { toast } from "sonner";
import { AiOutlineLoading3Quarters } from "react-icons/ai";
import { signIn } from "@/actions/auth";
import CardWrapper from "./card-wrapper";
import { Field, FieldError, FieldGroup, FieldLabel } from "../ui/field";
import { Input } from "../ui/input";
import FormError from "../form-error";
import { useRouter } from "next/navigation";

export default function SignInForm() {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();
  const [error, setError] = useState<string | undefined>("");
  const { control, reset, handleSubmit } = useForm<
    zod.infer<typeof SignInSchema>
  >({
    resolver: zodResolver(SignInSchema),
    defaultValues: {
      username: "",
      password: "",
    },
  });
  function onSubmit({ username, password }: zod.infer<typeof SignInSchema>) {
    setError("");
    startTransition(() => {
      signIn({ password, username })
        .then((data) => {
          if (data?.error) {
            setError(data.error);
          }
          if (!data) {
            toast.success("Successfully Logged In!");
            router.push("/dashboard");
          }
        })
        .catch(() => toast.error("Something went wrong!"))
        .finally(() => reset());
    });
  }
  return (
    <CardWrapper
      headerLabel="Welcome Back!"
      footerLabel="Don't have an account?"
      href="/sign-up"
    >
      <form
        id="sign-in-form"
        onSubmit={handleSubmit(onSubmit)}
        className="space-y-8"
      >
        <FieldGroup>
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
        <Button
          type="submit"
          form="sign-in-form"
          className="w-full relative cursor-pointer text-base lg:text-lg font-bold lg:py-5"
          disabled={isPending}
        >
          {isPending ? (
            <AiOutlineLoading3Quarters className="size-7 lg:size-8 animate-spin absolute" />
          ) : (
            "Sign In"
          )}
        </Button>
      </form>
    </CardWrapper>
  );
}
