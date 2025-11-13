"use client";

import { useEffect, useState, useTransition } from "react";
import { Calendar } from "./ui/calendar";
import { Card, CardContent, CardFooter } from "./ui/card";
import { Button } from "./ui/button";
import { IoMdArrowRoundBack } from "react-icons/io";
import { Controller, useForm } from "react-hook-form";
import * as zod from "zod";
import { BookingSchema } from "@/schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { Field, FieldError, FieldGroup, FieldLabel } from "./ui/field";
import { Input } from "./ui/input";
import { Textarea } from "./ui/textarea";
import FormError from "./form-error";
import { AiOutlineLoading3Quarters } from "react-icons/ai";
import { format } from "date-fns";
import { getEventDetails } from "@/drizzle/queries/event";
import { getEventAvailabilityAction } from "@/actions/availability";
import { toast } from "sonner";

type Step = "one" | "two" | "three";
interface Props {
  event: Awaited<ReturnType<typeof getEventDetails>>;
  availability: Awaited<ReturnType<typeof getEventAvailabilityAction>>;
}
export default function BookingForm({ event, availability }: Props) {
  //   const today = new Date();
  const [selectedDate, setSelectedDate] = useState<Date | undefined>();
  const [selectedTime, setSelectedTime] = useState<string | null>(null);
  const [step, setStep] = useState<Step>("one");
  const [isPending, startTransition] = useTransition();
  const [error, setError] = useState<string | undefined>("");
  const [success, setSuccess] = useState<string | undefined>("");
  const available_days = availability.map((day) => new Date(day.date));
  const time_slots = Array.from({ length: 37 }, (_, i) => {
    const totalMinutes = i * 15;
    const hour = Math.floor(totalMinutes / 60) + 9;
    const minute = totalMinutes % 60;
    return `${hour.toString().padStart(2, "0")}:${minute
      .toString()
      .padStart(2, "0")}`;
  });
  const time_slot = selectedDate
    ? availability.find(
        (day) => day.date === format(selectedDate, "yyyy-MM-dd")
      )?.slots || []
    : [];
  const bookedDates = Array.from(
    { length: 3 },
    (_, i) => new Date(2025, 11, 17 + i)
  );
  const { control, reset, handleSubmit, setValue, watch } = useForm<
    zod.infer<typeof BookingSchema>
  >({
    resolver: zodResolver(BookingSchema),
    defaultValues: {
      guest_name: "",
      guest_email: "",
      additional_info: "",
      date: "",
      time: "",
    },
  });
  const changeStep = (val: Step) => setStep(val);
  function onSubmit({
    guest_name,
    guest_email,
    additional_info,
    date,
    time,
  }: zod.infer<typeof BookingSchema>) {
    console.log({ guest_name, guest_email, additional_info, date, time });
    if (!selectedDate || !selectedTime) {
      toast.error("Something went wrong!");
      return;
    }
    const start_time = new Date(
      `${format(selectedDate, "yyyy-MM-dd")}T${selectedTime}`
    );
    const end_time = new Date(
      start_time.getTime() + event!.duration_in_minutes * 60000
    );
    const booking_data = {
      event_id: event!.id,
      guest_name,
      guest_email,
      start_time: start_time.toISOString(),
      end_time: end_time.toISOString(),
      additional_info: additional_info ? additional_info : "",
    };
    console.log({ start_time, end_time });
    // setError("");
    // setSuccess("");
    // startTransition(() => {
    //     createBookingAction({ name, username, email, password })
    //       .then((data) => {
    //         setError(data.error);
    //         setSuccess(data.success);
    //          change step to three
    //       })
    //       .catch(() => toast.error("Something went wrong!"))
    //       .finally(() => reset());
    // });
  }
  useEffect(() => {
    if (selectedDate) {
      setValue("date", format(selectedDate, "yyyy-MM-dd"));
    }
  }, [selectedDate, setValue]);
  useEffect(() => {
    if (selectedTime) {
      setValue("time", selectedTime);
    }
  }, [selectedTime, setValue]);

  const date = watch("date");
  const time = watch("time");
  const guest_email = watch("guest_email");
  const guest_name = watch("guest_name");
  const additional_info = watch("additional_info");
  // console.log({ selectedDate, selectedTime, availability, available_days });
  console.log({ guest_name, guest_email, additional_info, date, time });
  return (
    <div>
      {step === "one" && (
        <Card className="gap-0 p-0 lg:p-0">
          <CardContent className="relative p-0 md:pr-41 lg:p-0">
            <div className="p-2">
              <Calendar
                mode="single"
                selected={selectedDate}
                onSelect={setSelectedDate}
                defaultMonth={selectedDate}
                disabled={bookedDates}
                showOutsideDays={false}
                modifiers={{
                  booked: bookedDates,
                }}
                modifiersClassNames={{
                  booked: "[&>button]:line-through opacity-100",
                }}
                className="bg-transparent p-0 [--cell-size:--spacing(10)] md:[--cell-size:--spacing(11)]"
                formatters={{
                  formatWeekdayName: (date) => {
                    return date.toLocaleString("en-US", { weekday: "short" });
                  },
                }}
              />
            </div>
            <div className="no-scrollbar inset-y-0 right-0 flex max-h-72 w-full scroll-pb-6 flex-col gap-4 overflow-y-auto border-t p-6 md:absolute md:max-h-none md:w-40 md:border-t-0 md:border-l">
              <div className="grid gap-2 relative">
                {!time_slots.length ? (
                  <div className="mx-auto text-sm md:absolute top-40">
                    Select date first
                  </div>
                ) : (
                  time_slots.map((time) => (
                    <Button
                      key={time}
                      variant={selectedTime === time ? "default" : "outline"}
                      onClick={() => setSelectedTime(time)}
                      className="w-full shadow-none"
                      size={"icon-sm"}
                    >
                      {time}
                    </Button>
                  ))
                )}
              </div>
            </div>
          </CardContent>
          <CardFooter className="flex flex-col gap-4 border-t px-4 lg:px-4 py-3! md:flex-row">
            <div className="text-sm">
              {selectedDate && selectedTime ? (
                <>
                  Your meeting is booked for{" "}
                  <span className="font-medium">
                    {" "}
                    {selectedDate?.toLocaleDateString("en-US", {
                      weekday: "long",
                      day: "numeric",
                      month: "long",
                    })}{" "}
                  </span>
                  at <span className="font-medium">{selectedTime}</span>.
                </>
              ) : (
                <>Select a date and time for your meeting.</>
              )}
            </div>
            <Button
              disabled={!selectedDate || !selectedTime}
              className="w-full md:ml-auto md:w-auto"
              onClick={() => changeStep("two")}
            >
              Continue
            </Button>
          </CardFooter>
        </Card>
      )}
      {step === "two" && (
        <div className="grid gap-6">
          <Button
            size={"icon-sm"}
            onClick={() => changeStep("one")}
            className="w-fit"
          >
            <IoMdArrowRoundBack className="size-4" />
            Back
          </Button>
          <div className="text-sm lg:text-base">
            Your meeting is booked for{" "}
            <span className="font-medium">
              {" "}
              {selectedDate?.toLocaleDateString("en-US", {
                weekday: "long",
                day: "numeric",
                month: "long",
              })}{" "}
            </span>
            at <span className="font-medium">{selectedTime}</span>.
          </div>
          <form
            id="booking-form"
            onSubmit={handleSubmit(onSubmit)}
            className="space-y-8"
          >
            <FieldGroup>
              <Controller
                name="guest_name"
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
              <Controller
                name="guest_email"
                control={control}
                render={({ field, fieldState }) => (
                  <Field data-invalid={fieldState.invalid} className="gap-1.5">
                    <FieldLabel
                      htmlFor="guest_email"
                      className="font-bold dark:text-white text-black"
                    >
                      Guest Email
                    </FieldLabel>
                    <Input
                      {...field}
                      type="text"
                      id="guest_email"
                      aria-invalid={fieldState.invalid}
                      placeholder="Type your email.."
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
              <Controller
                name="additional_info"
                control={control}
                render={({ field, fieldState }) => (
                  <Field data-invalid={fieldState.invalid} className="gap-1.5">
                    <FieldLabel
                      htmlFor="additional_info"
                      className="font-bold dark:text-white text-black"
                    >
                      Additional Info
                    </FieldLabel>
                    <Textarea
                      {...field}
                      id="additional_info"
                      aria-invalid={fieldState.invalid}
                      placeholder="Anything else.."
                      autoComplete="off"
                      disabled={isPending}
                      rows={6}
                      className="h-20 resize-none text-sm"
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
              size={"icon-sm"}
              type="submit"
              form="booking-form"
              className="w-full relative cursor-pointer font-bold py-2"
              disabled={isPending}
            >
              {isPending ? (
                <AiOutlineLoading3Quarters className="size-7 lg:size-8 animate-spin absolute" />
              ) : (
                "Schedule Event"
              )}
            </Button>
          </form>
        </div>
      )}
      {step === "three" && <div>Booked</div>}
    </div>
  );
}
