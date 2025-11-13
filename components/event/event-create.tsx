"use client";

import { createEventAction } from "@/actions/event";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { EventSchema } from "@/schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState, useTransition } from "react";
import { Controller, useForm } from "react-hook-form";
import { toast } from "sonner";
import * as zod from "zod";
import { Field, FieldError, FieldGroup, FieldLabel } from "../ui/field";
import { Input } from "../ui/input";
import { Textarea } from "../ui/textarea";
import FormError from "../form-error";
import { AiOutlineLoading3Quarters } from "react-icons/ai";

export function EventCreate() {
  const [isOpen, setIsOpen] = useState(false);
  const [isPending, startTransition] = useTransition();
  const [error, setError] = useState<string | undefined>("");
  const handleOpen = (state: boolean) => {
    setIsOpen(state);
    reset();
  };
  const { control, reset, handleSubmit } = useForm<
    zod.infer<typeof EventSchema>
  >({
    resolver: zodResolver(EventSchema),
    defaultValues: {
      title: "",
      description: "",
      duration_in_minutes: "",
    },
  });
  function onSubmit({
    title,
    description,
    duration_in_minutes,
  }: zod.infer<typeof EventSchema>) {
    setError("");
    startTransition(() => {
      createEventAction({ title, description, duration_in_minutes })
        .then((data) => {
          if (data.error) {
            setError(data.error);
          }
          if (data.success) {
            toast.success(data.success);
          }
        })
        .catch(() => toast.error("Something went wrong!"))
        .finally(() => {
          setIsOpen(false);
          reset();
        });
    });
  }
  return (
    <Dialog open={isOpen} onOpenChange={handleOpen}>
      <DialogTrigger asChild>
        <Button size="icon-sm" className="w-fit font-bold">
          Create New
        </Button>
      </DialogTrigger>
      <DialogContent aria-describedby={undefined}>
        <DialogHeader>
          <DialogTitle>Create a new event</DialogTitle>
        </DialogHeader>
        <form
          id="event-create"
          onSubmit={handleSubmit(onSubmit)}
          className="space-y-8"
        >
          <FieldGroup>
            <Controller
              name="title"
              control={control}
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid} className="gap-1.5">
                  <FieldLabel
                    htmlFor="title"
                    className="font-bold dark:text-white text-black"
                  >
                    Event Title
                  </FieldLabel>
                  <Input
                    {...field}
                    type="text"
                    id="title"
                    aria-invalid={fieldState.invalid}
                    placeholder="Type Title.."
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
              name="description"
              control={control}
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid} className="gap-1.5">
                  <FieldLabel
                    htmlFor="description"
                    className="font-bold dark:text-white text-black"
                  >
                    Event Description
                  </FieldLabel>
                  <Textarea
                    {...field}
                    id="description"
                    aria-invalid={fieldState.invalid}
                    placeholder="Type Description.."
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
            <Controller
              name="duration_in_minutes"
              control={control}
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid} className="gap-1.5">
                  <FieldLabel
                    htmlFor="duration_in_minutes"
                    className="font-bold dark:text-white text-black"
                  >
                    Event Duration (minutes)
                  </FieldLabel>
                  <Input
                    {...field}
                    type="text"
                    id="duration_in_minutes"
                    aria-invalid={fieldState.invalid}
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
          </FieldGroup>
          <FormError message={error} />
        </form>
        <DialogFooter>
          <DialogClose asChild>
            <Button size={"icon-sm"} variant="outline">
              Cancel
            </Button>
          </DialogClose>
          <Button
            size={"icon-sm"}
            type="submit"
            form="event-create"
            className="min-w-20 relative cursor-pointer font-bold"
            disabled={isPending}
          >
            {isPending ? (
              <AiOutlineLoading3Quarters className="size-5 animate-spin absolute" />
            ) : (
              "Create Event"
            )}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
