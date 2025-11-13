"use client";
import {
  AvailabilityData,
  updateAvailabilityAction,
} from "@/actions/availability";
import { DAYS_OF_WEEK, time_slots } from "@/constants";
import { AvailabilitySchema } from "@/schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useTransition } from "react";
import { Controller, useForm } from "react-hook-form";
import * as zod from "zod";
import { Field, FieldError, FieldGroup, FieldLabel } from "../ui/field";
import { Checkbox } from "../ui/checkbox";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { toast } from "sonner";

interface Props {
  user_availability: AvailabilityData;
}

export default function AvailabilityForm({ user_availability }: Props) {
  const [isPending, startTransition] = useTransition();
  const { control, handleSubmit, reset } = useForm<
    zod.infer<typeof AvailabilitySchema>
  >({
    resolver: zodResolver(AvailabilitySchema),
    defaultValues: user_availability,
  });
  // const watchedValues = watch();
  function onSubmit(data: zod.infer<typeof AvailabilitySchema>) {
    console.log({ data });
    startTransition(() => {
      updateAvailabilityAction(data)
        .then((data) => {
          if (data.error) {
            toast.error(data.error);
          }
          if (data.success) {
            toast.success("Availability data saved");
          }
        })
        .catch(() => toast.error("Something went wrong!"));
    });
  }
  // console.log({ watchedValues });
  return (
    <form
      id="availability-form"
      onSubmit={handleSubmit(onSubmit)}
      className="max-w-[400px]"
    >
      <FieldGroup>
        {DAYS_OF_WEEK.map((day) => (
          <Controller
            key={day}
            name={day}
            control={control}
            render={({ field, fieldState }) => (
              <Field data-invalid={fieldState.invalid} className="gap-1.5">
                <div className="flex items-center">
                  <Field orientation="horizontal" className="items-center">
                    <Checkbox
                      id={`checkbox-${day}`}
                      checked={field.value.is_available}
                      onCheckedChange={(checked) => {
                        field.onChange({
                          ...field.value,
                          is_available: !!checked,
                          start_time: checked
                            ? field.value.start_time || "08:00"
                            : "",
                          end_time: checked
                            ? field.value.end_time || "17:00"
                            : "",
                        });
                      }}
                    />
                    <FieldLabel
                      htmlFor={`checkbox-${day}`}
                      className="font-medium capitalize"
                    >
                      {day.toLowerCase()}
                    </FieldLabel>
                  </Field>
                  {field.value.is_available && (
                    <div className="ml-6 flex items-center gap-3">
                      <Select
                        value={field.value.start_time}
                        onValueChange={(e) =>
                          field.onChange({
                            ...field.value,
                            start_time: e,
                          })
                        }
                      >
                        <SelectTrigger className="w-22">
                          <SelectValue placeholder="Start Time" />
                        </SelectTrigger>
                        <SelectContent>
                          {time_slots.map((time) => (
                            <SelectItem key={time} value={time}>
                              {time}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                      <span className="text-sm">to</span>
                      <Select
                        value={field.value.end_time}
                        onValueChange={(e) =>
                          field.onChange({
                            ...field.value,
                            end_time: e,
                          })
                        }
                      >
                        <SelectTrigger className="w-22">
                          <SelectValue placeholder="End Time" />
                        </SelectTrigger>
                        <SelectContent>
                          {time_slots.map((time) => (
                            <SelectItem key={time} value={time}>
                              {time}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                  )}
                </div>
                {fieldState.invalid && (
                  <FieldError errors={[fieldState.error]} />
                )}
              </Field>
            )}
          />
        ))}
      </FieldGroup>
      <Field orientation="horizontal" className="grid mt-6">
        <FieldLabel htmlFor="time_gap">Time gap (minutes)</FieldLabel>
        <Controller
          name="time_gap"
          control={control}
          render={({ field, fieldState }) => (
            <Field data-invalid={fieldState.invalid} className="">
              <Input
                id="time_gap"
                type="number"
                value={field.value}
                onChange={(e) => field.onChange(Number(e.target.value))}
                aria-invalid={fieldState.invalid}
                className="w-16 text-sm"
              />
              {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
            </Field>
          )}
        />
      </Field>
      <div className="mt-8">
        <Field orientation="horizontal">
          <Button
            type="button"
            variant="outline"
            size={"icon-sm"}
            onClick={() => reset()}
          >
            Reset
          </Button>
          <Button
            disabled={isPending}
            size={"icon-sm"}
            type="submit"
            form="availability-form"
          >
            {isPending ? "Saving.." : "Save"}
          </Button>
        </Field>
      </div>
    </form>
  );
}
