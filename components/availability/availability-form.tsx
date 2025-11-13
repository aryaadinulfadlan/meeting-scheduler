"use client";
import { AvailabilityData } from "@/actions/availability";
import { DAYS_OF_WEEK } from "@/constants";
import { AvailabilitySchema } from "@/schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useTransition } from "react";
import { Controller, useForm } from "react-hook-form";
import * as zod from "zod";
import { FieldGroup } from "../ui/field";

interface Props {
  user_availability: AvailabilityData;
}

export default function AvailabilityForm({ user_availability }: Props) {
  const [isPending, startTransition] = useTransition();
  const { control, handleSubmit, watch } = useForm<
    zod.infer<typeof AvailabilitySchema>
  >({
    resolver: zodResolver(AvailabilitySchema),
    defaultValues: {
      ...user_availability,
    },
  });
  function onSubmit(data: zod.infer<typeof AvailabilitySchema>) {
    startTransition(() => {
      //   createEventAction({ title, description, duration_in_minutes })
      //     .then((data) => {
      //       if (data.error) {
      //         setError(data.error);
      //       }
      //       if (data.success) {
      //         toast.success(data.success);
      //       }
      //     })
      //     .catch(() => toast.error("Something went wrong!"))
      //     .finally(() => {
      //       setIsOpen(false);
      //       reset();
      //     });
    });
  }
  return (
    <form>
      <FieldGroup>
        {/* {DAYS_OF_WEEK.map((day) => {
          const is_available = true;
          return (
            <Controller
              key={day}
              name="MONDAY"
              control={control}
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid} className="gap-1.5">
                  <FieldLabel
                    htmlFor="guest_name"
                    className="font-bold dark:text-white text-black"
                  >
                    Guest Name
                  </FieldLabel>
                  <Input
                    {...field}
                    type="text"
                    id="guest_name"
                    aria-invalid={fieldState.invalid}
                    placeholder="Type your name.."
                    autoComplete="off"
                    disabled={isPending}
                    className="text-sm"
                  />
                  {fieldState.invalid && (
                    <FieldError errors={[fieldState.error]} />
                  )}
                </Field>
              )}
            />
          );
        })} */}
      </FieldGroup>
    </form>
  );
}
